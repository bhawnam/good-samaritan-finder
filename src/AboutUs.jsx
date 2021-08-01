import React from "react";

export default function AboutUs() {
  return (
    <div>
      <div className="container-fluid">
        <div>
          <h3>Welcome to Good Samaritan Finder</h3>
        </div>
        <div>
          <p>
            Good Samaritan Finder is a non-profit organization which
            connects volunteers (Good Samaritans) and beneficiaries during unanticipated times.
            This started out as an effort to help volunteers organize the work being taken
            up by Volunteers so, they can focus on helping folks without being
          </p>
          <br />
          <p>
            Our generation has lived to see the unthinkable - a global pandemic
            and challenges emerging from changing climatic conditions. While
            some of us have been fortunate to endure through the rough times,
            there have been challenging and pressing times where some of us were
            desperately seeking help.
          </p>
          <br />
          <div className="row">
          <div className="col-sm"> One of three columns </div>
          <div className="col-sm"> One of three columns </div>
          <div className="col-sm"> One of three columns </div>
        </div>
          <p>
            Temp place holder
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
