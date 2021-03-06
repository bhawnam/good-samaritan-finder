""" CRUD operations on good-samaritan-finder database."""

from model import db, connect_to_db
from model import User, Beneficiary, Volunteer, VolunteerAvailability, BeneficiaryRating, VolunteerRating, ServiceRequest, ServiceOffered, ServiceName, ServiceType  
import googlemaps
import os
import smtplib
from twilio.rest import Client
from email.message import EmailMessage
from haversine import haversine, Unit

SERVICE_RADIUS_MILES = 25

def create_user(first_name, last_name, display_name, email, password, street, zipcode, phone_number, latitude, longitude):
    """Create and return a new user."""

    user = User(first_name=first_name,
                last_name=last_name,
                display_name=display_name,
                email=email,
                password=password,
                street=street,
                zipcode=zipcode,
                phone_number=phone_number,
                latitude=latitude,
                longitude=longitude)

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

    beneficiary = Beneficiary(is_b_onboarded=is_b_onboarded, user=user)

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


def update_user_password(user, hashed_password):
    """Update the value of  password for a user. """

    user.password = hashed_password
    db.session.add(user)
    db.session.commit()


def get_all_requests():
    """Get all requests by users from requests table in the DB. """

    reqs = ServiceRequest.query.all()
    return reqs


def get_requests_by_beneficiary(beneficiary):
    """Get all requests by a beneficiary user from DB. """

    req = ServiceRequest.query.filter_by(beneficiary=beneficiary).all()
    return req


def get_beneficiary_request_by_id(request_id):
    """Get the requests by a beneficiary user from DB. """

    req = ServiceRequest.query.filter_by(request_id=request_id).first()
    return req


def get_fulfilled_requests_of_beneficiary(beneficiary):
    """Get all requests by a beneficiary user from DB. """

    fulfilled_requests = []
    reqs = ServiceRequest.query.filter((ServiceRequest.beneficiary == beneficiary) & (ServiceRequest.request_active == 'f')).all()
    for req in reqs:
        is_rating = check_for_rating(req)
        if not is_rating:
           fulfilled_requests.append(req) 

    return fulfilled_requests


def update_beneficiary_request(volunteer, beneficiary_request):
    """Update the request_active and volunteer assigned to the beneficiary request. """

    beneficiary_request.request_active = False
    beneficiary_request.volunteer = volunteer
    db.session.add(beneficiary_request)
    db.session.commit()

    return beneficiary_request


def create_volunteer(is_v_onboarded, user):    
    """Create a volunteer. """

    volunteer = Volunteer(is_v_onboarded=is_v_onboarded, user=user)

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


def get_all_offerings():
    """Get all offerings by users from offerings table in the DB. """

    offerings = ServiceOffered.query.all()
    return offerings


def get_offerings_by_volunteer(volunteer):
    """Get all offerings by a volunteer user from DB. """

    offerings = ServiceOffered.query.filter_by(volunteer=volunteer).all()
    return offerings


def get_matching_requests_for_volunteer(volunteer):
    """Get all matching requests for the volunteer. """
    
    matching_requests = []
    distance_list = []
    requests = ServiceRequest.query.filter(ServiceRequest.request_active == 't').all()
    offerings = get_offerings_by_volunteer(volunteer)
    volunteer_coordinates = get_user_coordinates(volunteer)

    for offering in offerings:
        for req in requests:
            beneficiary = req.beneficiary
            beneficiary_coordinates = get_user_coordinates(beneficiary)
            if ((req.service_type.service_name == offering.service_type.service_name) and 
                    (req.service_type.for_num_persons <= offering.service_type.for_num_persons)):
                    distance = haversine(volunteer_coordinates, beneficiary_coordinates, unit=Unit.MILES)
                    if distance < SERVICE_RADIUS_MILES:
                        distance_list.append(round(distance,1))
                        matching_requests.append(req)

    return matching_requests, distance_list           
    
    
def update_volunteer_offering(beneficiary_request, volunteer):
    """Based on fulfilled request update volunteer's offering for num persons. """

    volunteer_offerings = ServiceOffered.query.filter_by(volunteer=volunteer).all() 

    for volunteer_offering in volunteer_offerings:
        if volunteer_offering.service_type.service_name == beneficiary_request.service_type.service_name:
            for_num_persons = volunteer_offering.service_type.for_num_persons - beneficiary_request.service_type.for_num_persons
            volunteer_offering.service_type.for_num_persons = for_num_persons

            db.session.add(volunteer_offering)
            db.session.commit()
            return volunteer_offering
    

def create_volunteer_availability(availability, volunteer):
    """Create a volunteer timing availability. """

    timing = VolunteerAvailability(availability=availability, volunteer=volunteer)

    db.session.add(timing)
    db.session.commit()

    return timing


def create_beneficiary_rating(feedback_message, beneficiary, req):
    """Create a rating on a request by a beneficiary."""

    rating = BeneficiaryRating(feedback_message=feedback_message, beneficiary=beneficiary, request=req)

    db.session.add(rating)
    db.session.commit()

    return rating


def check_for_rating(beneficiary_request):
    """Check if a beneficiary rating already exists for the request. """

    rating = BeneficiaryRating.query.filter_by(request=beneficiary_request).first()
    if rating:
        return True
    else:
        return False


def create_volunteer_rating(rating, volunteer, response):
    """Create a rating on a response by a volunteer."""

    rating = VolunteerRating(rating=rating, volunteer=volunteer, response=response)

    db.session.add(rating)
    db.session.commit()

    return rating


def create_service_request(date_request, beneficiary, service_type):
    """Create a service request by a beneficiary. """

    request = ServiceRequest(date_of_request=date_request, 
                             beneficiary=beneficiary, 
                             service_type=service_type)

    db.session.add(request)
    db.session.commit()

    return request


def look_for_request(service_name, for_num_persons):
    """Look for a service and request based on the offering. """

    service = ServiceType.query.filter((ServiceType.service_name == service_name) & (ServiceType.for_num_persons <= for_num_persons) & (ServiceType.is_offered == "false")).first()
    if service:
        request = ServiceRequest.query.filter((ServiceRequest.service_type == service) & (ServiceRequest.request_active == 't')).first()
        if request:
            request_beneficiary = request.beneficiary
            return request_beneficiary
    else:
        return None 


def create_service_offered(volunteer, service_type):
    """Create a service offered by a volunteer user. """

    offering = ServiceOffered(volunteer=volunteer, service_type=service_type)

    db.session.add(offering)
    db.session.commit()

    return offering


def look_for_offering(service_name, for_num_persons, date_of_request):
    """Look for a service and offering based on the request. """

    service = ServiceType.query.filter((ServiceType.service_name == service_name) & (ServiceType.for_num_persons >= for_num_persons) & (ServiceType.is_offered == "true")).first()
    if service_name:
        offering = ServiceOffered.query.filter_by(service_type=service).first()
        if offering:
            volunteer = offering.volunteer
            offering_volunteer = VolunteerAvailability.query.filter((VolunteerAvailability.volunteer == volunteer) & (VolunteerAvailability.availability >= date_of_request)).first()
            return offering_volunteer
    else: 
        return None        


def create_service_type(service_name, for_num_persons, is_offered):
    """Create a type of service. """

    service_type = ServiceType(service_name=service_name, for_num_persons=for_num_persons, is_offered=is_offered)

    db.session.add(service_type)
    db.session.commit()

    return service_type


def check_existing_service(volunteer, service_name):
    """Check if the service is already being offered by the volunteer. """

    service = ServiceType.query.filter(ServiceType.service_name == service_name).first()
    volunteer_offerings = ServiceOffered.query.filter_by(volunteer=volunteer).all()
    for volunteer_offering in volunteer_offerings:
        if volunteer_offering.service_type.service_name == service.service_name:
            return True

    return False


def update_service_offering(volunteer, service_name, for_num_persons):
    """Update the num persons value for the offering by that volunteer. """

    offerings = ServiceOffered.query.filter_by(volunteer=volunteer).all()
    for offering in offerings:
        print(f"{offering.service_type.service_name.name} == {service_name} {offering.service_type.service_name.name == service_name}")
        if offering.service_type.service_name.name == service_name:
            offering.service_type.for_num_persons = offering.service_type.for_num_persons + int(for_num_persons)
            db.session.add(offering)
            db.session.commit()

            return offering


def convert_user_address(user_address):
    """Convert the user entered address to its corresponding latitude and longitude. """
    
    gmaps = googlemaps.Client(key=os.environ['API_KEY'])
    geocode_result = gmaps.geocode(user_address)
    user_location = geocode_result[0]['geometry']['location']

    return user_location


def get_user_coordinates(obj):
    """Get the latitude and longitude co-ordinates for the volunteer """

    lat = obj.user.latitude
    lng = obj.user.longitude
    coordinates = (lat, lng)
    
    return coordinates


def email_handler(recipient_address, message, subject="Good Samaritan Finder"):
    """Send an email to the recipient address using smtp library. """

    s = smtplib.SMTP('smtp.gmail.com', 587)
    # Start TLS for security
    s.starttls()
    # Authentication with sender email account
    s.login(os.environ['ADMIN_EMAIL'], os.environ['LOGIN_PASSWORD'])
    # Sending the mail
    meta_message = EmailMessage()
    meta_message.set_content(message)
    meta_message['Subject'] = subject
    meta_message['From'] = os.environ['ADMIN_EMAIL']
    meta_message['To'] = recipient_address
    s.send_message(meta_message)
    # s.sendmail(os.environ['ADMIN_EMAIL'], recipient_address, message)
    # Terminating the session
    s.quit()


def sms_handler(message_body, phone_number):
    """Send a message to the user using Twilio programmable messaging API. """

    account_sid = os.environ['TWILIO_ACCOUNT_SID']
    auth_token = os.environ['TWILIO_AUTH_TOKEN']
    client = Client(account_sid, auth_token)

    message = client.messages \
                .create(
                     body=message_body,
                     from_=os.environ['FROM_NUMBER'],
                     to=f'+1{phone_number}'
                 )
    print(message.sid)
    

if __name__ == '__main__':
    from server import app
    connect_to_db(app)
    
