import React, { Component } from "react";

class HorizontalScheduleMarker extends Component{
    constructor(props) {
        super(props);       


        this.state = {
            shouldRender : false,
            positionY : 0
          };

    }

    componentDidMount() {
      
    }

    isRendering = () => {
      return this.state.shouldRender;
    }

    updatePosition = (positionY) => {
      this.setState(previousState => {
        return {...previousState, positionY:positionY }
        });
    }

    setRenderMode = (value) => {
      if(this.state.shouldRender != value) {
        this.setState(previousState => {
        return {...previousState, shouldRender:value }
        });
      }
    }   

    render() { 

          return (
            <>
            {this.state.shouldRender && (
            <div 
            className="horizontal-schedule-marker-line" 
            style={{ top: `${this.state.positionY}px`, zIndex: 1000 }}
            />
            )}
            </>
          );
    }
  }

export default HorizontalScheduleMarker;








