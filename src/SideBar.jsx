import React, { useState } from "react";
import { Link } from "react-router-dom";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Button } from "react-bootstrap";

export default function SideBar(props) {
  const {isLogged} = props;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
//   return (
//     <div>
//       <div className="sidebar">
//         <div className="side-item">
//           <Link to="/requests" className="side-link">
//             <b> Requests </b>
//             <br />
//           </Link>
//           <Link to="/offerings" className="side-link">
//             <b> Offerings </b>
//             <br />
//           </Link>
//           <Link to="/matched-requests" className="side-link">
//             <b> Matched Requests </b>
//             <br />
//           </Link>
//           <Link to="/fulfilled-requests" className="side-link">
//             <b> Fulfilled Requests </b>
//             <br />
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }
return (
  <>
    {isLogged && (
    <a href="#" onClick={handleShow} > Quick Links</a>
    )}
    <br />
    <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Quick Links</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
      <div className="sidebar">
        <div className="side-item">
          <Link to="/requests" className="side-link">
            <b> Requests </b>
            <br />
          </Link>
          <Link to="/offerings" className="side-link">
            <b> Offerings </b>
            <br />
          </Link>
          <Link to="/matched-requests" className="side-link">
            <b> Matched Requests </b>
            <br />
          </Link>
          <Link to="/fulfilled-requests" className="side-link">
            <b> Fulfilled Requests </b>
            <br />
          </Link>
        </div>
      </div>
      </Offcanvas.Body>
    </Offcanvas>
  </>
);
}
