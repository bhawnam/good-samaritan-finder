import React from "react";
import Carousel from 'react-bootstrap/Carousel'

export default function Homepage() {
  return (
    <div id="home-banner" className="row">
      <Carousel variant="dark">
        <Carousel.Item style={{ height: "500px" }}>
          <img
            className="d-flex w-100"
            src="src/images/carousel1.png"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3> Stepping up. </h3>
            <p> Packaging of food items for distribution. </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item style={{height: "500px"}}>
          <br/>
          <img
            className="d-block w-100"
            src="src/images/carousel2.png"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3> Help one another.</h3>
            <p> Helping and Uplifting one another.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item style={{height: "500px"}}>
          <img
            className="d-block w-100"
            src="src/images/carousel3.png"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3> Love our community.</h3>
            <p> Coming together as a community.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <div className="container-fluid">
        <div>
          <h3>Welcome to Good Samaritan Finder</h3>
        </div>
        <div className="row">
          <div className="col-4">
            <img
              src="src/images/joel-muniz-qvzjG2pF4bE-unsplash.jpeg"
              alt="Elderly Hands"
              width="100%"
              className="rounded"
            />

          </div>
          <div className="col-8">col-4</div>
        </div>
        <div>
          <p>
            We are a non-profit organization connect volunteers and
            beneficiaries during unanticipated times. This started out as a
            small effort to organize the work being taken up by Volunteers so,
            they can focus on helping folks without being{" "}
          </p>
        </div>
        <div>
          <blockquote className="blockquote">
            <p className="mb-2">
              Thank you dear Allen for helping us with the much needed
              essentials to keep us going during our most difficult times!
            </p>
            <footer className="blockquote-footer">
              Richard<cite title="Source Title">Dallas, Texas</cite>
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}