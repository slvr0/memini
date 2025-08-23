import { Card, CardContent } from "@mui/material";
import {
  Work,
  School,
  FitnessCenter,
  Restaurant,
  MeetingRoom,
  Code,
  LocalHospital,
  FlightTakeoff,
  Event,
} from "@mui/icons-material";
import { minutesToHHMM } from "../../tasks/computes/time-display-formatting";
import type { Task } from "../../tasks/interfaces/task-types";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/index";
import { useTaskManager } from "../../tasks/utils/task-manager";
import { useEffect } from "react";

import "../css/task-tracking-timeline.css";

const icons = [
  Work,
  School,
  FitnessCenter,
  Restaurant,
  MeetingRoom,
  Code,
  LocalHospital,
  FlightTakeoff,
  Event,
];

const TrackingTasksTab = () => {
  const { fetchTasksForDateAndStore, useTasksForDate, areDisplayTasksLoaded } =
    useTaskManager();

  const trackingDate = useSelector(
    (state: RootState) => state.calendarDate.selectedDate
  );

  useEffect(() => {
    if (
      !areDisplayTasksLoaded(
        trackingDate.year,
        trackingDate.month,
        trackingDate.day
      )
    ) {
      fetchTasksForDateAndStore(
        trackingDate.year,
        trackingDate.month,
        trackingDate.day
      );
    }
  }, [trackingDate, areDisplayTasksLoaded]);

  const displayTasks = useTasksForDate(
    trackingDate.year,
    trackingDate.month,
    trackingDate.day
  );

  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const nextTaskId = displayTasks.find(
    (t: Task) => t.StartTime > currentMinutes
  )?.UserTaskKey;

  const firstMinute = displayTasks[0]?.StartTime ?? 0;
  const lastMinute = displayTasks[displayTasks.length - 1]?.EndTime ?? 24 * 60;
  const currentPct =
    ((currentMinutes - firstMinute) / (lastMinute - firstMinute)) * 100;

  return (
    <div className="timeline-container">
      {/* Spine */}
      <div className="timeline-line" />

      {/* Tasks */}
      <div className="timeline-tasks">
        {displayTasks.map((task, index) => {
          const Icon = icons[task.UserTaskKey % icons.length];
          const isLeft = index % 2 === 0;

          return (
            <div key={task.UserTaskKey} className="timeline-row">
              {/* Task cards */}
              {isLeft ? (
                <div className="flex justify-end pr-6">
                  <Card
                    className={`timeline-card ${
                      task.UserTaskKey === nextTaskId
                        ? "timeline-card-active"
                        : ""
                    }`}
                  >
                    <CardContent>
                      <h3 className="text-lg font-semibold">{task.Title}</h3>
                      {task.Description && (
                        <p className="text-sm text-gray-700">
                          {task.Description}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 mt-2">
                        {minutesToHHMM(task.StartTime)} →{" "}
                        {minutesToHHMM(task.EndTime)}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div />
              )}

              {!isLeft ? (
                <div className="flex justify-start pl-6">
                  <Card
                    className={`timeline-card ${
                      task.UserTaskKey === nextTaskId
                        ? "timeline-card-active"
                        : ""
                    }`}
                  >
                    <CardContent>
                      <h3 className="text-lg font-semibold">{task.Title}</h3>
                      {task.Description && (
                        <p className="text-sm text-gray-700">{task.Description}</p>
                      )}
                      <p className="text-xs text-gray-500 mt-2">
                        {minutesToHHMM(task.StartTime)} →{" "}
                        {minutesToHHMM(task.EndTime)}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div />
              )}

              {/* Center dot + start time */}
              <div className="timeline-dot-wrapper">
                <div
                  className={`timeline-dot ${
                    task.UserTaskKey === nextTaskId ? "timeline-dot-active" : ""
                  }`}
                >
                  <Icon fontSize="small" />
                </div>

                {/* Start time opposite card */}
                <span
                  className={isLeft ? "timeline-time-right" : "timeline-time-left"}
                >
                  {minutesToHHMM(task.StartTime)}
                </span>
              </div>
            </div>
          );
        })}

        {/* Current time marker */}
        {currentMinutes >= firstMinute && currentMinutes <= lastMinute && (
          <div
            className="timeline-marker"
            style={{ top: `${currentPct}%` }}
          >
            <div className="timeline-marker-label">
              {minutesToHHMM(currentMinutes)}
            </div>
            <div className="timeline-marker-line">
              <div className="timeline-marker-dot" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackingTasksTab;
