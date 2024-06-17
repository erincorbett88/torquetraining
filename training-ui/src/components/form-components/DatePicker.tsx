import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import dayjs, {Dayjs} from 'dayjs';
import React, {useEffect, useState} from "react";
import {Box } from "@mui/material";


interface DatePickerComponentProps {
    onSelectDate: (selectedDate: Dayjs | null) => void;
    initialValue?: Dayjs | null; // Make initialValue optional
    hasError: boolean;
}

const DatePickerComponent: React.FC<DatePickerComponentProps> = ({onSelectDate, initialValue, hasError}) => {
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(initialValue || null); // Use initialValue if provided

    const handleDateChange = (date: Dayjs | null) => {
        console.log("Selected date:", date);
        onSelectDate(date);

    };

    useEffect(() => {
        if (initialValue !== undefined) { // Check if initialValue is provided
            setSelectedDate(initialValue);
        }
    }, [initialValue]);

    return (
        <Box>
            <DatePicker
                sx={{mb: hasError? 0 : 2, width: '100%'}}
                label="Select Date"
                onChange={handleDateChange}
                value={selectedDate ? dayjs(selectedDate) : null}
                maxDate={dayjs()}
            />
        </Box>
    );
}

export default DatePickerComponent;