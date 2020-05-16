import React, {Component} from "react";
import Cookies from "universal-cookie";
import {Link} from "react-router-dom";

/**
 * Merupakan laman NavigationBar yang merupakan interface untuk perpindahan antar laman
 */
class NavigationBar extends Component {
  state = {
    loggedIn : false,
    cookie: undefined
  }

  constructor() {
    super();  
    const cookie = new Cookies();
    this.state.cookie = cookie.get("login");
    if (this.state.cookie) {
      this.state.loggedIn = true
    }
  }

  handleLogout() {
    const cookie = new Cookies();
    cookie.remove("login");
    window.location.reload();
  }

  cookieNameGetter() {
    if (this.state.cookie == undefined) {
      return "";
    }
    return this.state.cookie.split(";")[1];
  }

  render() {
    return (
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <button className="btn btn-default">
          <Link to = "/Title">
            <h4>
              <font color="white">Bank Pro</font>
            </h4>
          </Link>
        </button>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <Link to = "/Help">
                <button
                  className="btn btn-default">
                  <font color="white">Help</font>
                </button>
              </Link>
            </li>
            <li className="nav-item">
            {
              this.state.loggedIn
              ? 
              <Link to = "/Transfer">
                <button
                  className={"btn btn-default"}
                  disabled={false}
                  tabIndex="-1"
                  aria-disabled="true"
                >
                  <font color="white">Transfer</font>
                </button>
              </Link>
              :
              <button
                className={"btn btn-default disabled"}
                disabled={true}
                tabIndex="-1"
                aria-disabled="true"
              >
                <font color="white">Transfer</font>
              </button>
            }
            </li>
            <li className="nav-item">
            {
              this.state.loggedIn
              ? 
              <Link to = "/TransactionHistory">
                <button
                  className={"btn btn-default"}
                  disabled={false}
                  tabIndex="-1"
                  aria-disabled="true"
                >
                  <font color="white">Transaction History</font>
                </button>
              </Link>
              :
              <button
                className={"btn btn-default disabled"}
                disabled={true}
                tabIndex="-1"
                aria-disabled="true"
              >
                <font color="white">Transaction History</font>
              </button>
            }
            </li>
          </ul>
         
          {!this.state.loggedIn && (
            <ul className="nav navbar-nav navbar-right mt-2 mt-lg-0">
              <li className="nav-item">
                <Link to = "/Login">
                  <button
                    className="btn btn-default"
                  >
                    <font color="white">Login</font>
                  </button>
                </Link>
              </li>
            </ul>
          )}
          {this.state.loggedIn && (
            <ul className="nav navbar-nav navbar-right mt-2 mt-lg-0">
            <li className="nav-item">
              <label className = "btn btn-default">
                <font color = "white">
                  Hello, <b>{this.cookieNameGetter()}</b>
                </font>
              </label>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-default"
                onClick={() => {this.handleLogout()}}
              >
                <font color="white">Logout</font>
              </button>
            </li>
            </ul>
          )}
        </div>
      </nav>
    );
  }
}

export default NavigationBar;
