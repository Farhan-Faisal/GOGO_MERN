import React from 'react';

const MetaAuth = (props) => {
    return(
        <a href="/auth/facebook" className="btn btn-warning">
            <span className="fa fa-facebook"> Sign Up with Facebook </span> 
        </a>
    );
};

export default MetaAuth;

/*
    1. Create a Meta Developers account
    2. Create an app
        - App Name: GoGo_CSCC01
        - App ID: 2476625629164245
        - App secret: 
    3. npm install query-string 
    4. npm install passport-facebook
 */


