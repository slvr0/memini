import React, { Component } from 'react';
import { ScheduleGridContext } from './schedule-grid-context.jsx';

class ScheduleGridContextProvider extends Component {
  state = {
    items: ['hello', 'world', 'from', 'context'],
  };

  render() {
    return (
      <ScheduleGridContext.Provider value={this.state}>
        {this.props.children}
      </ScheduleGridContext.Provider>
    );
  }
}

export default ScheduleGridContextProvider;