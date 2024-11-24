import React, { Component } from "react";
import { Input } from 'semantic-ui-react'

class UserMainPage extends Component{
    constructor(props){
        super(props); 

    }  

    render() { 

        return (
            <> 
           
           
                <div className="ui row titleRow">
                    <div className="four wide column">
                       
                    </div>

                    <div className="four wide column">
                        
                    </div>

                    <div className="four wide column">
                    <div>

                    </div>
                    </div>

                    <div className="four wide column">
                        <div>

                        </div>
                    </div>                  

                </div>

                <div className="ui row">
                    <div className="four wide column">
                        
                    </div>
                    <div className="eight wide column">
                        <div className="ui icon input login-name-input">
                            <input
                                type="text"                                                   
                                placeholder="Your name..."
                            />                        
                        </div>
                    </div>
                    <div className="four wide column">
                        
                    </div>
                </div>

                <div className="ui row">
                    <div className="four wide column">
                        
                    </div>
                    <div className="eight wide column">
                        <div className="ui icon input login-name-input">
                            <input
                                type="text"                                                   
                                placeholder="Your Email..."
                            />                        
                        </div>
                    </div>
                    <div className="four wide column">
                        
                    </div>
                </div>

                <div className="ui row">
                    <div className="four wide column">
                        
                    </div>
                    <div className="four wide column">                      
                        
                        <div className="ui button big basic user-main-login-button">
                            Login                       
                        </div>

                        <div className="ui button big basic user-main-login-button">
                            I am god                       
                        </div>
                      
                    </div>
                    <div className="four wide column">
                        <div className="ui button small default user-main-create-account-button">
                                Create Account                       
                        </div>
                    </div>


                    <div className="four wide column">
                        
                    </div>
                </div>

                <div className="ui row">
                    <div className="four wide column">                        
                        
                    </div>

                    <div className="eight wide column">
                        <div className="ui divider"></div>
                    </div>

                    <div className="four wide column">
                        
                    </div>                    
                </div>

                <div className="ui row">
                    <div className="four wide column">                        
                        
                    </div>

                    <div className="eight wide column">
                        <i className="user-main-forgot-password">Forgot password?</i>
                    </div>

                    <div className="four wide column">
                        
                    </div>                    
                </div>

          
            </>       
        );
    }
}

export default UserMainPage;








