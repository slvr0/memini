import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../../store";
import type { DateKey } from "./task-types";
import { tasksAdapter } from "./task-slice";

/* entity adaptor CRUD selectors we give access to.

selectAll(state) → returns all tasks as an array.
selectById(state, id) → returns one task by id.
selectIds(state) → returns array of ids.
selectEntities(state) → returns the { id: entity } map.
selectTotal(state) → returns how many entities exist.

*/

export const tasksSelectors = tasksAdapter.getSelectors<RootState>(
  (state) => state.tasks
);

export const makeSelectTasksByDate = (dateKey: DateKey) =>
  createSelector(
    (s: RootState) => s.tasks.byDate[dateKey],
    (s: RootState) => s.tasks.entities,
    (ids = [], entities) => {
      return ids.map((id) => entities[id]!).sort((a, b) => a.StartTime - b.StartTime);
    }
  );

export const isDateLoaded = (dateKey: string) =>
  (s: RootState): boolean => Boolean(s.tasks.loadedDates?.[dateKey]);


