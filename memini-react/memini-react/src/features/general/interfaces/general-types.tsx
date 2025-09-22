import { SimpleDate } from "../../planning/interfaces/planning-types";

export interface TimeSliderRef {
    getValue: () => number[];
    getValueAsTime: () => string[];
}

export interface DiscreteDoubleTimeSliderProps {
    timeInterval: number[];
    onChange?: (value: number[]) => void;
}

export interface MuiDatePickerRef {
    getPickedDate: () => SimpleDate; 
}

export interface MuiDatePickerProps { 
    defaultDate?: SimpleDate | null;
    onChange?: (date: SimpleDate) => void;
}

export interface MuiModalRef {
    setIsOpen: (value: boolean) => void;
};

