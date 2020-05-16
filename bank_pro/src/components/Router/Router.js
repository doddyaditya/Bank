import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import Login from "../Login/Login"
import Title from "../Title/Title"
import Help from "../Help/Help"
import Transfer from "../Transfer/Transfer"
import TransactionHistory from "../Transaction/TransactionHistory"
import Cookies from "universal-cookie";

const Router = () => {
    if (!new Cookies().get("login")) {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path = "/" render = {() => (<Redirect to = "/Title"/>)}/>
                    <Route exact path = "/Login" component = {Login}/>
                    <Route exact path = "/Help" component = {Help}  />
                    <Route exact path = "/Title" component = {Title}/>
                    <Route exact path = "/Transfer" component = {Login}/>
                    <Route exact path = "/TransactionHistory" component = {Login}/>
                </Switch>
            </BrowserRouter>
        )
    }
    else {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path = "/" render = {() => (<Redirect to = "/Title"/>)}/>
                    <Route exact path = "/Login" component = {Title}/>
                    <Route exact path = "/Help" component = {Help}  />
                    <Route exact path = "/Title" component = {Title}/>
                    <Route exact path = "/Transfer" component = {Transfer}/>
                    <Route exact path = "/TransactionHistory" component = {TransactionHistory}/>
                </Switch>
            </BrowserRouter>
        )
    }   
}

export default Router;