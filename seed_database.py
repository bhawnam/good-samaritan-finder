"""Script to seed the database. """

import os
import json 

import crud
import model
import server
import data_generation

os.system('dropdb samaritan-finder')
os.system('createdb samaritan-finder')

model.connect_to_db(server.app)
model.db.create_all()

# Creating 25 random user profiles to be stored in the database
user_data = data_generation.create_user_profile()
users_in_db = []

for user_key in user_data.keys():
    first_name = user_data[user_key]['first_name']
    last_name = user_data[user_key]['last_name']
    display_name = user_data[user_key]['display_name']
    email = user_data[user_key]['email']
    password = user_data[user_key]['password']
    street = user_data[user_key]['street']
    zipcode = user_data[user_key]['zipcode']
    phone_number = user_data[user_key]['phone_number']
    
    user = crud.create_user(first_name, 
                                last_name, 
                                display_name, 
                                email,
                                password,
                                street,
                                zipcode,
                                phone_number)    

    users_in_db.append(user)  
    # Creating beneficiary entries for the database
    if (user_key % 2 == 0):
        is_b_onboarded = True
        beneficiary = crud.create_beneficiary(is_b_onboarded, user)
    
    # Creating volunteer entries for the database
    else:
        is_v_onboarded = True
        volunteer = crud.create_volunteer(is_v_onboarded, user)  