import { Draft } from '@reduxjs/toolkit';
import { TEvent, Filter, DateString, Timestamp, BarName, GuestInviteForm, Time, TDateTime } from './types';
import { msInADay, timeSelectRange } from './constants';

export const sleep = async (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms))

type TSortEventsByFilter = (
    a: Draft<TEvent>,
    b: Draft<TEvent>,
    filter: Omit<Filter | BarName, 'anyFilter' | 'anyBar'>
) => number
export const sortEventsByFilter: TSortEventsByFilter = (a, b, filter) => {
    const fieldA = a[filter as keyof TEvent];
    const fieldB = b[filter as keyof TEvent];

    if (typeof fieldA === 'string' || typeof fieldB === 'string') {
        return fieldA > fieldB ? 1: fieldA < fieldB ? -1: 0;
    } else {
        return fieldA - fieldB;
    }
}

type TConvertTimestamp = (timestamp: Timestamp) => DateString | undefined
export const convertTimestampToDateString: TConvertTimestamp = (timestamp) => {
    if (!timestamp) return;
    const date = new Date(timestamp);
    const dayNames = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    const monthNames = [
        'Января', 'Февраля',
        'Марта', 'Апреля', 'Мая',
        'Июня', 'Июля', 'Августа',
        'Сентября', 'Октября', 'Ноября',
        'Декабря'
    ];

    return `${date.getDate() + 1} ${monthNames[date.getMonth()]}, ${dayNames[date.getDay()]}`;
}

type TAddDays = (date: Date, dayCount: number) => Date; 
export const addDaysToDate: TAddDays = (date, dayCount) => {
    return new Date(date.getTime() + msInADay * dayCount)
}

type TGetTimeList = (date: Date) => string[]; 
export const getTimeSelectList: TGetTimeList = (date) => {
    if (date.getMinutes() >= 30) {
        date.setHours(date.getHours() + 1);
        date.setMinutes(0);
    } else {
        date.setMinutes(30);
    }

    let res = [];
    for (let i = 0; i < timeSelectRange; i++) {
        date.setTime(date.getTime() + (30 * 60 * 1000));
        res.push(`${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`);
    }

    return res;
}

type TSplitDatetimeString = (datetime: TDateTime) => [Timestamp, Time];
export const splitDatetimeString: TSplitDatetimeString = (datetime) => {
    let [date, time] = datetime.split('T')as [Timestamp, Time];
    time = time.split(':').slice(0, 2).join(':') as Time;
    return [date, time];
}

type TValidationFunction = (guestList: GuestInviteForm[]) => boolean; 
export const validateGuests: TValidationFunction = (guestList) => {
    for (const guest of guestList) {
        if (!validateName(guest.name) || !validateTg(guest.username)) return false;
    }
    return true;
}
export const validateName: (name: string) => boolean = (name) => {
    return name.length > 0;
};
export const validateTg: (tg: string) => boolean = (tg) => {
    return /^@?.+/gi.test(tg);
};
