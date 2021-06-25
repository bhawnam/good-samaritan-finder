"""Server for good-samaritan-finder app """

from datetime import datetime
from flask import (Flask, render_template, request, flash, session, redirect)
from flask.json import jsonify

import model
import crud
import time

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

    email = request.get_json().get("email")
    password = request.get_json().get("password")
    username = request.get_json().get("username")

    user_in_db = crud.get_user_by_email(email)
    if user_in_db:
        if user_in_db.password == password:
            return jsonify({"success":True})

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
        crud.onboard_beneficiary(beneficiary)
    # Create a service type and a service request to be added to the DB
    service_type = crud.create_service_type(service_name, for_num_persons)
    date_of_request = datetime.now()
    service_request = crud.create_service_request(date_of_request, beneficiary, service_type)
    # Chek if there is an volunteer offering (with service) available for the desired request
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
        crud.onboard_volunteer(volunteer)
    # Create volunteer availability in timings table
    volunteer_timing = crud.create_volunteer_availability(available_date, volunteer)    
    # Create a service type and service offering to be added to the DB
    service_type = crud.create_service_type(service_name, for_num_persons, is_offered=True)
    service_offering = crud.create_service_offered(volunteer, service_type)
    
    # return jsonify({service_request.request_id: service_request.to_dict()})
    return jsonify({"success": True})


if __name__ == "__main__":
    # Connecting to DB before running the app
    model.connect_to_db(app)
    app.run(host='0.0.0.0', debug=True)