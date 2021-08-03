"""Server for good-samaritan-finder app """

from datetime import datetime
from flask import (Flask, render_template, request, flash, session, redirect, send_from_directory)
from flask.json import jsonify
from flask_bcrypt import Bcrypt
import random
import string

import model
import crud

import time
import os
import smtplib

from jinja2 import StrictUndefined

app = Flask(__name__)
bcrypt = Bcrypt(app)
app.secret_key = "secret"
app.jinja_env.undefined = StrictUndefined


@app.route('/api/login-user', methods=["POST"])
def user_login():
    """Process user login. """

    username_or_email = request.get_json().get("username_or_email")
    username = ""
    email = ""

    if '@' in username_or_email:
        email = username_or_email
        user_in_db = crud.get_user_by_email(email)
        if user_in_db:
            username = user_in_db.display_name
    else:
        username = username_or_email
        user_in_db = crud.get_user_by_displayname(username)
        if user_in_db:
            email = user_in_db.email

    password = request.get_json().get("password")

    if user_in_db:
        if bcrypt.check_password_hash(user_in_db.password, password):
        # if user_in_db.password == password:
            return jsonify({"success": True, "username": username, "email": email})

        else:
            return jsonify({"success": False})


@app.route('/api/register-user', methods=["POST"])
def user_registration():
    """Process user registration. """

    first_name = request.get_json().get("firstname")
    last_name = request.get_json().get("lastname")
    email = request.get_json().get("email")
    password = request.get_json().get("password")
    username = request.get_json().get("username")
    phone_number = request.get_json().get("phonenumber")
    street = request.get_json().get("address")
    zipcode = request.get_json().get("zipcode")
    apt_suite = request.get_json().get("aptSuite")

    # Add apartment or suite number to the street address if available
    if apt_suite.strip():
        street = f'{street}, {apt_suite}'

    user_in_db = crud.get_user_by_displayname(username)

    if user_in_db:
        return jsonify({"success": False})

    else:
        # Use password hashing to convert the password into a hashed value
        password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
        # Convert the user address using Geocoding into lat lng co-ordinates
        user_location = crud.convert_user_address(street)
        lat = user_location['lat']
        lng = user_location['lng']
        # Register the user in the users table in the DB
        register_user = crud.create_user(first_name, last_name, username, email, password_hash, street, zipcode,
                                         phone_number, lat, lng)
        # Add user in beneficiaries and volunteers table in the DB
        beneficiary = crud.create_beneficiary(False, register_user)
        volunteer = crud.create_volunteer(False, register_user)
        return jsonify({"success": True})


@app.route('/api/requests', methods=["POST"])
def get_beneficiary_requests():
    """Get a list of the beneficiary requests. """

    logged_user = request.get_json().get("username")
    # Get the user object from the users table
    user_in_db = crud.get_user_by_displayname(logged_user)
    # For user(ben) in beneficiaries table, get all requests
    beneficiary = crud.get_beneficiary_by_user(user_in_db)
    # Get all the service requests from this beneficiary
    beneficiary_requests = crud.get_requests_by_beneficiary(beneficiary)

    return jsonify({req.request_id: req.to_dict() for req in beneficiary_requests})


@app.route('/api/offerings', methods=["POST"])
def get_beneficiary_offerings():
    """Get a list of the beneficiary offerings. """

    logged_user = request.get_json().get("username")
    # Get the user object from the users table
    user_in_db = crud.get_user_by_displayname(logged_user)
    # For user(vol) in volunteers table, get all offerings
    volunteer = crud.get_volunteer_by_user(user_in_db)
    # Get all the service offerings from this volunteer
    volunteer_offerings = crud.get_offerings_by_volunteer(volunteer)

    return jsonify({offering.offered_id: offering.to_dict() for offering in volunteer_offerings})


@app.route('/api/add-request', methods=["POST"])
def add_user_request():
    """Process the request added by the user. """

    service_name = request.get_json().get("requestServiceType")
    for_num_persons = request.get_json().get("requestForNumPersons")
    logged_user = request.get_json().get("username")
    # Get user object by displayname
    user_in_db = crud.get_user_by_displayname(logged_user)
    # For user(ben)in beneficiaries table, set onboarded to True
    beneficiary = crud.get_beneficiary_by_user(user_in_db)
    if beneficiary:
        beneficiary = crud.onboard_beneficiary(beneficiary)
    else:
        beneficiary = crud.create_beneficiary(True, user_in_db)
    # Create a service type and a service request to be added to the DB
    service_type = crud.create_service_type(service_name, for_num_persons, is_offered=False)
    date_of_request = datetime.now()
    service_request = crud.create_service_request(date_of_request, beneficiary, service_type)
    # Check if there is a volunteer offering (with service) available for the desired request
    is_offering_volunteer = crud.look_for_offering(service_name, for_num_persons, date_of_request)

    if is_offering_volunteer:
        return jsonify({"success": True})
    else:
        return jsonify({"success": False})


@app.route('/api/add-offering', methods=["POST"])
def add_user_offering():
    """Process the offering added by the user. """

    service_name = request.get_json().get("offeringServiceType")
    for_num_persons = request.get_json().get("offeringForNumPersons")
    available_date = request.get_json().get("availableDate")
    logged_user = request.get_json().get("username")
    # Get user object by displayname
    user_in_db = crud.get_user_by_displayname(logged_user)
    # For user(vol)in volunteers table, set onboarded to True
    volunteer = crud.get_volunteer_by_user(user_in_db)
    if volunteer:
        volunteer = crud.onboard_volunteer(volunteer)
    else:
        volunteer = crud.create_volunteer(True, user_in_db)
    # Create volunteer availability in timings table
    volunteer_timing = crud.create_volunteer_availability(available_date, volunteer)
    # If the service exists by that volunteer, just update for_num_persons
    # Else, create a service type and service offering to be added to the DB
    is_service = crud.check_existing_service(volunteer, service_name)
    if is_service:
        service_offering = crud.update_service_offering(volunteer, service_name, for_num_persons)
    else:
        service_type = crud.create_service_type(service_name, for_num_persons, is_offered=True)
        service_offering = crud.create_service_offered(volunteer, service_type)

    is_request_beneficiary = crud.look_for_request(service_name, for_num_persons)

    if is_request_beneficiary:
        return jsonify({"success": True})
    else:
        return jsonify({"success": False})


@app.route("/api/matched-requests", methods=["POST"])
def show_matched_requests():
    """Display the matched requests to the volunteer for approval. """

    logged_user = request.get_json().get("username")
    # Get the user object from the users table
    user_in_db = crud.get_user_by_displayname(logged_user)
    volunteer = crud.get_volunteer_by_user(user_in_db)
    # Get all the service requests matching for this volunteer
    matching_requests = crud.get_matching_requests_for_volunteer(volunteer)

    return jsonify({matching_request.request_id: matching_request.to_dict() for matching_request in matching_requests})


@app.route("/api/accept-request", methods=["POST"])
def process_accepted_requests():
    """Process the request accepted by the volunteer. """
    try:
        logged_user = request.get_json().get("username")
        request_id = request.get_json().get("request_id")
        # Get the user object from the users table
        user_in_db = crud.get_user_by_displayname(logged_user)
        volunteer = crud.get_volunteer_by_user(user_in_db)
        # Search the request by the id in the requests table
        beneficiary_request = crud.get_beneficiary_request_by_id(request_id)

        # Get the email address and names of volunteers and beneficiaries and send them confirmation emails.
        beneficiary_name = beneficiary_request.beneficiary.user.first_name
        beneficiary_email = beneficiary_request.beneficiary.user.email

        volunteer_name = volunteer.user.first_name
        volunteer_email = volunteer.user.email

        # Beneficiary message subject to be sent to the user
        subject = f"Help is on it's way!"

        # Beneficiary message to be sent to the user
        message = f"Hello {beneficiary_name},\n\nWe are delighted to let you know that we have found a volunteer to " \
                  f"help you out. Your Good Samaritan will be contacting you shortly to arrange for the hand-off." \
                  f"\n\nOnce you receive the help, please do not forget to go back to your dashboard at " \
                  f"www.goodsamaritanfinder.org and leave a little note thanking your Good Samaritan. " \
                  f"\n\nWe wish you and your loved ones, well.\n\nTake care and stay safe!\n\n" \
                  f"-GSF Admin"
        # Sending the mail
        crud.email_handler(beneficiary_email, message, subject)

        # Volunteer message subject to be sent to the users
        subject = f"Thank you for stepping up to help!"

        # Volunteer message to be sent to the users
        message = f"Hello {volunteer_name},\n\nThank you for helping out with a request.\n\nHere are the beneficiary" \
                  f" details:\n" \
                  f"Name:  {beneficiary_request.beneficiary.user.first_name}\n" \
                  f"Email: {beneficiary_request.beneficiary.user.email}\n" \
                  f"Phone: {beneficiary_request.beneficiary.user.phone_number}\n" \
                  f"Address: {beneficiary_request.beneficiary.user.street}, {beneficiary_request.beneficiary.user.zipcode}\n" \
                  f"Google Maps: https://maps.google.com/?q={beneficiary_request.beneficiary.user.latitude},{beneficiary_request.beneficiary.user.longitude}" \
                  f"\n\nThank you again for stepping up and being a Good Samaritan. The world could use a lot more " \
                  f"folks like yourself!\n\nStay blessed and stay safe!\n\n-GSF Admin"

        # Sending the mail
        crud.email_handler(volunteer_email, message, subject)

        # Get the phone numbers of volunteers and beneficiaries and send them confirmation text message.
        beneficiary_phone_number = beneficiary_request.beneficiary.user.phone_number
        volunteer_phone_number = volunteer.user.phone_number

        # Send SMS to beneficiary
        message_body = f"Hello {beneficiary_name}. Thank you for your request. We have found a Good Samaritan " \
                       f"to help you out. You will be hearing from them soon! Please keep an eye out for the " \
                       f"email from one of our Good Samaritans. Help is on it's way!"
        crud.sms_handler(message_body, beneficiary_phone_number)

        # send SMS to volunteer
        message_body = f"Hello {volunteer_name}. Thank you for helping out with a request and being a Good " \
                       f"Samaritan! Please check your email for the beneficiary details. The Good Samaritan " \
                       f"team thanks you for your service!"
        crud.sms_handler(message_body, volunteer_phone_number)

    except Exception:
        return jsonify({"success": False})

    # Update request to not active, add volunteer_id to it
    beneficiary_request = crud.update_beneficiary_request(volunteer, beneficiary_request)
    # Update volunteer offering by updating the service type values
    volunteer_offering = crud.update_volunteer_offering(beneficiary_request, volunteer)

    return jsonify({"success": True})


@app.route("/api/show-feedback-requests", methods=["POST"])
def display_beneficiary_feedback_options():
    """Display the option to provide feedback message for the offered service. """

    logged_user = request.get_json().get("username")
    # Get the user object from the users table
    user_in_db = crud.get_user_by_displayname(logged_user)
    # For user(ben) in beneficiaries table, get the ben object
    beneficiary = crud.get_beneficiary_by_user(user_in_db)
    # Get all the fulfilled service requests of this beneficiary
    fulfilled_requests = crud.get_fulfilled_requests_of_beneficiary(beneficiary)

    return jsonify(
        {fulfilled_request.request_id: fulfilled_request.to_dict() for fulfilled_request in fulfilled_requests})


@app.route("/api/accept-feedback", methods=["POST"])
def process_beneficiary_feedback():
    """Process the feedback message by the beneficiary for the offered service. """

    logged_user = request.get_json().get("username")
    request_id = request.get_json().get("feedbackRequestID")
    feedback_message = request.get_json().get("feedbackMessage")
    # Get user object by displayname
    user_in_db = crud.get_user_by_displayname(logged_user)
    # For user(ben)in beneficiaries table, get the ben object
    beneficiary = crud.get_beneficiary_by_user(user_in_db)
    # Search the request by the id in the requests table
    beneficiary_request = crud.get_beneficiary_request_by_id(request_id)
    # Create the beneficiary rating with the feedback message
    beneficiary_rating = crud.create_beneficiary_rating(feedback_message, beneficiary, beneficiary_request)

    return jsonify({"success": True})


@app.route("/api/accept-user-address", methods=["POST"])
def process_user_address():
    """Process the address entered by the user and find its corresponding latitude and longitude coordinates. """

    user_address = request.get_json().get("address")
    # Convert this address using Geocoding into lat lng co-ordinates
    user_location = crud.convert_user_address(user_address)
    lat = user_location['lat']
    lng = user_location['lng']

    return jsonify({"success": True, "lat": lat, "lng": lng})


@app.route("/api/show_map_requests_data")
def get_map_requests_data():
    """Show all the nearby service requests as markers on the map for a Volunteer. """

    time.sleep(2)
    map_request_data = []
    user_requests = crud.get_all_requests()
    for user_request in user_requests:
        latitude = user_request.beneficiary.user.latitude
        longitude = user_request.beneficiary.user.longitude
        map_request_data.append({"request_id": user_request.request_id, "lat": latitude, "lng": longitude})

    return jsonify(map_request_data)


@app.route("/api/show_map_offerings_data")
def get_map_offerings_data():
    """Show all the nearby service offerings as markers on the map for a Beneficiary. """

    time.sleep(2)
    map_offerings_data = []
    user_offerings = crud.get_all_offerings()
    for user_offering in user_offerings:
        latitude = user_offering.volunteer.user.latitude
        longitude = user_offering.volunteer.user.longitude
        map_offerings_data.append({"request_id": user_offering.offered_id, "lat": latitude, "lng": longitude})

    return jsonify(map_offerings_data)


@app.route('/api/get-in-touch', methods=["POST"])
def get_in_touch():
    """Handle contact form. """

    full_name = request.get_json().get("fullname")
    email = request.get_json().get("email")
    phone_number = request.get_json().get("phoneNumber")
    comments = request.get_json().get("comments")

    if '@' in email:
        message = f"Hello Admin! \nYou have a new contact request. Following are the details:\n" \
                  f"Name: {full_name}\n" \
                  f"Email: {email}\n" \
                  f"PhoneNumber: {phone_number}\n" \
                  f"Comments: {comments}"
        # Sending the mail
        crud.email_handler(os.environ['ADMIN_EMAIL'], message, 'New Feedback Request')

        return jsonify({"success": True})

    else:
        return jsonify({"success": False})


@app.route('/api/forgot-password', methods=["POST"])
def forgot_password():
    """Handle forgotten password. """

    email = request.get_json().get("email")

    user = crud.get_user_by_email(email)

    if user:
        # Create a 10 character alpha-numeric temporary password
        temporary_password = ''.join(random.choices(string.ascii_letters + string.digits, k=8))

        # Use password hashing to convert the password into a hashed value
        hashed_password = bcrypt.generate_password_hash(temporary_password).decode('utf-8')

        # Update the password of the user
        crud.update_user_password(user, hashed_password)

        message = f"Hello {user.first_name}! \n\nA new password request has been made for your registered email with " \
                  f"www.goodsamaritanfinder.org. \n\n" \
                  f"Please use the below temporary password to login to your account:\n" \
                  f"password: {temporary_password}\n\n" \
                  f"We recommend resetting your temporary password using the password reset link below\n" \
                  f"www.goodsamaritanfinder.org/reset-password\n\n" \
                  f"Thank you being a part of the Good Samaritan Finder Network!\n\n" \
                  f"- GSF Admin"

        subject = 'Password reset request'

        # Sending the mail
        crud.email_handler(user.email, message, subject)

        return jsonify({"success": True})

    else:
        return jsonify({"success": False})


@app.route('/api/reset-password', methods=["POST"])
def reset_password():
    """Handle reset password. """

    email = request.get_json().get("email")
    current_password = request.get_json().get("currentPassword")
    new_password = request.get_json().get("newPassword")

    user = crud.get_user_by_email(email)

    if user:
        if bcrypt.check_password_hash(user.password, current_password):

            # Use password hashing to convert the new password into a hashed value
            hashed_password = bcrypt.generate_password_hash(new_password).decode('utf-8')

            # Update the password of the user
            crud.update_user_password(user, hashed_password)

            return jsonify({"success": True})

    return jsonify({"success": False})


if __name__ == "__main__":
    # Connecting to DB before running the app
    model.connect_to_db(app)
    app.run("0.0.0.0", debug=True, port=5001)  # will run on port 5000 by default
