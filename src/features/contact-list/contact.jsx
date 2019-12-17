import React from "react";

const Contact = props => (
  <div className={"contact"}>
    <div>{props.name}</div>
    <div>{props.email}</div>
    <div>{props.phone}</div>
    <div>
      {props.address} {props.suite}
    </div>
    <div>
      {props.city} {props.state}, {props.zip}
    </div>
  </div>
);

export default Contact;
