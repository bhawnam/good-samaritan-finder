from faker import Faker
import json
import random

fake = Faker()


def create_user_profile():

    user_profile = {}
    user_address = get_user_address("data/mlsListings.csv")

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
        street_address = user_address[i+1]['street_address']
        user_profile[i]['street'] = street_address
        zipcode = user_address[i+1]['zipcode']
        user_profile[i]['zipcode'] = zipcode
        phone_number = fake.phone_number()
        user_profile[i]['phone_number'] = phone_number
        availability = fake.future_datetime(end_date="+5d")
        user_profile[i]['datetime_availability'] = availability
        latitude = user_address[i+1]['latitude']
        user_profile[i]['latitude'] = latitude
        longitude = user_address[i+1]['longitude']
        user_profile[i]['longitude'] = longitude

    return user_profile


def generate_display_name(name):

    display_name = f'{name}{random.randint(1,10)}'
    return display_name


def get_user_address(filename):
    """Read a csv file to retrieve address-specific details. """

    address_data = open(filename)
    address_dict = {}
    idx = 0
    for line in address_data:
        if line == '\n':
            break
        address_dict[idx] = {}
        street_address = line.rstrip().split(',')[3]
        address_dict[idx]['street_address'] = street_address
        zipcode = line.rstrip().split(',')[6]
        address_dict[idx]['zipcode'] = zipcode
        latitude = line.rstrip().split(',')[-2]
        address_dict[idx]['latitude'] = latitude
        longitude = line.rstrip().split(',')[-1]
        address_dict[idx]['longitude'] = longitude
        idx = idx + 1
    return address_dict
