import React, { Component } from 'react';
import { ScheduleGridContext } from './schedule-grid-context.jsx';


//remove
class ScheduleGridContextProvider extends Component {

  constructor(props) {
    super(props);

    const emptyGridSlots = 12;
    const emptyGridBlocks = [];
    for(var i = 0 ; i < emptyGridSlots ; ++i) 
      emptyGridBlocks.push(i);
    
    this.state = {
        items: ['hello', 'world', 'from', 'context'],
        exampleActivityBlocks : [
          {
              title : 'Tennis', 
              type : 'sport', 
              description : 'Play tennis on clay with Oliver 1h',
              startTime : 300,
              endTime : 360,
              attached : false
          },
          {
              title : 'Do Laundry',
              type : 'chore',
              description : 'Take care of the laundry, wash your dirty jeans 3h',
              startTime : 400,
              endTime: 580,
              attached : false
          },
          {
              title : 'Watch Avengers',
              type : 'fun',
              description : 'Its supposed to be a great movie, i know you dont enjoy superhero movies in general but give it a shot! 2h',
              startTime : 600,
              endTime: 720,
              attached : false
          }
        ],
        emptyGridBlocks : emptyGridBlocks
      };
  }

  

  render() {
    return (
      <ScheduleGridContext.Provider value={this.state}>
        {this.props.children}
      </ScheduleGridContext.Provider>
    );
  }
}

export default ScheduleGridContextProvider;