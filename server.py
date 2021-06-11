"""Server for good-samaritan-finder app """

from flask import (Flask, render_template, request, flash, session, redirect)

from model import connect_to_db
import crud

from jinja2 import StrictUndefined

app = Flask(__name__)
app.secret_key
app.jinja_env.undefined = StrictUndefined


@app.route('/')
def homepage():
    """Homepage for the good-samritan-finder app. """

    return render_template('homepage.html')


@app.route('/be-a-volunteer')
def onboard_volunteer():
    """Sign Up to be a Volunteer. """    

    return render_template('onboard_volunteer.html')


@app.route('/be-a-beneficiary')
def onboard_beneficiary():
    """Sign Up to be a Beneficiary. """    

    return render_template('onboard_beneficiary.html')


@app.route('/login', methods=['POST'])
def user_login():
    """Process the login of a user. """

    return render_template('placeholder.html')

if __name__ == "__main__":
    # Connecting to DB before running the app
    connect_to_db(app)
    app.run(host='0.0.0.0', debug=True)