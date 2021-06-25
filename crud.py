""" CRUD operations on good-samaritan-finder database."""

from model import db, connect_to_db
from model import User, Beneficiary, Volunteer, VolunteerAvailability, BeneficiaryRating, VolunteerRating, ServiceRequest, ServiceOffered, ServiceName, ServiceType  


def create_user(first_name, last_name, display_name, email, password, street, zipcode, phone_number):
    """Create and return a new user."""

    user = User(first_name = first_name,
                last_name = last_name,
                display_name = display_name,
                email = email,
                password = password,
                street = street,
                zipcode = zipcode,
                phone_number = phone_number)

    db.session.add(user)
    db.session.commit()

    return user     


def get_user_by_displayname(username):
    """Get user by username from the DB """

    user = User.query.filter_by(display_name=username).first()
    return user


def get_user_by_email(email):
    """Get user by email from the DB """

    user = User.query.filter_by(email=email).first()
    return user  


def create_beneficiary(is_b_onboarded, user):
    """Create a beneficiary. """

    beneficiary = Beneficiary(is_b_onboarded = is_b_onboarded, user = user)

    db.session.add(beneficiary)
    db.session.commit()

    return beneficiary


def get_beneficiary_by_user(user):
    """Get a beneficiary from DB by it's user reference. """

    beneficiary = Beneficiary.query.filter_by(user=user).first()
    return beneficiary


def onboard_beneficiary(beneficiary):
    """Update the value of onboarded beneficiary. """

    beneficiary.is_b_onboarded = True
    db.session.add(beneficiary)
    db.session.commit()

    return beneficiary


def get_requests_by_beneficiary(beneficiary):
    """Get all requests by a beneficiary user from DB. """

    req = ServiceRequest.query.filter_by(beneficiary=beneficiary).all()
    return req


def create_volunteer(is_v_onboarded, user):    
    """Create a volunteer. """

    volunteer = Volunteer(is_v_onboarded = is_v_onboarded, user = user)

    db.session.add(volunteer)
    db.session.commit()

    return volunteer


def get_volunteer_by_user(user):
    """Get a volunteer from DB by it's user reference. """

    volunteer = Volunteer.query.filter_by(user=user).first()
    return volunteer


def onboard_volunteer(volunteer):
    """Update the value of onboarded volunteer. """

    volunteer.is_v_onboarded = True
    db.session.add(volunteer)
    db.session.commit()

    return volunteer


def get_offerings_by_volunteer(volunteer):
    """Get all offerings by a volunteer user from DB. """

    offerings = ServiceOffered.query.filter_by(volunteer=volunteer).all()
    return offerings


def create_volunteer_availability(availability, volunteer):
    """Create a volunteer timing availability. """

    timing = VolunteerAvailability(availability = availability, volunteer = volunteer)

    db.session.add(timing)
    db.session.commit()

    return timing


def create_beneficiary_rating(rating, beneficiary, request):
    """Create a rating on a request by a beneficiary."""

    rating = BeneficiaryRating(rating = rating, beneficiary = beneficiary, request = request)

    db.session.add(rating)
    db.session.commit()

    return rating


def create_volunteer_rating(rating, volunteer, response):
    """Create a rating on a response by a volunteer."""

    rating = VolunteerRating(rating = rating, volunteer = volunteer, response = response)

    db.session.add(rating)
    db.session.commit()

    return rating


# def create_service_request(date_request, date_fulfilled, beneficiary, volunteer, service_type):
#     """Create a service request by a beneficiary. """

#     request = ServiceRequest(date_of_request = date_request, 
#                             date_of_fulfillment = date_fulfilled, 
#                             beneficiary = beneficiary, 
#                             volunteer = volunteer, 
#                             service_type = service_type)

#     db.session.add(request)
#     db.session.commit()

#     return request
def create_service_request(date_request, beneficiary, service_type):
    """Create a service request by a beneficiary. """

    request = ServiceRequest(date_of_request = date_request, 
                            beneficiary = beneficiary, 
                            service_type = service_type)

    db.session.add(request)
    db.session.commit()

    return request


def create_service_offered(volunteer, service_type):
    """Create a service offered by a volunteer user. """

    offering = ServiceOffered(volunteer= volunteer, service_type = service_type)

    db.session.add(offering)
    db.session.commit()

    return offering


def look_for_offering(service_name, for_num_persons, date_of_request):
    """Look for an service and offering based on the request. """

    service = ServiceType.query.filter((ServiceType.service_name == service_name) & (ServiceType.for_num_persons > for_num_persons) & (ServiceType.is_offered == "true")).first()
    offering = ServiceOffered.query.filter_by(service_type=service).first()
    volunteer = offering.volunteer
    offering_volunteer = VolunteerAvailability.query.filter((VolunteerAvailability.volunteer == volunteer) & (VolunteerAvailability.availability > date_of_request)).first()

    return offering_volunteer


def create_service_type(service_name, for_num_persons, is_offered):
    """Create a type of service. """

    service_type = ServiceType(service_name = service_name, for_num_persons = for_num_persons, is_offered=is_offered)

    db.session.add(service_type)
    db.session.commit()

    return service_type


if __name__ == '__main__':

    from server import app
    connect_to_db(app)    