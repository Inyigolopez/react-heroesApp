import React from 'react';
import {
    BrowserRouter as Router,
    Switch
} from "react-router-dom";

import { LoginScreen } from '../components/login/LoginScreen';
import { DashboardRoutes } from './DashboardRoutes';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';

export const AppRouter = () => {
    
    const { user } = useContext(AuthContext);
    
    return (
        <Router>
            <div>
                {/* A <Switch> looks through its children <Route>s and
                    renders the first one that matches the current URL. */}
                <Switch>
                    <PublicRoute  
                        exact path="/login" 
                        isAuthenticated={ user.logged }
                        component={ LoginScreen } />

                    <PrivateRoute 
                        path="/"  
                        isAuthenticated={ user.logged } 
                        component={ DashboardRoutes } />
                    {/* <Route  path="/" component={ DashboardRoutes } /> */}
                </Switch>
            </div>
        </Router>
        
    )
}
