import React, { Component, Fragment, createRef } from "react";

import BlockManager from "./block-manager.jsx";
import Block from "./block";

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

class DayScheduleGrid extends Component{
    constructor(props){
        super(props); 
        this.state = {           
            tasks : []
        }  
        
        this.clockMarkers = [];
        this.setupClockMarkers();
    
        this.scheduleGridRef = createRef(null);
        this.selectedItem = null;  
        this.dragOverCurrentTimeBox = -1;
        
    } 

    setupClockMarkers = () => {
        this.clockMarkers = [];
        for(let i = 0 ; i < 12 ; ++i) {
            this.clockMarkers.push(this.convertClockMarkers(i));
            this.clockMarkers.push('30');                
        }
    }

    convertClockMarkers = (time) => {
        if(time < 10) {
            return '0' + time.toString() + '.00';
        }
        else 
            return time.toString() + '.00';
    }
                                                         
    componentDidMount() {
           
    }

    onDragStart = (event, item) => { 
        this.selectedItem = item;
        
    }; 

    onDrag = (item) => {
        this.selectedItem = item;        
    }

    onDrop = (event) => {
        if(this.selectedItem            === (null && undefined) || 
           this.dragOverCurrentTimeBox  === (null && undefined && -1))
                return;

        const selectedObject = {
            ...this.selectedItem.props.content,
            timeIndex : this.dragOverCurrentTimeBox
        };

        this.setState(previousState => {
            const updatedTasks = [...previousState.tasks, selectedObject];
            updatedTasks.sort((a, b) => a.timeIndex - b.timeIndex);
            return { tasks: updatedTasks };
        });

        this.resetSelection();
    }

    resetSelection = () => {
        this.selectedItem = null;
        this.dragOverCurrentTimeBox = -1;
    }

    onDragOver = (event, blockIndex) => {
        event.preventDefault();

        if(blockIndex === this.dragOverCurrentTimeBox)
            return;
        
        this.dragOverCurrentTimeBox = blockIndex;
    }

    onDragLeave = (event) => {
        if (!this.scheduleGridRef.current.contains(event.relatedTarget)) {
            this.dragOverCurrentTimeBox = -1;
        }
    }

    render() { 
        
        //derp
        var gridBlocks = []
        for(var i = 0 ; i < 12 ; ++i) {
            gridBlocks.push(i);
        }
            //key indexing is entirely broken in this component appareantly...
        return (
        <>
            <div className="ui grid h-screen flex-row">
                <div className="eight wide column">
                        {exampleBlocks.map((activity, index) => (
                        <Fragment>
                            <Block key={index} draggable onDrag={(item) => {this.onDrag(item)}} content={activity} sizeY={activity.endTime - activity.startTime} onDragStart={(event) => this.onDragStart(event, activity)}/>
                        </Fragment>
                        ))}
                </div> 

                <div className="eight wide column">
                    <div className={`h-screen flex-row inline-flex w-96 activityGrid`}>
                                <span className="w-32 activityGrid">
                                    {
                                        this.clockMarkers.map((marker, index) => {
                                            return (
                                            
                                                    <div className="text-xs text-center italic" style={{ height: 'calc(100% / 24)' }}>
                                                        <a key={index} className={index % 2 === 0 ? "antialiased" : "text-xs"}>{marker}</a>
                                                    </div>
                                        
                                            
                                            );
                                        })
                                    }        
                                </span>
                                
                                <div ref={ this.scheduleGridRef } className={`w-64` } 
                                    onDragLeave ={(event) => {this.onDragLeave(event)}}                        
                                    onDrop={(event) => this.onDrop(event)}
                                    >

                                    { gridBlocks.map((blockIndex, index) => {
                                        const newIndex = blockIndex + index;

                                            return (
                                                <Fragment >
                                                    <div key={newIndex} className="ui row gridBLock" style={{ height: 'calc(100% / 12)' }}
                                                        onDragOver={(event) => {this.onDragOver(event, blockIndex)}}
                                                    >
                                                        
                                                        block {blockIndex}
                                                    </div>
                                                </Fragment>
                                            );
                                        })
                                    }

                                </div>  

                            <div ref={ this.scheduleGridRef } className={`w-64` } 
                            >
                                {/* { gridBlocks.map((blockIndex, _) => {

                                        return (
                                            <div key={blockIndex} className="ui row gridBLock" style={{ height: 'calc(100% / 12)' }}
                                                onDragOver={(event) => {this.onDragOver(event, blockIndex)}}                                        
                                            >
                                                block {blockIndex}
                                            </div>
                                        );
                                    })
                                } */}

                                {
                                    this.state.tasks.map((task, index) => {
                                        return (
                                            <>
                                                <Fragment key={index}>
                                                    <Block                                                 
                                                        content={task} sizeY={task.endTime - task.startTime}                                                 
                                                    />
                                                </Fragment>
                                            </>

                                        );
                                    })
                                }

                            </div>  
                    </div>
                </div>
            </div>


            

            
            
            
        </>       
        );
    }
}

export default DayScheduleGrid;








