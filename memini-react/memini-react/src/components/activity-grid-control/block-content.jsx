import React, { Grid,Component, createRef } from "react";

import { Icon, Label } from 'semantic-ui-react';

import "./activity-grid-control.css";

class BlockContent extends Component{
    constructor(props){
        super(props); 
        this.state = {
            
        }   
    }
    
    componentDidMount() {
      
    }

    render() { 
        return (
        <> 
            <span className="mt-1 mb-1">

                <i className="user secret icon"></i>
                <b className="truncate whitespace-nowrap blockContentDescription">
                {this.props.children.title}
                </b>
                

            </span>
            
            <h5 className="ml-1 mt-2 mb-1 italic font-extralight m-0 text-xs blockContentDescription">
            {this.props.children.description}
            </h5>           
         
        </>       
        );
    }
}

export default BlockContent;








