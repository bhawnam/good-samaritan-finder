import React from "react";
import Carousel from 'react-bootstrap/Carousel'
import carousel_img1 from './images/pexels-rodnae-productions-6646778.jpeg'
import carousel_img2 from './images/carousel2.png'
import carousel_img3 from './images/carousel3.png'


export default function Homepage() {
  return (
    <div id="home-banner" className="row">
      <Carousel variant="dark">
        <Carousel.Item style={{ height: "500px" }}>
          <img
            className="d-flex w-100"
            src={carousel_img1}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item style={{height: "500px"}}>
          <br/>
          <img
            className="d-block w-100"
            src={carousel_img2}
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item style={{height: "500px"}}>
          <img
            className="d-block w-100"
            src={carousel_img3}
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>

      <div className="container-fluid">
        <div class="p-1 rounded-3">
          <div class="container-fluid py-5">
            <h1 class="display-5 fw-bold">Welcome to Good Samaritan Finder </h1>
        <p class="col-md-8 fs-4"> Good Samaritan Finder is a non-profit organization which connects volunteers (Good Samaritans) 
        with beneficiaries during unanticipated times. This started out as an effort to help volunteers organize the work 
        that they can sign up for without getting overwhelmed with the requests and they can continue what they 
        do best - helping people. </p>
       </div>
      </div>
      <div class="row align-items-md-stretch">
      <div class="col-md-6">
        <div class="h-100 p-4 border rounded-3">
          <h2>Volunteers </h2>
          <p> Our Good Samaritans provide their valuable time and offer services and help those in need.
            Using our platform they can put in an offering of a service and their availability radius area. Keeping urgent need
            of our beneficiaries in mind, we match the their offerings with our beneficiary requests. Only when matched,  volunteers
            recieve the details of the beneficairy thereby protecting the identities of all our users.
          </p>
          <p>
            Join our platform to help someone in need. You can also know more about being a Volunteer on our Volunteer page.  
          </p>
          <div class="d-grid gap-5 d-md-flex justify-content-center">
          <a class="btn btn-outline-primary" href="/join-us" role="button">Join Us</a>
          <a class="btn btn-outline-primary" href="/be-a-volunteer" role="button">Learn More</a>
        </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="h-100 p-4 border rounded-3">
          <h2> Beneficiaries </h2>
          <p> With these unprecendeted times, we have seen numerous people starve for the basic neccesities. 
            A lot of people have struggled to keep their familes safe. Our platform provides a step to add in a 
            request of their need and we match it with the offerings of our Good Samaritans. We keep in mind the urgency, and 
            immediately notify the Beneficiaries and Volunteers of a match and the next steps. 
            </p>
            <p>
            Join our platform if you are need of assistance. You can also know more about being a Beneficiary on our Beneficiary page.
            </p>
            <div class="d-grid gap-5 d-md-flex justify-content-center">
          <a class="btn btn-outline-primary" href="/join-us" role="button">Join Us</a>
          <a class="btn btn-outline-primary" href="/be-a-beneficiary" role="button">Learn More</a>
        </div>
        </div>
      </div>
    </div>
      </div>
    </div>
  );
}