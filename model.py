"""Models for the good-samaritan-finder app. """

from flask import Flask

from flask_sqlalchemy import SQLAlchemy 

import enum

db = SQLAlchemy()

class User(db.Model):
    """A user. """

    __tablename__ = 'users'

    user_id = db.Column(db.Integer, autoincrement = True, primary_key = True)
    first_name = db.Column(db.String(50), nullable = False)
    last_name = db.Column(db.String(50), nullable = False)
    display_name = db.Column(db.String(50), unique = True)
    email = db.Column(db.String, unique = True, nullable = False)
    password = db.Column(db.String, nullable = False)
    street = db.Column(db.String)
    zipcode = db.Column(db.String(10), nullable = False)
    phone_number = db.Column(db.String(25), nullable = False)
    is_active = db.Column(db.Boolean, default = False)


    def __repr__(self):
        """ """
        return f'<User user_id={self.user_id} display_name={self.display_name}>'


class Beneficiary(db.Model):
    """A beneficiary. """   

    __tablename__ = 'beneficiaries'

    beneficiary_id = db.Column(db.Integer, autoincrement = True, primary_key = True)
    is_b_onboarded = db.Column(db.Boolean, default = False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))


    def __repr__(self):
        """ """
        return f'<Beneficiary beneficiary_id={self.beneficiary_id}>'


class Volunteer(db.Model):
    """A volunteer. """

    __tablename__ = 'volunteers'

    volunteer_id = db.Column(db.Integer, autoincrement = True, primary_key = True)
    is_v_onboarded = db.Column(db.Boolean, default = False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))


    def __repr__(self):
        """ """
        return f'<Volunteer volunteer_id={self.volunteer_id}>'


class VolunteerAvailability(db.Model):
    """Volunteer availability timings. """

    __tablename__ = 'volunteer_timings'

    timing_id = db.Column(db.Integer, autoincrement = True, primary_key = True)
    availability = db.Column(db.DateTime)
    volunteer_id = db.Column(db.Integer, db.ForeignKey('volunteers.volunteer_id'))


    def __repr__(self):
        """ """
        return f'<VolunteerAvailability volunteer_id={self.volunteer_id} availability ={self.availability}>'


class BeneficiaryRating(db.Model):
    """Rating for the beneficiary. """

    __tablename__ = 'beneficiary_ratings'

    rating_id = db.Column(db.Integer, autoincrement = True, primary_key = True)
    rating = db.Column(db.Integer)
    beneficiary_id = db.Column(db.Integer, db.ForeignKey('beneficiaries.beneficiary_id'))
    request_id =  db.Column(db.Integer, db.ForeignKey('requests.request_id'))

    
    def __repr__(self):
        """ """
        return f'<BeneficiaryRating beneficiary_id={self.beneficiary_id} rating ={self.rating}>'


class VolunteerRating(db.Model):
    """Rating for the volunteer. """

    __tablename__ = 'volunteer_ratings'

    rating_id = db.Column(db.Integer, autoincrement = True, primary_key = True)
    rating = db.Column(db.Integer)
    volunteer_id = db.Column(db.Integer, db.ForeignKey('volunteers.volunteer_id'))
    response_id =  db.Column(db.Integer, db.ForeignKey('offerings.offered_id'))

    
    def __repr__(self):
        """ """
        return f'<VolunteerRating volunteer_id={self.volunteer_id} rating ={self.rating}>'


class ServiceRequest(db.Model):
    """Request for service from the beneficiary. """

    __tablename__ = 'requests'

    request_id = db.Column(db.Integer, autoincrement = True, primary_key = True)
    date_of_request = db.Column(db.dateTime)
    date_of_fulfillment = db.Column(db.dateTime)
    request_active = db.Column(db.Boolean, default = False)
    beneficiary_id = db.Column(db.Integer, db.ForeignKey('beneficiaries.beneficiary_id'))
    volunteer_id = db.Column(db.Integer, db.ForeignKey('volunteers.volunteer_id'))
    service_type_id =  db.Column(db.Integer, db.ForeignKey('services.service_type_id'))

    
    def __repr__(self):
        """ """
        return f'<ServiceRequest request_id={self.request_id} date_of_request={self.date_of_request}>'


class ServiceOffered(db.Model):
    """Offered services by the Volunteers. """        

    __tablename__ = 'offerings'

    offered_id = db.Column(db.Integer, autoincrement = True, primary_key = True)
    volunteer_id = db.Column(db.Integer, db.ForeignKey('volunteers.volunteer_id'))
    service_type_id =  db.Column(db.Integer, db.ForeignKey('services.service_type_id'))
 
    def __repr__(self):
        """ """
        return f'<ServiceOffered offered_id={self.request_id} volunteer_id={self.volunteer_id}>'


class ServiceName(enum.Enum):
    PACKAGED_MEAL_KIT = 1
    WATER = 2
    FIRST_AID_KIT = 3
    BLANKET = 4
    PET_FOOD = 5
    

class ServiceType(db.Model):
    """Type of Service. """

    __tablename__ = 'services'

    type_id = db.Column(db.Integer, autoincrement = True, primary_key = True)
    service_name = db.Column(db.Enum(ServiceName), nullable = False)
    for_num_persons = db.Column(db.Integer, nullable = False)

    def __repr__(self):
        """ """
        return f'<ServiceType type_id ={self.type_id}, service_name = {self.service_name}>'


def connect_to_db(flask_app, db_uri='', echo=True):
    flask_app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
    flask_app.config['SQLALCHEMY_ECHO'] = echo
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.app = flask_app
    db.init_app(flask_app)

    print('Connected to the database!')


# if __name__== '__main':
#    from server import app 
#    connect_to_db(app)    