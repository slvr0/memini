

export function clockMarkerToString(time) {   
        return time < 10 ? '0' + time.toString() + '.00' : time.toString() + '.00';
}

export function setupClockMarkers (hours = 12, isLate = false) {        
    const clockMarkers = [];
    for(let i = 0; i <= hours; ++i) {      
        clockMarkers.push(clockMarkerToString(isLate ? i + 12 : i)); 

        if(i != hours) clockMarkers.push('30');                        
    }
    return clockMarkers;
}
