import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks/redux";
import EventCard from "../../widgets/eventCard";
import Button from "../../shared/ui/button";
import { defaultGuestListNumber, eventTypeDescriptionsMap, shortEventTypeToWordsMap, ticketPurchaseStatusAnswerMap } from "../../shared/constants";
import GuestList from "../../widgets/guestList";
import styles from './styles.module.scss';
import { FormValidationContext } from "../../app/context";
import { useQuery } from "@tanstack/react-query";
import { fetchEventDataById } from "../../entities/event/api";
import { fetchTicketById, purchaseFreeTickets, purchaseTicket } from "../../entities/ticket/api";
import { selectTicketByEventId, selectUID } from "../../entities/user/userSlice";
import { EventTypeShort, GuestInviteForm } from "../../shared/types";
import { Modal } from "@mui/material";
import { useTheme } from "../../shared/ui/themeContext/ThemeContext";
import Spinner from "../../compoments/Spinner";
import { getArtistsByEventId } from "../../entities/artist/api";
import Lineup from "../../features/lineup";

type Props = {
    eventId: number,
    ticketId?: number,
}
const EventDetailsPage = ({ eventId, ticketId }: Props) => {
    const navigate = useNavigate();
    const ticketFriendsData = useAppSelector((state) => selectTicketByEventId(state, eventId))?.friends || null;
    const userId = useAppSelector(selectUID);
    const [guestList, setGuestList] = useState<GuestInviteForm[]>(
        ticketFriendsData ? ticketFriendsData :
            Array.from({ length: defaultGuestListNumber }, (_, k) => k === 0 ?
                { name: 'Имя текущего пользователя', username: 'Его тг' } : { name: '', username: '' }
            )
    );
    const [isValid, setIsValid] = useState(false);
    const [showErrorLabel, setShowErrorLabel] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [eventType, setEventType] = useState<EventTypeShort>('free');
    const { data, isLoading } = useQuery({
        queryKey: ['fetchEvent', eventId],
        queryFn: () => ticketId === undefined ? fetchEventDataById(eventId!) : fetchTicketById(ticketId),
    });
    const { data: artistData, isLoading: isArtistLoading } = useQuery({
        queryKey: ['getArtists'],
        queryFn: () => getArtistsByEventId(eventId),
    })
    const { data: ticketStatusData, isLoading: isStatusLoading, refetch } = useQuery({
        refetchOnWindowFocus: false,
        queryKey: ['ticketStatus', eventId, eventType],
        queryFn: () => {
            if (eventType === 'free') return purchaseFreeTickets(eventId, userId, guestList);
            else if (eventType === 'deposit') return purchaseTicket(eventId, userId);
            else return purchaseTicket(eventId, userId);
        },
        enabled: false,
    });
    // интеграция с платежной системой
    const buyTickets = (eventType: EventTypeShort = 'free') => {
        if (!isValid) return;

        switch (eventType) {
            case 'free':
                if (isValid) {
                    setShowErrorLabel(false);
                    refetch();
                } else if (!showErrorLabel) setShowErrorLabel(true);
                break;
            case 'event':
                refetch();
                break;
            case 'deposit':
                refetch();
                break;
            default:
                break;
        }
        setIsModalOpen(true);
    };

    // Временная смена темы (light/dark), потом будет использоваться встроенная тема для tg webapp
    const { theme } = useTheme();
    const rootClassName = theme === 'dark' ? styles.darkRoot : styles.lightRoot;
    const mainClassName1 = theme === 'dark' ? styles.darkMain : styles.lightMain;
    const lineUpTheme = theme === 'dark' ? styles.darkLineUp : styles.lightLineUp;

    return (
        <div className={`${styles.root} ${rootClassName}`}>
            {!isLoading && (
                <>
                    <EventCard
                        data={data}
                        showUpperBubble
                        cardType="description"
                    />
                    <div className={`${styles.main} ${mainClassName1}`}>
                        <div className={styles.mainAboutEvents}>
                            <h1>O событии</h1>
                            <p>{data!.description}</p>
                        </div>
                        <div className={styles.lineUp}>
                            {isArtistLoading && <Spinner />}
                            {!isArtistLoading && !('detail' in artistData!) && (
                                <>
                                    <h2>Лайн-ап</h2>
                                    <Lineup artists={artistData!} />
                                </>
                            )}
                        </div>
                        <div className={styles.cardItem}>
                            <h2>Тип: {shortEventTypeToWordsMap.get(data!.event_type)}</h2>
                            <p>{eventTypeDescriptionsMap.get(shortEventTypeToWordsMap.get(data!.event_type)!)}</p>
                        </div>

                        <div className={styles.btnIndentation}>
                            {shortEventTypeToWordsMap.get(data!.event_type) === 'Бесплатная вечеринка' && (
                                <>
                                    <FormValidationContext.Provider value={{ isValid, setIsValid, showErrorLabel, setShowErrorLabel }}>
                                        <div>
                                            <GuestList guestList={guestList} setGuestList={setGuestList} />
                                        </div>
                                        {showErrorLabel && <p>{'Заполнены не все поля'}</p>}
                                        <Button text='Зарегистрироваться' onClick={() => buyTickets('free')} type={"blue"} />
                                    </FormValidationContext.Provider>
                                </>
                            )}
                            {shortEventTypeToWordsMap.get(data!.event_type) === 'Депозит' && (
                                <>
                                    <h3>Цена: {data!.price}</h3>
                                    <Button text='Внести депозит' onClick={() => buyTickets('deposit')} type="blue" />
                                </>
                            )}
                            {shortEventTypeToWordsMap.get(data!.event_type) === 'Ивент' && (
                                <>
                                    <h3>Цена: {data!.price}</h3>
                                    <Button text='Купить билет' onClick={() => buyTickets('event')} type="blue" />
                                </>
                            )}
                        </div>
                    </div>
                    <Modal
                        className={styles.statusModal}
                        open={isModalOpen}
                    >
                        <div>
                            {isStatusLoading && <Spinner><p>Ваш запрос обрабатывается</p></Spinner>}
                            {!isStatusLoading && (
                                <div>
                                    {ticketStatusData?.message === 'Ticket purchased successfully' && (
                                        <div>
                                            <p>Готово!</p>
                                            <Button text='Ок' onClick={() => navigate('/my/events')} />
                                        </div>
                                    )}
                                    {ticketStatusData?.message != 'Ticket purchased successfully' && (
                                        <div>
                                            <p>{ticketPurchaseStatusAnswerMap.get(ticketStatusData?.message || '')
                                                || 'Что-то пошло не так...'}
                                            </p>
                                            <Button text='Закрыть' onClick={() => setIsModalOpen(false)} />
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </Modal>
                </>
            )}

        </div>
    );
};

export default EventDetailsPage;
