import React from "react";
import fetch from "isomorphic-fetch";
import Contact from "./contact";

class ContactList extends React.Component {
  state = {
    contacts: [],
    per: 8,
    page: 1,
    totalPage: null,
    scrolling: false
  };

  componentWillMount() {
    this.loadContacts();
    this.scrollListener = window.addEventListener("scroll", e => {
      this.handleScroll(e);
    });
  }

  handleScroll = e => {
    const { scrolling, totalPage, page } = this.state;
    if (scrolling) return;
    if (totalPage <= page) return;
    const lastLi = document.querySelector("ul.contacts > li:last-child");
    const lastLiOffset = lastLi.offsetTop + lastLi.clientHeight;
    const pageOffset = window.pageYOffset + window.innerHeight;
    const bottomOffset = 20;
    if (pageOffset > lastLiOffset - bottomOffset) this.loadMore();
  };

  loadContacts = () => {
    const { per, page, contacts } = this.state;
    const url = `https://student-example-api.herokuapp.com/v1/contacts.json?per=${per}&page${page}`;
    fetch(url)
      .then(response => response.json())
      .then(json =>
        this.setState({
          contacts: [...contacts, ...json.contacts],
          scrolling: false,
          totalPage: json.total_pages
        })
      );
  };

  loadMore = () => {
    this.setState(
      prevState => ({
        page: prevState + 1,
        scrolling: true
      }),
      this.loadContacts
    );
  };

  render() {
    return (
      <div>
        <ul className={"contacts"}>
          {this.state.contacts.map((contact, idx) => (
            <li key={idx}>
              <Contact {...contact} />
            </li>
          ))}
        </ul>
        <button onClick={this.loadMore} className={"btn btn-outline-primary"}>
          Load more
        </button>
      </div>
    );
  }
}

export default ContactList;
