import React, { useState } from 'react'
import styles from './styles.module.scss'
import { Formik, Form, Field } from 'formik'
import { Icon, InputLabel, MenuItem, Select } from '@mui/material';
import { dateSelectRange, maxGuestCount } from '../../shared/constants';
import { addDaysToDate, convertTimestampToDateString, getTimeSelectList } from '../../shared/utils';
import { Timestamp } from '../../shared/types';
import { useAppDispatch } from '../../app/hooks/redux';
import Button from '../../shared/ui/button';
import { trace } from 'console';
import { useTheme } from '../../shared/ui/themeContext/ThemeContext';

const ReservationForm = () => {
    let date = new Date();
    const dispatch = useAppDispatch();
    const timeSelectList = getTimeSelectList(date);
    const [formData, setFormData] = useState(['', 2, addDaysToDate(date, 0).toISOString().split('T')[0] as Timestamp, timeSelectList[0]]);

    const { theme } = useTheme();
    const fieldNameClass = theme === 'dark' ? styles.fieldNameDark : styles.fieldNameLight;
    const fieldGuestCountClass = theme === 'dark' ? styles.fieldGuestCountDark : styles.fieldGuestCountLight;
    const fieldDateClass = theme === 'dark' ? styles.fieldDateDark : styles.fieldDateLight;
    const fieldTimeClass = theme === 'dark' ? styles.fieldTimeDark : styles.fieldTimeLight;
    
    return (
        <div className={styles.root}>
            <Formik
                initialValues={{
                    guestCount: 2,
                    dateSelect: addDaysToDate(date, 0).toISOString().split('T')[0] as Timestamp,
                    timeSelect: timeSelectList[0],
                }}
                onSubmit={values => {
                    // dispatch(setAvailableTables(values))
                }}
            >
                {({ handleSubmit }) => (
                    <Form>
                        <div className={styles.formFieldInfo}>
                            <Field name="name" placeholder="Имя Фамилия" className={`${styles.fieldName} ${fieldNameClass}`} />
                            <Select
                                displayEmpty={true}
                                // @ts-ignore
                                renderValue={(value) => value || 'Количество гостей'}
                                name="guestCount"
                                className={`${styles.fieldGuestCount} ${fieldGuestCountClass}`}
                                sx={{
                                    boxShadow: "none",
                                    ".MuiOutlinedInput-notchedOutline": { border: 0 },
                                    "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                                        border: 0,
                                    },
                                    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                        border: 0,
                                    },
                                    bgcolor: theme === 'dark' ? 'black' : 'white',
                                    color: theme === 'dark' ? 'white' : 'black',
                                    "& .MuiSvgIcon-root": {
                                        color: theme === 'dark' ? 'white' : 'black',
                                    },
                                }}
                                MenuProps={{
                                    PaperProps: {
                                        sx: {
                                            bgcolor: theme === 'dark' ? 'black' : 'white',
                                            color: theme === 'dark' ? 'white' : 'black',
                                            height: 200,
                                            borderRadius: '20px',
                                            marginTop: '-40px',
                                            '& .MuiMenuItem-root': {
                                                fontSize: 14,
                                            },
                                        }
                                    }
                                }}
                            >
                                {Array.from({ length: maxGuestCount }).map((_, i) => (
                                    <MenuItem key={i} value={i + 1}>{i + 1}</MenuItem>
                                ))}
                            </Select>
                        </div>
                        <div className={styles.formFieldDate}>
                            <Select
                                displayEmpty={true}
                                renderValue={(value) => convertTimestampToDateString(value as Timestamp) ?? 'Дата'}
                                name="dateSelect"
                                label="Дата"
                                className={`${styles.fieldDate} ${fieldDateClass}`}
                                sx={{
                                    boxShadow: "none",
                                    ".MuiOutlinedInput-notchedOutline": { border: 0 },
                                    "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                                        border: 0,
                                    },
                                    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                        border: 0,
                                    },
                                    bgcolor: theme === 'dark' ? 'black' : 'white',
                                    color: theme === 'dark' ? 'white' : 'black',
                                    "& .MuiSvgIcon-root": {
                                        color: theme === 'dark' ? 'white' : 'black',
                                    },
                                }}
                                MenuProps={{
                                    PaperProps: {
                                        sx: {
                                            bgcolor: theme === 'dark' ? 'black' : 'white',
                                            color: theme === 'dark' ? 'white' : 'black',
                                            height: 200,
                                            borderRadius: '20px',
                                            marginTop: '-40px',
                                            '& .MuiMenuItem-root': {
                                                fontSize: 14,
                                            },
                                        }
                                    }
                                }}
                            >
                                {Array.from({ length: dateSelectRange }).map((_, i) => {
                                    const newDateTimestamp = addDaysToDate(date, i).toISOString().split('T')[0] as Timestamp;
                                    return (<MenuItem key={i} value={newDateTimestamp}>
                                        {convertTimestampToDateString(newDateTimestamp)}
                                    </MenuItem>)
                                })}
                            </Select>
                            <Select
                                displayEmpty={true}
                                // @ts-ignore
                                renderValue={(value) => value ?? 'Время'}
                                name="timeSelect"
                                label="Время"
                                className={`${styles.fieldTime} ${fieldTimeClass}`}
                                sx={{
                                    boxShadow: "none",
                                    ".MuiOutlinedInput-notchedOutline": { border: 0 },
                                    "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                                        border: 0,
                                    },
                                    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                        border: 0,
                                    },
                                    bgcolor: theme === 'dark' ? 'black' : 'white',
                                    color: theme === 'dark' ? 'white' : 'black',
                                    "& .MuiSvgIcon-root": {
                                        color: theme === 'dark' ? 'white' : 'black',
                                    },
                                }}

                                MenuProps={{
                                    PaperProps: {
                                        sx: {
                                            bgcolor: theme === 'dark' ? 'black' : 'white',
                                            color: theme === 'dark' ? 'white' : 'black',
                                            height: 200,
                                            borderRadius: '20px',
                                            marginTop: '-40px',
                                            '& .MuiMenuItem-root': {
                                                fontSize: 14,
                                            },
                                        }
                                    }
                                }}
                            >
                                {timeSelectList.map((time, i) => (
                                    <MenuItem key={i} value={time}>{time}</MenuItem>
                                ))}
                            </Select>
                        </div>
                        <Button type="blue" text="Применить" className={styles.btnSubmit} onClick={handleSubmit} />
                    </Form>
                )}
            </Formik>
        </div >
    )
}

export default ReservationForm
