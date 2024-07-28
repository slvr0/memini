import React, { Component } from 'react';
import { ScheduleGridContext } from './schedule-grid-context.jsx';

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
              activityType : 'sport', 
              description : 'Play tennis on clay with Oliver 1h',
              startTime : 600,
              endTime : 660,
              attached : false
          },
          {
              title : 'Do Laundry',
              activityType : 'chore',
              description : 'Take care of the laundry, wash your dirty jeans 3h',
              startTime : 780,
              endTime: 960,
              attached : false
          },
          {
              title : 'Watch Avengers',
              activityType : 'fun',
              description : 'Its supposed to be a great movie, i know you dont enjoy superhero movies in general but give it a shot! 2h',
              startTime : 1260,
              endTime: 1380,
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