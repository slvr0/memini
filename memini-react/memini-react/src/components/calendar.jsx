import React, { Component } from "react";

import '../index.css';

class Calendar extends Component{
    constructor(props){
        super(props);  
        
        this.API_URL = "http://localhost:5000/";
        this.state = {
          something: ""
        };  
        
        // just sketching
        this.width = 200;
        this.height = 200;
        this.nrOfWeeksDisplayed = 5;
        this.startingWeek = 0;
        this.endingWeek = 5;
        this.currentWeek = 2;

       

    }

    initializedRenderDate = () => {
      var currentDate = new Date(); 
      const abc = 123;
      
    }
    
 
    componentDidMount() {
      
    }

  


  render() { 

        return (
          <div className="bg-gray-100 flex justify-center items-center min-h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Styled Div with Tailwind CSS</h2>
                <p className="text-gray-600">This div has fresh borders and edges thanks to Tailwind CSS!</p>
            </div>
          </div>
        );
    }
}

export default Calendar;








