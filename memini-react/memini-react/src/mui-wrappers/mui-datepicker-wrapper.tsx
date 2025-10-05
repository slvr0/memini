import * as React from 'react';
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
import dayjs, { Dayjs } from 'dayjs';
import MuiStyledButton from './mui-button-wrapper'; 
import { CalendarDays } from "lucide-react";
import { Typography } from '@mui/material';

interface MaterialDatePickerProps {
  value: Dayjs;
  onChange: (newValue: Dayjs) => void;
  buttonSize?: 'xs' | 'sm' | 'md' | 'lg';
  buttonVariant?: string;
  borderType?: string;
  label?: string;
  datePickerProps?: Omit<DatePickerProps, 'value' | 'onChange'>;
}

interface ButtonDateFieldProps extends DatePickerFieldProps {
  buttonSize?: 'xs' | 'sm' | 'md' | 'lg';
  buttonVariant?: string;
  borderType?: string;
  slotProps?: any;
  slots?: any;
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
  const forwardedPropsAny = forwardedProps as any;
  const { 
    buttonSize, 
    buttonVariant, 
    borderType,
    slotProps, 
    slots,   
    inputRef,
    ...restForwardedProps 
  } = forwardedPropsAny;

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
      highlightBackgroundOnHover={false}
      highlightBorderOnHover={true}
    >
      <div className="flex gap-2 mx-2 items-center">
        <Typography variant={labelVariant} fontSize={labelPixelSize}>
          {pickerContext.label ? `${pickerContext.label}: ${valueStr}` : valueStr}
        </Typography>

        <CalendarDays size={14} style={{ opacity: 0.85 }} />
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

const MuiStyledDatePicker: React.FC<MaterialDatePickerProps> = (props) => {
  const {
    value,
    onChange,
    buttonSize = 'sm',
    buttonVariant = 'main',
    borderType = 'rounded',
    label,
    datePickerProps,
  } = props;


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ButtonFieldDatePicker
        value={value}
        onChange={(newValue) => onChange(newValue || dayjs())}
        label={label}
        buttonSize={buttonSize}
        buttonVariant={buttonVariant}
        borderType={borderType}
        {...datePickerProps}
      />
    </LocalizationProvider>
  );
};

export default MuiStyledDatePicker;