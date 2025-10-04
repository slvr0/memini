import * as React from 'react';
import { forwardRef, useState, useImperativeHandle } from 'react';
import useForkRef from '@mui/utils/useForkRef';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
  DatePicker,
  DatePickerProps,
  DatePickerFieldProps,
} from '@mui/x-date-pickers/DatePicker';
import { useValidation, validateDate } from '@mui/x-date-pickers/validation';
import {
  useSplitFieldProps,
  useParsedFormat,
  usePickerContext,
} from '@mui/x-date-pickers/hooks';
import dayjs from 'dayjs';
import MuiStyledButton from './mui-button-wrapper'; 
import LucidIconButton from '../lucid/lucid-button-icon';

import { Calendar, CalendarDays } from "lucide-react";


import { Typography } from '@mui/material';

interface SimpleDate {
  year: number;
  month: number;
  day: number;
}

interface MaterialDatePickerProps {
  defaultDate?: SimpleDate | null;
  buttonSize?: 'xs' | 'sm' | 'md' | 'lg';
  buttonVariant?: string;
  borderType?: string;
  label?: string;
  datePickerProps?: Omit<DatePickerProps, 'value' | 'onChange'>;
}

export interface MaterialDatePickerRef {
  getPickedDate: () => SimpleDate;
}

interface ButtonDateFieldProps extends DatePickerFieldProps {
  buttonSize?: 'xs' | 'sm' | 'md' | 'lg';
  buttonVariant?: string;
  borderType?: string;
}

type ButtonFieldDatePickerProps = DatePickerProps & {
  buttonSize?: 'xs' | 'sm' | 'md' | 'lg';
  buttonVariant?: string;
  borderType?: string;
}

function ButtonDateField(props: ButtonDateFieldProps) {
  const { 
    internalProps, 
    forwardedProps 
  } = useSplitFieldProps(props, 'date');

  const { buttonSize, buttonVariant, borderType, ...restForwardedProps } = forwardedProps;

  const pickerContext = usePickerContext();
  const handleRef = useForkRef(pickerContext.triggerRef, pickerContext.rootRef);
  const parsedFormat = useParsedFormat();
  const { hasValidationError } = useValidation({
    validator: validateDate,
    value: pickerContext.value,
    timezone: pickerContext.timezone,
    props: internalProps,
  });

  const valueStr =
    pickerContext.value == null
      ? parsedFormat
      : pickerContext.value.format(pickerContext.fieldFormat);

  const labelVariant = buttonSize === 'lg' ?  'body1' : 'caption';
  const labelPixelSize = buttonSize === 'lg' ? '12px' : '12px';

  return (
    <MuiStyledButton
      {...restForwardedProps}
      buttonSize={buttonSize as any}
      buttonVariant={buttonVariant as any}
      borderType={borderType as any}
      ref={handleRef}
      className={pickerContext.rootClassName}
      sx={pickerContext.rootSx}
      onClick={() => pickerContext.setOpen((prev) => !prev)}
      style={{
        borderColor: hasValidationError ? '#d32f2f' : undefined,
        color: hasValidationError ? '#d32f2f' : undefined,
      }}
      highlightBackgroundOnHover = {false}
      highlightBorderOnHover = {true}
    >

      <div className="flex gap-2 mx-2">
        <Typography variant={labelVariant} fontSize={labelPixelSize}>
        {pickerContext.label ? `${pickerContext.label}: ${valueStr}` : valueStr}
        </Typography>
        <LucidIconButton
                  icon={CalendarDays}
                  size={13}
                  opacity={.75}
                  palette="main"
                  borderProfile="rounded"
                  highlightBackgroundOnHover={true}
                  highlightBorderOnHover={true}
                  displayBorder={false}
                  tooltip="Select date"
                  onClick={() => console.log("Clicked Home")}
          /> 
      </div>
            
    </MuiStyledButton>
  );
}

function ButtonFieldDatePicker(props: ButtonFieldDatePickerProps) {
  const { buttonSize, buttonVariant, borderType, ...datePickerProps } = props;

  return (
    <DatePicker
      {...datePickerProps}
      slots={{
        ...datePickerProps.slots,
        field: ButtonDateField,
      }}
      slotProps={{
        ...datePickerProps.slotProps,
        field: {
          buttonSize,
          buttonVariant,
          borderType,
          ...datePickerProps.slotProps?.field,
        } as any,
      }}
    />
  );
}

const MuiStyledDatePicker = forwardRef<MaterialDatePickerRef, MaterialDatePickerProps>(
  (props, ref) => {
    const {
      defaultDate,
      buttonSize = 'sm',
      buttonVariant = 'main',
      borderType = 'rounded',
      label,
      datePickerProps,
    } = props;

    const setDefaultValue = (defaultDate: SimpleDate | null | undefined) => {
      if (defaultDate) {
        return dayjs()
          .set('year', defaultDate.year)
          .set('month', defaultDate.month)
          .set('date', defaultDate.day);
      }
      return dayjs();
    };

    const [value, setValue] = useState<dayjs.Dayjs>(setDefaultValue(defaultDate));

    useImperativeHandle(ref, () => ({
      getPickedDate: (): SimpleDate => ({
        year: value.year(),
        month: value.month(),
        day: value.date(),
      }),
    }));

    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ButtonFieldDatePicker
          value={value}
          onChange={(newValue) => setValue(newValue || dayjs())}
          label={label}
          buttonSize={buttonSize}
          buttonVariant={buttonVariant}
          borderType={borderType}
          {...datePickerProps}
        />
      </LocalizationProvider>
    );
  }
);


export default MuiStyledDatePicker;