"""Script to seed the database. """

from datetime import datetime
import os
import json 
from random import choice, randint

import crud
import model
import server
import data_generation

os.system('dropdb samaritan-finder')
os.system('createdb samaritan-finder')

model.connect_to_db(server.app)
model.db.create_all()

# Creating 25 random user profiles to be stored in the database for users table
user_data = data_generation.create_user_profile()
users_in_db = []
   
beneficiaries_in_db = []
volunteers_in_db = []

volunteer_timings_in_db = []

for user_key in user_data.keys():
    first_name = user_data[user_key]['first_name']
    last_name = user_data[user_key]['last_name']
    display_name = user_data[user_key]['display_name']
    email = user_data[user_key]['email']
    password = user_data[user_key]['password']
    street = user_data[user_key]['street']
    zipcode = user_data[user_key]['zipcode']
    phone_number = user_data[user_key]['phone_number']
    availability = user_data[user_key]['datetime_availability']
    
    user = crud.create_user(first_name, 
                                last_name, 
                                display_name, 
                                email,
                                password,
                                street,
                                zipcode,
                                phone_number)    

    users_in_db.append(user)  

    # Creating beneficiary entries in beneficiaries table in the database
    if (user_key % 2 == 0):
        is_b_onboarded = True
        beneficiary = crud.create_beneficiary(is_b_onboarded, user)
        beneficiaries_in_db.append(beneficiary)
    # Creating volunteer entries in volunteers table in the database
    else:
        is_v_onboarded = True
        volunteer = crud.create_volunteer(is_v_onboarded, user)  
        volunteers_in_db.append(volunteer)

# Creating availability timing entries in volunteer_timings table in the database 
        volunteer_availability = crud.create_volunteer_availability(availability, volunteer)
        volunteer_timings_in_db.append(volunteer_availability)

# Creating service type entries in services table in the database
service_type_in_db = []
service_name = ["PACKAGED_MEAL_KIT", "WATER", "FIRST_AID_KIT", "BLANKET", "PET_FOOD"]

for name in service_name:
    for_num_persons = randint(1,10)
    service_type = crud.create_service_type(name, for_num_persons)
    service_type_in_db.append(service_type)

# Creating service offered entries in offerings table in the database
service_offered_in_db = []
for _ in range(5):
    service_type = choice(service_type_in_db)
    volunteer = choice(volunteers_in_db)
    rating = randint(1,5)

    service_offered = crud.create_service_offered(volunteer, service_type)
    service_offered_in_db.append(service_offered)
    # Creating a rating entry for volunteer for each service offered     
    volunteer_rating = crud.create_volunteer_rating(rating, volunteer, service_offered)

# Creating service request entries in requests table in the database
service_request_in_db = []
for _ in range(7):
    beneficiary = choice(beneficiaries_in_db)
    service_type = choice(service_type_in_db)
    volunteer = choice(volunteers_in_db)
    rating = randint(1,5)

    # service_request = crud.create_service_request( datetime.now(), datetime.now(), beneficiary, volunteer, service_type)
    service_request = crud.create_service_request( datetime.now(), beneficiary, service_type)
    service_request_in_db.append(service_request)
    # Creating a rating entry for beneficiry for each service request         
    beneficiary_rating = crud.create_beneficiary_rating(rating, beneficiary, service_request)





