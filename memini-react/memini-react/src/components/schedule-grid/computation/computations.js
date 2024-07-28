

export function clockMarkerToString(time) {   
        return time < 10 ? '0' + time.toString() + '.00' : time.toString() + '.00';
}

export function setupClockMarkers (hours = 12) {        
    const clockMarkers = [];
    for(let i = 0 ; i < hours ; ++i) {
        clockMarkers.push(clockMarkerToString(i)); clockMarkers.push('30');                        
    }
    return clockMarkers;
}