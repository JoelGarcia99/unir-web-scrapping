import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import ForumScreen from '../modules/forum/ForumScreen'
import { LoginScreen } from '../modules/login/LoginScreen'

export const RouterComponent = () => {
    return <BrowserRouter>
        <Switch>
            <Route exact path="/" component={LoginScreen} />
            <Route exact path="/login" component={LoginScreen} />
            <Route exact path="/home" component={ForumScreen} />
        </Switch>
    </BrowserRouter>
}
