import { store } from '../app/store';
import { rovesnikHeaderLogo, skrepkaHeaderLogo, dorozhkaLightHeaderLogo, rovesnikFooterLogo, skrepkaFooterLogo, dorozhkaFooterLogo } from './assets';
import { rovesnik1F, rovesnik2F, rovesnik3F } from './assets';
import { ApiResponse, BarFilter, BarName, BarSliceState, EventSliceState, EventType, EventTypeShort, Filter, ReservationInfo, ReservationSliceState, TableData, TDateTime, UserSliceState } from "./types";

export const apiEndpoint = 'https://rovesnik-bot.ru/api';
export const testUid = 406149871;

export const mockApiResponse: ApiResponse = [
    {
        event_id: 2,
        short_name: "Вечеринка 1",
        description: "ROCKET — артист, который не нуждается в представлении. С каждым релизом его фан-база растёт в геометрической прогрессии. Его музыка — одна из самых вайбовых в отечественной индустрии. Пожалуй, каждый из нас слышал такие треки, как: «Город», «Everything Is Fine», «Monday» и, конечно же, «Инкассатор».",
        img_path: "/home/donqhomo/Desktop/orders/CRM-Rovesnik-Doroshka-Screpka/BackendApp/static/event1.jpg",
        datetime: "2024-03-18T19:00:00Z" as TDateTime,
        bar_id: 1,
        place: "3ий этаж Ровесник / адрес: abcdef",
        age_restriction: 18,
        event_type: "deposit",
        price: 1000.0
    },
    {
        event_id: 3,
        short_name: "Вечеринка 2",
        description: "ROCKET — артист, который не нуждается в представлении. С каждым релизом его фан-база растёт в геометрической прогрессии. Его музыка — одна из самых вайбовых в отечественной индустрии. Пожалуй, каждый из нас слышал такие треки, как: «Город», «Everything Is Fine», «Monday» и, конечно же, «Инкассатор».",
        img_path: "/home/donqhomo/Desktop/orders/CRM-Rovesnik-Doroshka-Screpka/BackendApp/static/event2.jpg",
        datetime: "2024-03-19T18:00:00Z" as TDateTime,
        bar_id: 1,
        place: "1ый этаж Ровесник / адрес: abcdef",
        age_restriction: 18,
        event_type: "deposit",
        price: 2000.0
    },
    {
        event_id: 4,
        short_name: "Вечеринка 3",
        description: "ROCKET — артист, который не нуждается в представлении. С каждым релизом его фан-база растёт в геометрической прогрессии. Его музыка — одна из самых вайбовых в отечественной индустрии. Пожалуй, каждый из нас слышал такие треки, как: «Город», «Everything Is Fine», «Monday» и, конечно же, «Инкассатор».",
        img_path: "/home/donqhomo/Desktop/orders/CRM-Rovesnik-Doroshka-Screpka/BackendApp/static/event3.jpg",
        datetime: "2024-03-20T18:00:00Z" as TDateTime,
        bar_id: 1,
        place: "2ой этаж Ровесник / адрес: abcdef",
        age_restriction: 18,
        event_type: "free",
        price: 0.0
    }
];

export const shortEventTypeToWordsMap = new Map<EventTypeShort, EventType>([
    ['free', 'Бесплатная вечеринка'], ['deposit', 'Депозит'], ['event', 'Ивент']
] as [EventTypeShort, EventType][])

export const initialEventSliceState: EventSliceState = {
    events: [...mockApiResponse],
    initialApiResponse: mockApiResponse,
    currentBar: 'ровесник',
    filter: 'anyFilter',
    barFilter: 'anyBar',
    status: 'idle',
}

export const initialUserSliceState: UserSliceState = {
    tickets: [],
    uid: 406149871,
}

export const initialBarSliceState: BarSliceState = {
    currentBar: 'rovesnik',
    barId: 1,
}

export const changeCurrentBar = (newBarId: number) => {
    store.dispatch(setCurrentBar(newBarId));
};

export const logoSizes: { [key: string]: { logoWidth: number; logoHeight: number } } = {
    '1': { logoWidth: 148, logoHeight: 82 },
    '2': { logoWidth: 74, logoHeight: 82 },
    '3': { logoWidth: 68, logoHeight: 82 },
};

export let currentBarId = 2; // Выбор текущего бара (1, 2, 3)

export const updateCurrentBarId = (newBarId: number) => {
    currentBarId = newBarId;
};

export const barList: BarName[] = ['rovesnik', 'doroshka', 'skrepka'];
export const barDisplayNameList = ['Ровесник', 'Дорожка', 'Скрепка'] as const;
export const barFullNameMap = new Map<BarName, string>(
    Array.from({ length: barList.length },
        (_, i) => [barList[i], barDisplayNameList[i]])
);
export const filterList: Filter[] = ['anyFilter', 'date', 'price'];
export const barFilterList: BarFilter[] = [...barList, 'anyBar'];
export const allFilterList: (Filter | BarFilter)[] = [...barFilterList, ...filterList];
export const allFilterWordList: string[] = [
    'Для Ровесника', 'Для Дорожки', 'Для Скрепки', 'Для всех баров',
    'Все события', 'По дате', 'По стоимости'
]
export const filterToWordMap = new Map<Filter | BarFilter, string>(
    Array.from({ length: allFilterList.length }, (_, i) => [allFilterList[i], allFilterWordList[i]])
);

export const headerBarToLogoMap = new Map([
    [1, rovesnikHeaderLogo],
    [2, skrepkaHeaderLogo],
    [3, ''],
]);

export const footerBarToResourcesMap = new Map([
    [1, { logo: rovesnikFooterLogo, background: 'rgba(88, 97, 202, 1)' }],
    [2, { logo: skrepkaFooterLogo, background: 'rgba(255, 89, 81, 1)' }],
    [3, { logo: dorozhkaFooterLogo, background: 'rgba(1, 0, 104, 1)' }],
]);

// export const barToLogoMap = new Map<BarName, string>([
//     ['rovesnik', rovesnikLogo], ['doroshka', dorozhkaLogo], ['skrepka', skrepkaLogo]
// ] as [BarName, string][]);

export const eventTypeDescriptionsMap = new Map<EventType, string>([
    ['Бесплатная вечеринка', 'Введите свои контакты и контакты друзей и близких, которых хотели бы пригласить на вечеринку.'],
    ['Депозит', 'Вечеринка будет проходить за депозит. Тут должно быть пояснение что такое депозит и зачем он нужен.'],
    ['Ивент', 'чето чето четоче точе точ еточе то']
] as [EventType, string][]);
export const defaultGuestListNumber = 1;

// <-- reservations -->
export const maxGuestCount = 15;
export const dateSelectRange = 30; // in days
export const timeSelectRange = 15; // in row count
export const msInADay = 86400000;
export const reservationsApiMockResponse: ReservationInfo[] = [
    { bar: 'rovesnik', tableId: 1, date: '2024-03-02', duration: 30, time: '19:00', guestCount: 2 },
    { bar: 'rovesnik', tableId: 2, date: '2024-03-03', duration: 30, time: '18:00', guestCount: 2 },
    { bar: 'rovesnik', tableId: 3, date: '2024-03-04', duration: 60, time: '17:00', guestCount: 2 },
    { bar: 'rovesnik', tableId: 4, date: '2024-03-05', duration: 60, time: '15:00', guestCount: 2 },
    { bar: 'rovesnik', tableId: 5, date: '2024-03-06', duration: 60, time: '14:00', guestCount: 2 },
    { bar: 'rovesnik', tableId: 6, date: '2024-03-07', duration: 60, time: '18:00', guestCount: 2 },
];
export const mockAvailableTables: TableData[] = [
    { id: 1, capacity: 8, location: '3', status: 'free' },
    { id: 2, capacity: 2, location: '3', status: 'reserved' },
    { id: 3, capacity: 2, location: '3', status: 'occupied' },
    { id: 4, capacity: 3, location: '3', status: 'free' },
    { id: 5, capacity: 3, location: '3', status: 'free' },
    { id: 6, capacity: 2, location: '3', status: 'free' },
]
export const tableDataApiMockResponse: TableData = {
    id: 1,
    capacity: 8,
    location: '3 этаж',
    status: 'free',
}

export const tableCapacityCases = new Map<number, string>();
for (let i = 0; i < maxGuestCount; i++) {
    if (i < 5) tableCapacityCases.set(i, 'человека');
    else tableCapacityCases.set(i, 'человек');
}

export const initialReservationsSliceState: ReservationSliceState = {
    tables: [...mockAvailableTables],
    focusedTable: 1,
}

export const rovesnikFloorPaths = [rovesnik1F, rovesnik2F, rovesnik3F];

export const barAddressMap = new Map<typeof barDisplayNameList[number], string>([
    ['Ровесник', 'Малый Гнездниковский переулок, 9с2'],
    ['Дорожка', '3-я улица Ямского Поля, 2, корп. 5А'],
    ['Скрепка', 'Девяткин переулок, 7']
]);

export const barQrTextMap = new Map<typeof barDisplayNameList[number], string>([
    ['Ровесник', 'Бар «Ровесник»'],
    ['Дорожка', 'Клуб Любителей Боулинга\n«Дорожка»'],
    ['Скрепка', 'Бистро «Скрепка»']
]);

export const ticketPurchaseStatusAnswerMap = new Map([
    ['Ticket already purchased for this user', 'Вы уже зарегистрировались на этот ивент']
]);

export const userPageEventTypes = ['предстоящие', 'прошедшие'];

function setCurrentBar(newBarId: number): any {
    throw new Error('Function not implemented.');
}
