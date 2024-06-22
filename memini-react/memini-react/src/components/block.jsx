import React, { Component } from "react";

import '../index.css';
import {generateHalfHourIntervals} from "../computations/date-computations.js"
import {Divider,Container, Grid} from "semantic-ui-react";
import ActivityBlock from "./activity-block.jsx";

class Block extends Component{
    constructor(props){
        super(props);       
    }
    
    componentDidMount() {
      
    }    

    
  render() { 
    const height  = this.props.height;
    const width   = this.props.width;
    const content = this.props.content;        
        
        return (
          <>   
            {!content && 
            <div className={`bg-red-100 bg-opacity-60 rounded-lg shadow-lg w-56 backdrop-contrast-200 backdrop-blur filter sepia` }
              style={{ height: `${height}px`, position: 'absolute', top: 0 }}
            >
             
            </div>


            }
          </>
        );
    }
}

export default Block;








