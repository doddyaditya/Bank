import React from "react";
import NavigationBar from "../NavigationBar/NavigationBar";
import "./Help.css";

/**
 * Merupakan laman Help yang memberikan basa-basi mengenai fitur yang terdapat dalam program ini
 */
const Help = () => {
    return (
        <React.Fragment>
            <NavigationBar/>
            <div className="help-wrapper">
                <div className="help-margin">
                    <div className="help-title">
                        <b>HELP</b>
                    </div>
                    <div className="help-text">
                        <p>
                            <b>LOGIN</b>
                        </p>
                        <p>
                            Just login the normal login. Enter your account number and then 
                            you will be logged into your own account number. You can check 
                            your transaction history or perform a transfer later on.
                        </p>
                        <p>
                            <b>TRANSFER</b>
                        </p>
                        <p>
                            Transfers part of your balance to other accounts. This feature is 
                            also the only gateway for Engima Movie payment (since we are this 
                            great at monopoly). 
                        </p>
                        <p>
                            <b>TRANSACTION HISTORY</b>
                        </p>
                        <p>
                            Views your transaction history. Shows the transaction that has been 
                            performed in the form of a table.
                        </p>
                        <p>
                            <b>LOGOUT</b>
                        </p>
                        <p>
                            Logs out of your account. Does not help much tho... Just returns you 
                            towards the main menu and waits for you to perform login again...
                        </p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Help;
