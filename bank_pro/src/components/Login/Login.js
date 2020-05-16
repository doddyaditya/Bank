import React, { Component } from "react";
import NavigationBar from "../NavigationBar/NavigationBar";
import Cookies from "universal-cookie";
import "./Login.css";

/**
 * Merupakan laman yang menangani proses login
 */
class Login extends Component {
    state = {
        loginFail: false,
        status: ''
    }
    
    /**
     * Melakukan HTTP POST ke API yang disediakan untuk menentukan
     * apakah nama dan password tersebut sudah terdaftar dan user
     * layak login. Jika ya, berikan user token, jika tidak, berikan pesan error
     */
    async handleLogin(e) {
        // Handles Login
        e.preventDefault();

        // Getting account number
        const account = e.target.elements.username.value;
        
        // Sending request using SOAP to ws-bank
        const request = require("request");
        let xml = 
        `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service/">
                <soapenv:Header/>
                <soapenv:Body>
                    <ser:AccountLogin>
                            <arg0>` + account + `</arg0>
                    </ser:AccountLogin>
                </soapenv:Body>
        </soapenv:Envelope>>`;

        // Target wsdl
        var options = {
            url: 'http://localhost:8080/ws-bank/service/Login?wsdl',
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
                
                const status = result.childNodes[0].textContent;
                if (status === "200") {
                    const cookie = new Cookies();
                    const id = result.childNodes[1].textContent;
                    const name = result.childNodes[2].textContent;
                    cookie.set("login", (id + ";" + name), {path: "/", expires: new Date(Date.now()+1800000)});
                    window.location.reload();
                }
                else {
                    console.log("out");
                    this.setState({
                        loginFail: true,
                        status: "Account does not exist in database"
                    });
                }
            }
        };

        request(options, callback);
    }

    render() {
        return (
            <React.Fragment>
                <NavigationBar/>
                <div className="row">
                    <div className="login-title-wrapper">
                        <div className="login-title-text-wrapper">
                            <h1>
                                <font color="white">Log into your account Here!</font>
                            </h1>
                            <h3>
                                <font color="white">Enter your username and password!</font>
                            </h3>
                        </div>
                    </div>
                    <div className="login-form-wrapper">
                        <div className="login-form-text-wrapper">
                            <form onSubmit={this.handleLogin}>
                                <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroup-sizing-default">
                                    Account
                                    </span>
                                </div>
                                <input
                                    type="text"
                                    name = "username"
                                    className="form-control"
                                    placeholder="Acc. Number..."
                                    aria-label="Default"
                                    aria-describedby="inputGroup-sizing-default"
                                />
                                </div>
                                <button className="btn btn-outline-secondary btn-lg" type = "submit">Login!</button>
                            </form>
                            {this.state.loginFail && <p>---------------</p>}
                            {this.state.loginFail && <p>Login Failed...</p>}
                            {this.state.loginFail && <p>{this.state.status}</p>}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Login;
