# Good Samaritan Finder

In this social media age, it is very easy to put up a post for volunteering a service and get overwhelming number of responses with not enough bandwidth to help out. Good Samaritan Finder is a full-stack web-app matching volunteer offerings with beneficiary requests in a local community. Unless services match, the details of the users are not shared thus protecting their privacy.
<br> 
This single-page React app uses Python and Flask at backend, Google Maps and Places API for geocoding and autocompleting addresses. A tailor made matching algorithm  matches users within a certain radius is determined from Geo coordinates using Haversine formula based on the services offered, availability date and the number of persons. Once a match is found, both Volunteers and Beneficiaries are notified over email and SMS using SMTP library and the Twilio API, respectively. The GoodSamaritanFinder website also supports features like leaving feedback, keeping track of statistics. As of 8/5/2021 Good Samaritan Finder has been officially registered as a non-profit in the state of California. 
<br>
The deployment of www.GoodSamaritanFinder.org is done using the Amazon LightSail.

<br> 

## Contents 
* [Features](#features)
* [Technologies & Stack](#techstack)
* [Set-up & Installation](#installation)
* [About the Developer](#aboutme)

## <a name="features"></a> Features


## <a name="techstack"></a> Technologies and Stack
**Backend:**
Python, Flask, Flask Bcrypt, SQLAlchemy, PostgreSQL, SMTP Library, JS Sweet Alerts,
Python Haversine Library <br>
**Frontend:**
React, Javascript, Babel, React Bootstrap, Google Fonts, HTML5, CSS3 <br>
**APIs:**
Google Maps JavaScript API, Places API, Geocoding API, Twilio SMS Programmable API


## <a name="installation"></a> Set-up & Installation

Install a code editor such as [VS code](https://code.visualstudio.com/download) or [Sublime Text](https://www.sublimetext.com/).<br>
Install [Python3](https://www.python.org/downloads/mac-osx/)<br>
Install [pip](https://pip.pypa.io/en/stable/installing/), the package installer for Python <br>
Install [postgreSQL](https://www.postgresql.org/) for the relational database.<br>


Clone or fork repository:
```
$ git clone https://github.com/bhawnam/good-samaritan-finder.git
```
Create and activate a virtual environment inside the good samaritan finder directory:
```
$ virtualenv env
$ source env/bin/activate
```
Install dependencies:
```
$ pip3 install -r requirements.txt
```
Make an account with [Google](https://.com/documentation) & get an [API key](https://.com/users/register/free).<br>
Make an account with [Twilio](https://www.twilio.com/docs) & get an [API key](https://www.twilio.com/docs/usage/api).<br>

Store these keys in a file named 'secrets.sh' <br> 
```
$ source secrets.sh
```
With PostgreSQL, create the samaritan-finder database
```
$ createdb samaritan-finder
```
Create all tables and relations in the database and seed all data:
```
$ python3 seed_database.py
```
Run the app from the command line:
```
$ python3 server.py

First, from `api/` folder run `virtualenv env` then `source env/bin/activate` then
`pip3 install -r requirements.txt`

From the main project folder, run `npm install`.

## Running the application

In 2 different tabs

- Run Python server `npm run py-dev`
- Run Javascript server `npm run dev`


## <a name="aboutme"></a> About the Developer

Good Samaritan Finder creator Bhawna Mulchandani completed her Bachelor's in Computer Engineering and Master's in Software Engineering from San Jose State University and started working as a Quality Engineer at Intuit.  Her dedication and hard-work earned her spotlight awards for going above and beyond. She quickly transitioned from QE 1 to QE 2.  After working at Intuit for 3 years, she travelled back to India to support her family. Upon her return, she set up her own cloud kitchen with Shef.com delivering freshly-cooked meals in the bay area. She was titled the local favorite with a stellar 5-star rating. Recently, she joined Hackbright to pave her way back into the tech industry as a Full-Stack engineer. Her project at Hackbright is now an officially registered CA non-profit.
She can be found on [LinkedIn](https://www.linkedin.com/in/bhawnamulchandani/) and on [Github](https://github.com/bhawnam).