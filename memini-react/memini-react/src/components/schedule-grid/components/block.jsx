import React, { Component, createRef, Fragment } from "react";
import BlockContent from "./block-content.jsx";

import Task from "../../task/components/task.jsx";
import { Grid, Icon, Container } from "semantic-ui-react";
//more like a computational wrapper to a Task, controlling position size and connecting drag/drop events
class Block extends Component{
    constructor(props){
        super(props); 

        this.blockRef = createRef(null);

        //these are for the Task size computation
        this.state = {
            dimensions : {width : 0 , height: 0}
        };

        this.taskTypeBackgroundColors = {
            'sport' : ' display-activity-background-sport',
            'chore' : ' display-activity-background-chore',
            'fun'   : ' display-activity-background-fun'
        };

        
        this.height     = this.props.staticHeight;
        this.width      = this.props.staticWidth;
        this.style      = {};
        this.yPosition  = 0;
        this.className  = this.props.className;        
        
    }
    
    // do we really need to updateDimension on load? seems not isnt it just duration height we need to adjust task size for
    componentDidMount() {       
        //this.updateDimensions();
    }

    setBlockContent() {

    }

    updateDimensions() {
        const { clientWidth, clientHeight } = this.blockRef.current;
        this.setState( {dimensions : { width: clientWidth, height: clientHeight}} );
    } 
    
    //block decoration depends on tasktype
    peekTaskTypeBackground = () => {       
        return this.taskTypeBackgroundColors[this.props.content.type];
    }

    configureAttachedTaskBlock = () => {
        const hourPixel = 50;
        this.height     = hourPixel * (this.props.content.endTime - this.props.content.startTime) / 60;

        this.yPosition  = hourPixel * this.props.content.startTime / 60;     
        this.className += ` attached-task`;
    }

    configureFreeTaskBlock = () => {

    }

    render() { 
        if(this.props.content.attached) 
            this.configureAttachedTaskBlock();         

        if(this.props.applyActivityTypeBackground)
            this.className += this.peekTaskTypeBackground();
            
        this.style = {
            height: `${this.height}px`,        
            width:  `${this.width}px`,
            top:    `${this.yPosition}px`,
        }   
        
        return (
            <>  
                <div 
                    draggable 
                    ref={this.blockRef}
                    className={`${this.className}`}
                    onDragStart={(event) => this.props.onDrag(this)}
                    style={this.style}>
                        {this.props.content ? (
                            <Task                                 
                                height={this.height}
                                content={this.props.content}  
                            >
                            </Task>           
                        ) : (
                        <Fragment>                
                            <p>No content available</p>
                        </Fragment>
                        )}
                </div>
        
            </>       
        );
    }
}

export default Block;








