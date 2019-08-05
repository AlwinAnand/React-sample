import React, { Component, Fragment } from 'react';
import Loadable from 'react-loadable';
import { Router, Route, Switch } from 'react-router';
// import PrivateRoute from './common/components/PrivateRouter/PrivateRouter';
import { LODING } from './src/common/constants';
import history from './history';

const LandingPage = Loadable({ loader: () => import('./src/components/LandingPage/LandingPage'), loading: () => <div>{LODING}</div> });

export class App extends Component {
    render() {
    return (
        <Router history={history}>
            <Fragment>
                <Switch>
                    <Route path="/" exact component={LandingPage} />
                </Switch>
            </Fragment>
        </Router>
    );
    }
}

export default App;
