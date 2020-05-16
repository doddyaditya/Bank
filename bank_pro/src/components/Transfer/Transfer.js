import React, { Component } from "react";
import NavigationBar from "../NavigationBar/NavigationBar";
import Cookies from "universal-cookie";
import "./Transfer.css";
import Modal from 'react-bootstrap/Modal';

/**
 * Merupakan laman Transfer yang memberikan basa-basi mengenai fitur yang terdapat dalam program ini
 */

class Transfer extends Component {
  constructor() {
    super();
    const cookie = new Cookies();
    if (cookie.get("login") != undefined) {
      this.state.cookieId = cookie.get("login").split(";")[0];
    } else {
      this.state.cookieId = undefined;
    }
    
  }

  state = {
    smShow: false,
    trfStatus: undefined,
    trfMessage: "Error not loaded."
  };

  setSmShow = sm => {
    this.setState({smShow: sm});
  };
  
  handleTrf = async e => {
    // Handles Login
    e.preventDefault();

    // Getting transfer details
    const senderAcc = e.target.elements.sender_acc.value;
    const receiverAcc = e.target.elements.receiver_acc.value;
    const trfAmount = e.target.elements.trf_amount.value;
    
    // Sending request using SOAP to ws-bank
    const request = require("request");
    let xml = 
    `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service/">
        <soapenv:Header/>
        <soapenv:Body>
          <ser:TransferResult>
              <!--Optional:-->
              <arg0>` + senderAcc + `</arg0>
              <!--Optional:-->
              <arg1>` + receiverAcc + `</arg1>
              <!--Optional:-->
              <arg2>` + trfAmount + `</arg2>
          </ser:TransferResult>
        </soapenv:Body>
    </soapenv:Envelope>`;

    // Target wsdl
    var options = {
      url: 'http://localhost:8080/ws-bank/service/Transfer?wsdl',
      method: 'POST',
      body: xml,
      headers: {
        'Content-Type':'text/xml;charset=utf-8',
      }
    };

    // Get the callback from the result
    let callback = (error, response, body) => {
      console.log(body);
      if (!error && response.statusCode === 200) {
        // Get return 
        let result = new DOMParser().parseFromString(body, 'text/xml');
        result = result.getElementsByTagName('return')[0];
        
        this.setState({trfStatus: result.childNodes[0].textContent})

        if (this.state.trfStatus === "2002") {
          this.setState({
            trfMessage: "Transfer Success."
          })
          // window.location.reload();
        }
        else if (this.state.trfStatus === "2000"){
          this.setState({trfMessage: "Failed to update your account's balance."})
        }
        else if (this.state.trfStatus === "2001"){
          this.setState({trfMessage: "Failed to update receiver account's balance."})
        }
        else if (this.state.trfStatus === "4001"){
          this.setState({trfMessage: "Receiver account/virtual number is invalid."})
        }
        else if (this.state.trfStatus === "4002"){
          this.setState({trfMessage: "Insufficient balance."})
        }
        else if (this.state.trfStatus === "4003"){
          this.setState({trfMessage: "Failed to get your account's balance."})
        }
        else if (this.state.trfStatus === "4004"){
          this.setState({trfMessage: "Failed to update your account's data."})
        }
        else if (this.state.trfStatus === "4005"){
          this.setState({trfMessage: "Failed to update receiver account's data."})
        }
        else if (this.state.trfStatus === "4006"){
          this.setState({trfMessage: "Failed to record transaction details."})
        }
        else if (this.state.trfStatus === "4007"){
          this.setState({trfMessage: "Failed to get your account's balance. (2)"})
        }
        else {
          console.log("out");
          this.setState({
            trfStatus: false,
            status: "Transfer Failed."
          });
        }
      }
    };

    request(options, callback);
  };

  render() {
    return (
      <React.Fragment>
        <NavigationBar/>
      <div className="trf-wrapper">
        <div className="trf-margin">
          <div className="trf-title">
            <b>TRANSFER</b>
          </div>
          <div className="trf-text">
          </div>
          <form onSubmit={this.handleTrf}>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="input-sender_acc">
                  Sender Acc No.
                </span>
              </div>
              <input
                type="text"
                name = "sender_acc"
                className="form-control"
                disabled={true}
                value={this.state.cookieId}
                aria-label="Default"
                aria-describedby="input-sender_acc"
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="input-receiver_name">
                  Receiver Acc No.
                </span>
              </div>
              <input
                type="text"
                name = "receiver_acc"
                className="form-control"
                placeholder="Receiver Account/Virtual Number.."
                aria-label="Default"
                aria-describedby="input-receiver_name"
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="input-trf_amount">
                  Amount
                </span>
              </div>
              <input
                type="text"
                name = "trf_amount"
                className="form-control"
                placeholder=""
                aria-label="Default"
                aria-describedby="input-trf_amount"
              />
            </div>
            <div className="button-container">
              <button 
                className="trf-btn btn btn-outline-secondary btn-lg"
                type="submit"
                onClick={() => this.setSmShow(true)}
              >
                Confirm
              </button>
            </div>
          </form>

          <Modal
            size="sm"
            show={this.state.smShow}
            onHide={() => this.setSmShow(false)}
            aria-labelledby="example-modal-sizes-title-sm"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-sm">
                Transfer Status
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>{this.state.trfMessage}</Modal.Body>
          </Modal>
          {/* <TransferForm onTrf={this.handleTrf} trfst={this.state.trfMessage} senderNo={this.state.cookieId} /> */}
        </div>
      </div>
    
    </React.Fragment>
    );
  }
}

export default Transfer;
