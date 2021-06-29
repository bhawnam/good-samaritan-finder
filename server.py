"""Server for good-samaritan-finder app """

from datetime import datetime
from flask import (Flask, render_template, request, flash, session, redirect)
from flask.json import jsonify

import model
import crud
import time

import os
import smtplib

from jinja2 import StrictUndefined

app = Flask(__name__)
app.secret_key="dev"
app.jinja_env.undefined = StrictUndefined


@app.route('/')
def homepage():
    """Homepage for the good-samritan-finder app. """

    return render_template('index.html')


@app.route('/<path>')
def route(path):

    return render_template('index.html')


@app.route('/<path>/<code>')
def nested_route(path, code):

    return render_template('index.html')    


@app.route('/login-user', methods=["POST"])
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
        if user_in_db.password == password:
            return jsonify({"success": True, "username": username, "email": email})

        else:  
            return jsonify({"success":False})


@app.route('/register-user', methods=["POST"])
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

    user_in_db = crud.get_user_by_displayname(username)

    if user_in_db:
        return jsonify({"success": False})
    
    else:
        # Register the user in the users table in the DB 
        register_user = crud.create_user(first_name, last_name, username, email, password, street, zipcode, phone_number)
        # Add user in beneficiaries and volunteers table in the DB 
        beneficiary = crud.create_beneficiary(False, register_user)
        volunteer = crud.create_volunteer(False, register_user)
        return jsonify({"success":True})    


@app.route('/api/requests', methods=["POST"])
def get_beneficiary_requests():
    """Get a list of the beneficiary requests. """

    logged_user = request.get_json().get("loggedUser")
    # Get the user object from the users table
    user_in_db = crud.get_user_by_displayname(logged_user)
    # For user(ben) in beneficiaries table, get all requests
    beneficiary = crud.get_beneficiary_by_user(user_in_db)
    # Get all the service requests from this beneficiary
    beneficiary_requests = crud.get_requests_by_beneficiary(beneficiary)

    return jsonify({request.request_id: request.to_dict() for request in beneficiary_requests})


@app.route('/api/offerings', methods=["POST"])
def get_beneficiary_offerings():
    """Get a list of the beneficiary offerings. """

    logged_user = request.get_json().get("loggedUser")
    # Get the user object from the users table
    user_in_db = crud.get_user_by_displayname(logged_user)
    # For user(vol) in volunteers table, get all offerings
    volunteer = crud.get_volunteer_by_user(user_in_db)
    # Get all the service offerings from this volunteer
    volunteer_offerings = crud.get_offerings_by_volunteer(volunteer)

    return jsonify({offering.offered_id: offering.to_dict() for offering in volunteer_offerings})


@app.route('/add-request', methods=["POST"])
def add_user_request():
    """Process the request added by the user. """

    service_name = request.get_json().get("requestservicetype")
    print(f"Service type {service_name}" )
    for_num_persons = request.get_json().get("requestfornumpersons")
    print(f"Number {for_num_persons}" )
    logged_user = request.get_json().get("user")
    print(f"User {logged_user}")
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
    # return jsonify({service_request.request_id: service_request.to_dict()})
    if is_offering_volunteer:
        return jsonify({"success": True})
    else:
        return jsonify({"success": False})    


@app.route('/add-offering', methods=["POST"])
def add_user_offering():
    """Process the offering added by the user. """

    service_name = request.get_json().get("offeringservicetype")
    print(f"Service type {service_name}" )
    for_num_persons = request.get_json().get("offeringfornumpersons")
    print(f"Number {for_num_persons}" )
    available_date = request.get_json().get("availabledate")
    print(f"Date {available_date}")
    logged_user = request.get_json().get("user")
    print(f"User {logged_user}")
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
    print(f"is_service {is_service}")
    if is_service: 
        service_offering = crud.update_service_offering(volunteer, service_name, for_num_persons)
    else:
        service_type = crud.create_service_type(service_name, for_num_persons, is_offered=True)
        service_offering = crud.create_service_offered(volunteer, service_type)
    
    is_request_beneficiary = crud.look_for_request(service_name, for_num_persons)
    # return jsonify({service_request.request_id: service_request.to_dict()})
    if is_request_beneficiary:
        return jsonify({"success": True})
    else:
        return jsonify({"success" : False})    


@app.route("/api/matched-requests", methods=["POST"])
def show_matched_requests():
    """Display the matched requests to the volunteer for approval. """

    logged_user = request.get_json().get("loggedUser")
    print(f"Logged user: {logged_user}")
    # Get the user object from the users table
    user_in_db = crud.get_user_by_displayname(logged_user)
    volunteer = crud.get_volunteer_by_user(user_in_db)
    # Get all the service requests matching for this volunteer
    matching_requests = crud.get_matching_requests_for_volunteer(volunteer)

    return jsonify({matching_request.request_id: matching_request.to_dict() for matching_request in matching_requests})


@app.route("/accept-request", methods=["POST"])
def process_accepted_requests():
    """Process the request accepted by the volunteer. """

    logged_user = request.get_json().get("user")
    request_id = request.get_json().get("request_id")
    # Get the user object from the users table
    user_in_db = crud.get_user_by_displayname(logged_user)
    volunteer = crud.get_volunteer_by_user(user_in_db)
    # Search the request by the id in the requests table
    beneficiary_request = crud.get_beneficiary_request_by_id(request_id)
    # Update request to not active, add volunteer_id to it
    beneficiary_request = crud.update_beneficiary_request(volunteer, beneficiary_request)
    # Update volunteer offering by updating the servicy type values
    volunteer_offering = crud.update_volunteer_offering(beneficiary_request, volunteer)

    #Get the email address and names of volunteers and beneficiaries and send them confirmation emails.    
    beneficiary_name = beneficiary_request.beneficiary.user.first_name
    print(f"name {beneficiary_name}")
    beneficiary_email = beneficiary_request.beneficiary.user.email
    print(f"email {beneficiary_email}")

    volunteer_name = beneficiary_request.volunteer.user.first_name
    print(f"name {volunteer_name}")
    volunteer_email = beneficiary_request.volunteer.user.email
    print(f"email {volunteer_email}")

    destination_list = [beneficiary_email, volunteer_email]

    for destination in destination_list:
        if destination == beneficiary_email:
    # Create SMTP session
            s = smtplib.SMTP('smtp.gmail.com', 587) 
            # Start TLS for security
            s.starttls() 
            # Authentication with sender email account
            s.login("goodsamaritanfinder@gmail.com", os.environ['LOGIN_PASSWORD'])
            # Message to be sent to the users
            message = f"Hello {beneficiary_name}. Thank you for your request. We have found a volunteer to help you out. You will be recieving your requested item tomorrow."
            # Sending the mail
            s.sendmail("goodsamaritanfinder@gmail.com", beneficiary_email, message)
            # Terminating the session
            s.quit()

        else:
            s = smtplib.SMTP('smtp.gmail.com', 587) 
            # Start TLS for security
            s.starttls() 
            # Authentication with sender email account
            s.login("goodsamaritanfinder@gmail.com", os.environ['LOGIN_PASSWORD'])
            # Message to be sent to the users
            message = f"Hello {volunteer_name}. Thank you for helping out with a request. Here are the beneficiary details for your drop-off tomorrow."
            # Sending the mail
            s.sendmail("goodsamaritanfinder@gmail.com", volunteer_email, message)
            # Terminating the session
            s.quit()

    
    return jsonify({"success": True})


if __name__ == "__main__":
    # Connecting to DB before running the app
    model.connect_to_db(app)
    app.run(host='0.0.0.0', debug=True)