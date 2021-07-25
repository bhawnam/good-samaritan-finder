import React from "react";

export default function Homepage() {
  return (
    <div id="home-banner" className="row">
      <div className="container-fluid">
        <div>
          <h3>Welcome to Good Samaritan Finder</h3>
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
          <blockquote className="twitter-tweet">
            <a href="https://twitter.com/SonuSood/status/1391298808735174659?ref_src=twsrc%5Etfw">
              Tweet May 9, 2021
            </a>
          </blockquote>
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
