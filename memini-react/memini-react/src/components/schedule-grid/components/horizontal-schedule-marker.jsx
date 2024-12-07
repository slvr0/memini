import React, { useState, forwardRef, useImperativeHandle } from 'react';

const HorizontalScheduleMarker = forwardRef((_, ref) => { 
    const [isDragging,  setIsDragging]   = useState(false);
    const [isRendering, setIsRendering]  = useState(false);
    const [positionY,   setPositionY]    = useState(0);
    
    useImperativeHandle(ref, () => ({ //very simple demo of useImperativeHandle
      onSetIsDragging: (value)  => setIsDragging(value),
      onSetIsRendering: (value) => setIsRendering(value),
      onSetPositionY: (value)   => setPositionY(value),
    }));

    return (
      <>
      {isDragging && isRendering && (
      <div 
        className="horizontal-schedule-marker-line" 
        style={{ top: `${positionY}px`, zIndex: 1000 }}
      />
      )}
      </>
    );
   
  });

export default HorizontalScheduleMarker;








