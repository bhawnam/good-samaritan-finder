"""Models for the good-samaritan-finder app. """

from flask import Flask

from flask_sqlalchemy import SQLAlchemy 

import enum

from datetime import datetime

db = SQLAlchemy()


class User(db.Model):
    """A user. """

    __tablename__ = 'users'

    user_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    display_name = db.Column(db.String(50), unique=True)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)
    street = db.Column(db.String)
    zipcode = db.Column(db.String(10), nullable=False)
    phone_number = db.Column(db.String(25), nullable=False)
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    is_active = db.Column(db.Boolean, default=True)

    def __repr__(self):
        """ """
        return f'<User user_id={self.user_id} display_name={self.display_name}>'


class Beneficiary(db.Model):
    """A beneficiary. """   

    __tablename__ = 'beneficiaries'

    beneficiary_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    is_b_onboarded = db.Column(db.Boolean, default=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))

    user = db.relationship('User', backref='beneficiaries')
    
    def __repr__(self):
        """ """
        return f'<Beneficiary beneficiary_id={self.beneficiary_id}>'


class Volunteer(db.Model):
    """A volunteer. """

    __tablename__ = 'volunteers'

    volunteer_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    is_v_onboarded = db.Column(db.Boolean, default=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))

    user = db.relationship('User', backref='volunteers')

    def __repr__(self):
        """ """
        return f'<Volunteer volunteer_id={self.volunteer_id}>'


class VolunteerAvailability(db.Model):
    """Volunteer availability timings. """

    __tablename__ = 'volunteer_timings'

    timing_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    availability = db.Column(db.DateTime)
    volunteer_id = db.Column(db.Integer, db.ForeignKey('volunteers.volunteer_id'))

    volunteer = db.relationship('Volunteer', backref='volunteer_timings')

    def __repr__(self):
        """ """
        return f'<VolunteerAvailability volunteer_id={self.volunteer_id} availability={self.availability}>'


class BeneficiaryRating(db.Model):
    """Rating for the beneficiary. """

    __tablename__ = 'beneficiary_ratings'

    rating_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    rating = db.Column(db.Integer)
    feedback_message = db.Column(db.Text)
    beneficiary_id = db.Column(db.Integer, db.ForeignKey('beneficiaries.beneficiary_id'))
    request_id = db.Column(db.Integer, db.ForeignKey('requests.request_id'))

    beneficiary = db.relationship('Beneficiary', backref='beneficiary_ratings')
    request = db.relationship('ServiceRequest', backref='beneficiary_ratings')

    def __repr__(self):
        """ """
        return f'<BeneficiaryRating beneficiary_id={self.beneficiary_id} feedback_message={self.feedback_message}>'


class VolunteerRating(db.Model):
    """Rating for the volunteer. """

    __tablename__ = 'volunteer_ratings'

    rating_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    rating = db.Column(db.Integer)
    volunteer_id = db.Column(db.Integer, db.ForeignKey('volunteers.volunteer_id'))
    response_id = db.Column(db.Integer, db.ForeignKey('offerings.offered_id'))

    volunteer = db.relationship('Volunteer', backref='volunteer_ratings')
    response = db.relationship('ServiceOffered', backref='volunteer_ratings')
    
    def __repr__(self):
        """ """
        return f'<VolunteerRating volunteer_id={self.volunteer_id} rating={self.rating}>'


class ServiceRequest(db.Model):
    """Request for service from the beneficiary. """

    __tablename__ = 'requests'

    request_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    date_of_request = db.Column(db.DateTime)
    date_of_fulfillment = db.Column(db.DateTime)
    request_active = db.Column(db.Boolean, default=True)
    beneficiary_id = db.Column(db.Integer, db.ForeignKey('beneficiaries.beneficiary_id'))
    volunteer_id = db.Column(db.Integer, db.ForeignKey('volunteers.volunteer_id'))
    service_type_id = db.Column(db.Integer, db.ForeignKey('services.type_id'))

    volunteer = db.relationship('Volunteer', backref='requests')
    beneficiary = db.relationship('Beneficiary', backref='requests')
    service_type = db.relationship('ServiceType', backref='requests')
    
    def __repr__(self):
        """ """
        return f'<ServiceRequest request_id={self.request_id} date_of_request={self.date_of_request}>'

    def to_dict(self, distance=0):
        return {
            'request_id': self.request_id,
            'date_of_request': self.date_of_request,
            'date_of_fulfillment': self.date_of_fulfillment,
            'request_active': "Active" if self.request_active else "Fulfilled",
            # 'volunteer': self.volunteer.volunteer_id,
            'beneficiary': self.beneficiary.beneficiary_id,
            'service_type': self.service_type.service_name.name,
            'for_num_persons': self.service_type.for_num_persons,
            'distance': distance
        }


class ServiceOffered(db.Model):
    """Offered services by the Volunteers. """        

    __tablename__ = 'offerings'

    offered_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    volunteer_id = db.Column(db.Integer, db.ForeignKey('volunteers.volunteer_id'))
    service_type_id = db.Column(db.Integer, db.ForeignKey('services.type_id'))
 
    volunteer = db.relationship('Volunteer', backref='offerings')
    service_type = db.relationship('ServiceType', backref='offerings')

    def __repr__(self):
        """ """
        return f'<ServiceOffered offered_id={self.offered_id} volunteer_id={self.volunteer_id}>'

    def to_dict(self):
        return {
            'offered_id': self.offered_id,
            'volunteer': self.volunteer.volunteer_id,
            'service_type': self.service_type.service_name.name,
            'for_num_persons': self.service_type.for_num_persons
        }


class ServiceName(enum.Enum):
    """Name of the service. """

    PACKAGED_MEAL_KIT = 1
    WATER = 2
    FIRST_AID_KIT = 3
    BLANKET = 4
    PET_FOOD = 5
    

class ServiceType(db.Model):
    """Type of Service. """

    __tablename__ = 'services'

    type_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    service_name = db.Column(db.Enum(ServiceName), nullable=False)
    for_num_persons = db.Column(db.Integer, nullable=False)
    is_offered = db.Column(db.String(10))

    def __repr__(self):
        """ """
        return f'<ServiceType type_id ={self.type_id} service_name={self.service_name} is_offered={self.is_offered}>'


def connect_to_db(flask_app, db_uri='postgresql:///samaritan-finder', echo=True):
    flask_app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
    flask_app.config['SQLALCHEMY_ECHO'] = echo
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.app = flask_app
    db.init_app(flask_app)

    print('Connected to the database!')


if __name__ == '__main__':
    from server import app 

    connect_to_db(app)
