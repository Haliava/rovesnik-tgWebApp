export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type Time = `${number}${number}:${number}${number}`;
export type Timestamp = `${number}${number}${number}${number}-${number}${number}-${number}${number}`;
export type TDateTime = `${Timestamp}T${Time}:${number}${number}.${number}${number}${number}Z`;
export type DateString = string;

export type UID = number;
export type EventTypeShort = 'free' | 'deposit' | 'event';
export type EventType = 'Депозит' | 'Бесплатная вечеринка' | 'Ивент';
export type TEvent = {
    event_id: number,
    bar_id: number,
    short_name: string,
    img_path: string,
    datetime: TDateTime,
    place: string,
    price: number,
    event_type: EventTypeShort,
    description: string,
    age_restriction: number,
}
export type TTicket = {
    id: number,
    event_id: number,
    client_chat_id: number,
    qr_path: string,
    activation_status: boolean,
    friends: GuestInviteForm[] | null,
    hashcode: string,
}
export type GuestInviteForm = {
    name: string,
    username: string,
};

export type ApiResponse = TEvent[];

export type EventSliceState = {
    events: ApiResponse,
    currentBar: string,
    filter: Filter,
    barFilter: BarFilter,
    initialApiResponse: ApiResponse,
    status: 'idle' | 'loading' | 'failed',
}

export type UserSliceState = {
    tickets: TTicket[],
    uid: UID,
}

export type BarSliceState = {
    barId: BarId,
    currentBar: BarName,
}

export type Filter = 'anyFilter' | 'date' | 'price';
export type BarId = 1 | 2 | 3;
export type BarName = 'rovesnik' | 'doroshka' | 'skrepka';
export type BarFilter = BarName | 'anyBar';
export type EventId = number;
export type ReservationInfo = {
    bar: BarName,
    tableId: number,
    time: string,
    date: Timestamp,
    duration: number,
    guestCount: number,
}
export type TableData = {
    id: number,
    capacity: number,
    location: string,
    status: 'free' | 'reserved' | 'occupied',
}

export type ReservationSliceState = {
    tables: TableData[],
    focusedTable: number,
};

export interface TPurchaseFreeTicketResponse {
    status: string,
    message?: string,
}

export interface TPurchaseTicketResponse {
    status: string,
    message?: string,
}

export type Artist = {
    artist_id: number,
    name: string,
    description: string,
    img_path: string
}

export type ArtistEventRelationship = {
    artist_id: number,
    event_id: number,
    relationship_id: number,
}

export type TGetArtistsApiResponse = Artist[];
export type TArtistEventRelationshipApiResponse = ArtistEventRelationship[];