
export function clockMarkerToString(time: number): string {   
        return time < 10 ? '0' + time.toString() + '.00' : time.toString() + '.00';
}

export function setupClockMarkers (hours = 12, isLate = false) {        
    const clockMarkers = [];
    for(let i = 0; i <= hours; ++i) {      
        clockMarkers.push(clockMarkerToString(isLate ? i + 12 : i)); 

        if(i != hours) clockMarkers.push('-');                        
    }
    return clockMarkers;
}

export function  getCurrentTimePosition (): number {
const now = new Date();
const minutes = now.getHours() * 60 + now.getMinutes();
return (minutes / (24 * 60)) * 100;
};

