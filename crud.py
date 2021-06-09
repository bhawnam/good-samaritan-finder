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


def create_beneficiary(is_b_onboarded, user):
    """Create a beneficiary. """

    beneficiary = Beneficiary(is_b_onboarded = is_b_onboarded, user = user)

    db.session.add(beneficiary)
    db.session.commit()

    return beneficiary

def create_volunteer(is_v_onboarded, user):    
    """Create a volunteer. """

    volunteer = Volunteer(is_v_onboarded = is_v_onboarded, user = user)

    db.session.add(volunteer)
    db.session.commit()

    return volunteer


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


def create_service_request(date_request, date_fulfilled, beneficiary, volunteer, service_type):
    """Create a service request by a beneficiary. """

    request = ServiceRequest(date_of_request = date_request, 
                            date_of_fulfillment = date_fulfilled, 
                            beneficiary = beneficiary, 
                            volunteer = volunteer, 
                            service_type = service_type)

    db.session.add(request)
    db.session.commit()

    return request


def create_service_offered(volunteer, service_type):
    """Create a service offered by a volunteer. """

    offering = ServiceOffered(volunteer= volunteer, service_type = service_type)

    db.session.add(offering)
    db.session.commit()

    return offering


def create_service_type(service_name, for_num_persons):
    """Create a type of service. """

    service_type = ServiceType(service_name = service_name, for_num_persons = for_num_persons)

    db.session.add(service_type)
    db.session.commit()

    return service_type


if __name__ == '__main__':

    from server import app
    connect_to_db(app)    