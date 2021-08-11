import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import ThemeList from '../pages/admin/theme_list';
import { ThemeEdit } from '../pages/admin/theme_edit';
import { ThemeDetailM } from '../pages/customer/m_theme_detail';
import ThemeListM from '../pages/customer/m_theme_list';
import { EnterKey } from '../pages/customer/m_enterKey';
import { Reset } from '../pages/customer/m_reset';
import { Hint } from '../pages/customer/m_hint';
import { NotHintCount } from '../pages/customer/m_notHintCount';
import { Main } from '../pages/main';

export const LoggedInRouter = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact>
                    <Main/>
                </Route>
                <Route path="/m/theme-list" component={ThemeListM}/>
                <Route path="/m/theme-detail" component={ThemeDetailM}/>
                <Route path="/m/enter" component={EnterKey}/>
                <Route path="/m/reset" component={Reset}/>
                <Route path="/m/hint" component={Hint}/>
                <Route path="/m/not-hint-count" component={NotHintCount}/>
                <Route path="/m" exact >
                    <Redirect to="/m/theme-list"/>
                </Route>
            </Switch>
        </Router>
    )
}