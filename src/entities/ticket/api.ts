import { apiEndpoint } from "../../shared/constants"
import { EventId, GuestInviteForm, TPurchaseFreeTicketResponse, TPurchaseTicketResponse, TTicket, UID } from "../../shared/types"

type TPurchaseFreeTickets = (eventId: EventId, uid: UID, friends: GuestInviteForm[]) => Promise<TPurchaseFreeTicketResponse>;
export const purchaseFreeTickets: TPurchaseFreeTickets = (eventId, uid, friends) => {
    return fetch(`${apiEndpoint}/purchase_free_ticket/`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            event_id: eventId,
            client_chat_id: uid,
            friends
        })
    }).then(res => res.json());
}

type TPurchaseTicket = (eventId: EventId, uid: UID) => Promise<TPurchaseTicketResponse>;
export const purchaseTicket: TPurchaseTicket = (eventId, uid) => {
    return fetch(`${apiEndpoint}/purchase_ticket/`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            event_id: eventId,
            client_chat_id: uid,
        })
    }).then(res => res.json());
}

export const updateFreeTicket = () => {
}

export const updateTicket = () => {

}

type TFetchTicketById = (ticketId: number) => Promise<any>;
export const fetchTicketById: TFetchTicketById = (ticketId) => {
    return fetch(`${apiEndpoint}/ticket_by_id/${ticketId}`, {
        method: 'GET',
    }).then(res => res.json());
}

type TFetchQrImg = (path: string) => Promise<any>
export const fetchQrImg: TFetchQrImg = (path) => {
    return fetch(`${apiEndpoint}/download_file/?path_to_file=${path}`).then(res => res.blob());
}