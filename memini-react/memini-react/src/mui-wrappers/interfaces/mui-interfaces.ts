import {ISimpleDate} from "../../interfaces/common-interfaces"

export interface TimeSliderRef {
    getValue: () => number[];
    getValueAsTime: () => string[];
}

export interface DiscreteDoubleTimeSliderProps {
    timeInterval: number[];
    onChange?: (value: number[]) => void;
}

export interface MuiDatePickerRef {
    getPickedDate: () => ISimpleDate; 
}

export interface MuiDatePickerProps { 
    defaultDate?: ISimpleDate | null;
    onChange?: (date: ISimpleDate) => void;
}

export interface MuiModalRef {
    setIsOpen: (value: boolean) => void;
};