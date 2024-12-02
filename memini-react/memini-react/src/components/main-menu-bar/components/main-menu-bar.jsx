import React, { Component } from "react";
import { Menu, Image } from "semantic-ui-react";
import logo from "../../../assets/images/memini_logo_f4.png";

import {connect} from 'react-redux';


class MainMenuBar extends Component{
    constructor(props){
        super(props); 

        //Could be context, or not
        this.availableTabs  = props.availableTabs;
        this.onChangeTab    = props.onChangeTab;             
    }

    componentDidMount() {       
      
    }

    render() {  
        
        const style = {
            height: '80%',
            width: '80%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: 'auto' 
          };
        
        return (
            <>  
            <div className="ui vertical menu gridBlock main-nav-bar" style={style}>
            {/* Logo Section */}
            <div className="menu-item">
            <img src={logo}  style={{ width: '90%', height: '90%' }} />
            </div>

            <div className="spacer" style={{ height: '50px' }}></div> {/* Slight spacing */}


            {/* Menu Segments */}
            <div className="menu-item">
                 {/* <i className="large calendar alternate icon"></i> */}
                <span style={{fontSize:14, marginLeft: '5px'}} onClick={() => {this.onChangeTab(this.availableTabs.Planning)}}> Planning</span>
            </div>

            <div className="spacer" style={{ height: '10px' }}></div> {/* Slight spacing */}


            <div className="menu-item" style={{  alignItems: 'center'}}>
                <span style={{fontSize:14, marginLeft: '5px'}} onClick={() => {this.onChangeTab(this.availableTabs.Events)}}> Events</span>       
            </div> 


            <div className="spacer" style={{ height: '10px' }}></div> {/* Slight spacing */}


            <div className="menu-item">
            <i className="large settings icon"></i> {/* Assuming you have a settings icon */}            
            </div>

            <div className="spacer" style={{ height: '50px' }}></div> {/* Slight spacing */}

            <div className="menu-item" style={{ marginTop: 'auto', alignItems: 'center' }} onClick={() => {this.onChangeTab(this.availableTabs.User)}}>User</div>

            {/* Icon and text are not vertically aligned */}
            <div className="menu-item sign-out-item bg-red-100" style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', padding: '10px', width: '100%', borderRadius: '0 0 30px 30px' }}>
                <i className="sign-out icon" style={{ marginRight: '0.5rem', verticalAlign: 'middle' }}></i>
                <span style={{ fontSize: 12, lineHeight: '1.5' }}>Sign out</span>
            </div>
            </div>
            </>       
        );
    }
}

const mapStateToProps = (state) => {
    return {
        counter : state.counter
    };
}
//have to bind this to these stuff?
const mapDispatchToProps = (dispatch) => {
    return {
        increment: () => {dispatch({type:'increment'})}
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MainMenuBar);








