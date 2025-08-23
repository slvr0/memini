
//input time is displayed in minutes from 00:00, ie 600 is 10:00
export function convertMinuteTimeToHourMinutes(timeStamp) {
    const hh = Math.floor(timeStamp / 60);
    const mm = timeStamp % 60;
    return {hours : hh, minutes : mm};
}

//input time is displayed in minutes from 00:00, ie 600 is 10:00
export function calculateTaskTime(timeStart, timeEnds) {
    return convertMinuteTimeToHourMinutes(timeEnds - timeStart);    
}

export function convertHourMinutesToDisplayTime(hourMinutesTime, shortFormat=true, showMinutes=true) {
    const hourFormat        = shortFormat ? 'h' : 'Hour(s)';
    const minuteFormat      = shortFormat ? 'm' : 'Minute(s)';
    const minutesDisplay    = showMinutes ? ' : ' + hourMinutesTime.minutes.toLocaleString() + ' ' + minuteFormat : '';

   
    return hourMinutesTime.hours.toLocaleString() + ' ' + hourFormat + minutesDisplay;
}

export function timeMinutesAsString(minutes) {
    return minutes < 10 ? minutes.toLocaleString() + '0' : minutes.toLocaleString();
}

//display a minute counter as clocktime
export function timestampDisplay(time) {
    const hh = Math.floor(time / 60);
    const mm = time % 60;
    const mmDigitFixed = mm > 10 ? mm.toLocaleString() : '0' + mm.toLocaleString();    
    return hh.toLocaleString() + ':' + mmDigitFixed;
}

export function minutesToHHMM(mins) {
  const hours = Math.floor(mins / 60);
  const minutes = mins % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}