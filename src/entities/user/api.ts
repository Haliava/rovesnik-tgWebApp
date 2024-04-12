import { apiEndpoint } from "../../shared/constants"
import { TTicket, UID } from "../../shared/types"

type TFetchUserTickets = (uid?: UID) => Promise<TTicket[]> 
export const fetchUserTicketsByUID: TFetchUserTickets = (uid = 406149871) => {
    return fetch(`${apiEndpoint}/tickets/${uid}`, {
        method: 'GET',
    }).then(res => res.json());
}