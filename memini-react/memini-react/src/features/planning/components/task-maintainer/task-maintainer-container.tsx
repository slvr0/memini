
import React, {  } from 'react';

import TaskMaintainerRecentFavorites from './task-maintainer-recent-favorites';
import ActivityEditHeader from "./activity-edit-header";

interface TaskMaintainerContainerProps {

}

const TaskMaintainerContainer: React.FC<TaskMaintainerContainerProps> = (props) => {
    return (
    <div className="">
      {/* Header Section with Create Task Button */}
      <div className="p-4 border-b border-gray-200 bg-white h-2/4">
        <ActivityEditHeader/>
      </div>

      {/* Accordions Section - Takes remaining height */}
      <div className="flex-1 overflow-y-auto h-2/4">
        {/* Favorites Accordion */}        
        <TaskMaintainerRecentFavorites/>
      </div>
    </div>
  );
}

export default TaskMaintainerContainer;