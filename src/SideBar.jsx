import React from "react";
import { Link } from "react-router-dom";

export default function SideBar() {

    return (
        <div>
          <div className="sidebar">
            <div className="side-item">
              <Link
                  to="/requests" className="side-link">
                <b> Requests </b> <br/>
              </Link>
              <Link
                  to="/offerings" className="side-link">
                <b> Offerings </b> <br/>
              </Link>
              <Link
                  to="/matched-requests"  className="side-link">
                <b> Matched Requests </b><br/>
              </Link>
              <Link
                  to="/fulfilled-requests" className="side-link">
                <b> Fulfilled Requests </b> <br/>
              </Link>
            </div>
            </div>
          </div>
    );
  }