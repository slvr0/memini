import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { setupClockMarkers } from "../computes/schedule-grid-computations";
import { useTaskManager } from "../../tasks/utils/task-manager";
import { RootState } from "../../../store/index";
import type { Task } from "../../tasks/interfaces/task-types";
import Block  from "../../tasks/components/block";

// Constants
const HOURS_PER_SCHEDULE_GRID = 24;
const GRID_SIZE_Y = 1200;
const scheduleTimestamps = setupClockMarkers(HOURS_PER_SCHEDULE_GRID, false);

const ScheduleGrid: React.FC = () => {  
  const { fetchTasksForDateAndStore, useTasksForDate, areDisplayTasksLoaded, setSelectedTask } = useTaskManager();
  const selectedDate = useSelector((state : RootState) => state.calendarDate.selectedDate);
  const displayTasks = useTasksForDate(selectedDate.year, selectedDate.month, selectedDate.day);

  useEffect(() => {
    if (!areDisplayTasksLoaded(selectedDate.year, selectedDate.month, selectedDate.day)) {
      fetchTasksForDateAndStore(selectedDate.year, selectedDate.month, selectedDate.day);
    }
  }, [selectedDate, areDisplayTasksLoaded]);

  const onClickTask = (task: Task) => setSelectedTask(task);

  return (
    <div className="calendar-container">
      <div className="fourteen wide column schedule-task-grid scrollable-div">
        <div
          className={`h-[${GRID_SIZE_Y}px]`}
          style={{ display: "flex" }}
        >
          {/* Time Marker Column */}
          <div
            style={{ width: "64px", display: "flex", flexDirection: "column" }}
          >
            {scheduleTimestamps.map((marker, markerIndex) => (
              <Fragment key={markerIndex}>
                <div className="h-[25px]" style={{ marginLeft: "15px" }}>
                  <p
                    className={
                      markerIndex % 2 === 0
                        ? "schedule-grid-timemark-whole"
                        : "schedule-grid-timemark-half"
                    }
                  >
                    {marker}
                  </p>
                </div>
              </Fragment>
            ))}
          </div>

          {/* Schedule Task Grid */}
          <div
            style={{ flexGrow: 1, minHeight: "150px" }}
          >
            {displayTasks.length === 0 && (
              <div style={{ textAlign: "center", color: "gray" }}></div>
            )}
            {displayTasks.map((task, taskIndex) => (
              <Fragment key={taskIndex}>
                <Block
                  draggable
                  content={task}
                  className="attached-task"
                  applyActivityTypeBackground={false}
                  onClick={() => onClickTask(task)}
                />
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleGrid;
