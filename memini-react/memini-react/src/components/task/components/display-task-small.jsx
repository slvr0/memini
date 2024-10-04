import React, { Component } from "react";
import { TaskContext } from "../store/task-context";
import "../css/task.css";


class DisplayTaskSmall extends Component {
    static contextType = TaskContext;

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
              Small
        </>       
        );
    }
}

export default DisplayTaskSmall;