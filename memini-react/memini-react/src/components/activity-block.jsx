import React, { Component } from "react";
import '../index.css';
import {generateHalfHourIntervals} from "../computations/date-computations.js"
import {Divider,Container, Grid} from "semantic-ui-react";

class ActivityBlock extends Component{
    constructor(props){
        super(props);       


        this.state = {
            something : ""
          };
        
    }
    
    componentDidMount() {
      
    }
    
  render() { 

      const { title, description, startTime, endTime, height  } = this.props;

        return (
          <> 
            <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden w-48 p-4" style={{ height }}>
              <div className="bg-blue-500 text-white text-center py-2">
                <h2 className="text-xl font-bold">{title}</h2>
                  </div>
                    <div className="p-4">
                      <p className="text-gray-700 text-sm mb-4">{description}</p>

                      <div className="flex justify-between text-gray-600 text-sm">
                      <div>

                      <span className="font-semibold">Start:</span> {startTime}
                      </div>

                      <div>
                      <span className="font-semibold">End:</span> {endTime}
                    </div>
                </div>
              </div>
            </div>            
          </>
        );
    }
}

export default ActivityBlock;








