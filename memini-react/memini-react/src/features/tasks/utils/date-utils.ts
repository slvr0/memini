import dayjs from "dayjs";
import type { DateKey, ITask } from "../interfaces/task-interface";

export const toDateKey = (y: number, m: number, d: number): DateKey =>
  dayjs().year(y).month(m - 1).date(d).format("YYYY-MM-DD");

export const taskDateKey = (t: ITask): DateKey =>
  toDateKey(t.Year, t.Month, t.Day);

export const enumerateDateKeys = (start: Date, end: Date): DateKey[] => {
  const a = dayjs(start), b = dayjs(end);
  const out: DateKey[] = [];
  for (let d = a; !d.isAfter(b, "day"); d = d.add(1, "day")) {
    out.push(d.format("YYYY-MM-DD"));
  }
  return out;
};


