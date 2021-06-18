"""Server for good-samaritan-finder app """

from flask import (Flask, render_template, request, flash, session, redirect)
from flask.json import jsonify

from model import connect_to_db
import crud

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
    street = request.get_json(0).get("address")
    zipcode = request.get_json().get("zipcode")

    user_in_db = crud.get_user_by_displayname(username)

    if user_in_db:
        return jsonify({"success": False})
    
    else:
        register_user = crud.create_user(first_name, last_name, username, email, password, street, zipcode, phone_number)
        return jsonify({"success":True})    


if __name__ == "__main__":
    # Connecting to DB before running the app
    connect_to_db(app)
    app.run(host='0.0.0.0', debug=True)