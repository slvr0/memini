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
import { CalendarDays } from "lucide-react";
import { Typography } from '@mui/material';

interface SimpleDate {
  year: number;
  month: number;
  day: number;
}

interface SimpleDateRange {
  start: SimpleDate | null;
  end: SimpleDate | null;
}

interface MaterialDateRangePickerProps {
  defaultStartDate?: SimpleDate | null;
  defaultEndDate?: SimpleDate | null;
  buttonSize?: 'xs' | 'sm' | 'md' | 'lg';
  buttonVariant?: string;
  borderType?: string;
  label?: string;
  startLabel?: string;
  endLabel?: string;
  datePickerProps?: Omit<DatePickerProps, 'value' | 'onChange'>;
}

export interface MaterialDateRangePickerRef {
  getPickedDateRange: () => SimpleDateRange;
}

interface ButtonDateFieldProps extends DatePickerFieldProps {
  buttonSize?: 'xs' | 'sm' | 'md' | 'lg';
  buttonVariant?: string;
  borderType?: string;
  isEndDate?: boolean;
  startDate?: dayjs.Dayjs | null;
  endDate?: dayjs.Dayjs | null;
}

function ButtonDateField(props: ButtonDateFieldProps) {
  const { 
    internalProps, 
    forwardedProps 
  } = useSplitFieldProps(props, 'date');

  const { buttonSize, buttonVariant, borderType, isEndDate, startDate, endDate, ...restForwardedProps } = forwardedProps;

  const pickerContext = usePickerContext();
  const handleRef = useForkRef(pickerContext.triggerRef, pickerContext.rootRef);
  const parsedFormat = useParsedFormat();
  
  // Custom validation that considers both dates
  const { hasValidationError } = useValidation({
    validator: validateDate,
    value: pickerContext.value,
    timezone: pickerContext.timezone,
    props: internalProps,
  });

  // Additional range validation
  const hasRangeError = !hasValidationError && 
    isEndDate && 
    startDate && 
    pickerContext.value && 
    pickerContext.value.isBefore(startDate);

  const valueStr =
    pickerContext.value == null
      ? parsedFormat
      : pickerContext.value.format(pickerContext.fieldFormat);

  const labelVariant = buttonSize === 'lg' ? 'body1' : 'caption';
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
        borderColor: (hasValidationError || hasRangeError) ? '#d32f2f' : undefined,
        color: (hasValidationError || hasRangeError) ? '#d32f2f' : undefined,
      }}
      highlightBackgroundOnHover={false}
      highlightBorderOnHover={true}
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
          onClick={(e) => {
            e.stopPropagation();
            pickerContext.setOpen((prev) => !prev);
          }}
        /> 
      </div>
    </MuiStyledButton>
  );
}

type ButtonFieldDatePickerProps = DatePickerProps & {
  buttonSize?: 'xs' | 'sm' | 'md' | 'lg';
  buttonVariant?: string;
  borderType?: string;
  isEndDate?: boolean;
  startDate?: dayjs.Dayjs | null;
  endDate?: dayjs.Dayjs | null;
}

function ButtonFieldDatePicker(props: ButtonFieldDatePickerProps) {
  const { buttonSize, buttonVariant, borderType, isEndDate, startDate, endDate, ...datePickerProps } = props;

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
          isEndDate,
          startDate,
          endDate,
          ...datePickerProps.slotProps?.field,
        } as any,
      }}
    />
  );
}

const MuiStyledDateRangePicker = forwardRef<MaterialDateRangePickerRef, MaterialDateRangePickerProps>(
  (props, ref) => {
    const {
      defaultStartDate,
      defaultEndDate,
      buttonSize = 'sm',
      buttonVariant = 'main',
      borderType = 'rounded',
      label,
      startLabel = 'Start',
      endLabel = 'End',
      datePickerProps,
    } = props;

    const setDefaultDate = (defaultDate: SimpleDate | null | undefined) => {
      if (defaultDate) {
        return dayjs()
          .set('year', defaultDate.year)
          .set('month', defaultDate.month)
          .set('date', defaultDate.day);
      }
      return null;
    };

    const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(
      setDefaultDate(defaultStartDate)
    );
    const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(
      setDefaultDate(defaultEndDate)
    );

    useImperativeHandle(ref, () => ({
      getPickedDateRange: (): SimpleDateRange => ({
        start: startDate
          ? {
              year: startDate.year(),
              month: startDate.month(),
              day: startDate.date(),
            }
          : null,
        end: endDate
          ? {
              year: endDate.year(),
              month: endDate.month(),
              day: endDate.date(),
            }
          : null,
      }),
    }));

    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="flex gap-2 items-center">
          <ButtonFieldDatePicker
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            label={label ? `${label} - ${startLabel}` : startLabel}
            buttonSize={buttonSize}
            buttonVariant={buttonVariant}
            borderType={borderType}
            maxDate={endDate || undefined}
            {...datePickerProps}
          />
          <Typography variant="body2" sx={{ opacity: 0.6 }}>
            –
          </Typography>
          <ButtonFieldDatePicker
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            label={label ? `${label} - ${endLabel}` : endLabel}
            buttonSize={buttonSize}
            buttonVariant={buttonVariant}
            borderType={borderType}
            minDate={startDate || undefined}
            isEndDate={true}
            startDate={startDate}
            endDate={endDate}
            {...datePickerProps}
          />
        </div>
      </LocalizationProvider>
    );
  }
);


export default MuiStyledDateRangePicker;