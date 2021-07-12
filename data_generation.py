from faker import Faker
import json
import random

fake = Faker()


def create_user_profile():

    user_profile = {}

    for i in range(0, 25):
        user_profile[i] = {} 
        first_name = fake.unique.first_name()
        user_profile[i]['first_name'] = first_name
        last_name = fake.last_name()
        user_profile[i]['last_name'] = last_name
        display_name = generate_display_name(first_name)
        user_profile[i]['display_name'] = display_name
        email = fake.email()
        user_profile[i]['email'] = email
        password = fake.password()
        user_profile[i]['password'] = password
        street_address = fake.street_address()
        user_profile[i]['street'] = street_address
        zipcode = fake.postcode()
        user_profile[i]['zipcode'] = zipcode
        phone_number = fake.phone_number()
        user_profile[i]['phone_number'] = phone_number
        availability = fake.future_datetime(end_date="+5d")
        user_profile[i]['datetime_availability'] = availability

    return user_profile


def generate_display_name(name):

    display_name = f'{name}{random.randint(1,10)}'
    return display_name
