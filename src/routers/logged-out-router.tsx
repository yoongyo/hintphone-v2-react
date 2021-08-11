import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'
import Login from '../pages/admin/login';
import LoginM from '../pages/customer/m_login';
import { NotFound } from '../pages/404';
import { Main } from '../pages/main';



export const LoggedOutRouter = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact>
                    <Main/>
                </Route>
                <Route path="/m" exact>
                    <LoginM/>
                </Route>
                <Route path="/m/logout">
                    <Redirect to="/m"/>
                </Route>
                <Route>
                    <NotFound/>
                </Route>
            </Switch>
        </Router>
    )
}