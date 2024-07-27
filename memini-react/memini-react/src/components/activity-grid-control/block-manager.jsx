import React, { Grid, Fragment, Component, createRef } from "react";

import Block from "./block";

import { Icon, Label } from 'semantic-ui-react';

import "./activity-grid-control.css";

const exampleBlocks = [
    {
        title : 'Tennis', 
        activityType : 'sport', 
        description : 'Play tennis on clay with Oliver 1h',
        startTime : 600,
        endTime : 660
    },
    {
        title : 'Do Laundry',
        activityType : 'chore',
        description : 'Take care of the laundry, wash your dirty jeans 3h',
        startTime : 780,
        endTime: 960
    },
    {
        title : 'Watch Avengers',
        activityType : 'fun',
        description : 'Its supposed to be a great movie, i know you dont enjoy superhero movies in general but give it a shot! 2h',
        startTime : 1260,
        endTime: 1380
    }
  ];

class BlockManager extends Component{
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
            <div className="eight wide column">
                {exampleBlocks.map((activity, index) => (
                <Fragment key={index}>
                    <Block content={activity} sizeY={activity.endTime - activity.startTime} />
                </Fragment>
                ))}

            </div>                     
         
        </>       
        );
    }
}

export default BlockManager;








