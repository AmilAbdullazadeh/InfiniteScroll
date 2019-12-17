import React, { Component } from "react";
import "./App.css";
import ContactList from "./features/contact-list";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-12">
            <h1> Contacts </h1>
            <ContactList />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
