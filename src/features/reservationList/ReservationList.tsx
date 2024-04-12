import React, { useEffect, useState } from 'react'
import ReservationCard from '../reservationCard'
import { TEvent } from '../../shared/types'
import { mockApiResponse, userPageEventTypes } from '../../shared/constants'
import EventCard from '../../widgets/eventCard'
import Button from '../../shared/ui/button'
import { useNavigate } from 'react-router-dom'
import styles from './styles.module.scss'
import { useAppDispatch, useAppSelector } from '../../app/hooks/redux'
import { selectTickets, setTickets } from '../../entities/user/userSlice'
import { useQuery } from '@tanstack/react-query'
import { fetchUserTicketsByUID } from '../../entities/user/api'
import Spinner from '../../compoments/Spinner'
import { fetchEventDataById } from '../../entities/event/api'
import { splitDatetimeString } from '../../shared/utils'
import TabsSwitch from '../../shared/ui/tabsSwitch'

const ReservationList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState(userPageEventTypes[0]);
  const { data: userTickets, isLoading: ticketLoad } = useQuery({
    queryKey: ['userTickets'],
    queryFn: () => fetchUserTicketsByUID(),
  });
  const { data: userReservations, isLoading: resLoad } = useQuery({
    queryKey: ['userReservations'],
    queryFn: async () =>
      Promise.all(
        userTickets!.map(({ event_id }) => fetchEventDataById(event_id)),
      ),
    enabled: !!userTickets,
  });
  const { data: upcomingAndPastEvents, isLoading: areEventsLoading } = useQuery({
    queryKey: ['filterEventsByPastOrUpcoming'],
    queryFn: async () => Promise.resolve({
      // @ts-ignore
      upcoming: userReservations?.filter(event => (new Date(splitDatetimeString(event.datetime)[0]) - Date.now()) >= 0),
      // @ts-ignore
      past: userReservations?.filter(event => (new Date(splitDatetimeString(event.datetime)[0]) - Date.now()) < 0)
    }),
    enabled: !!userReservations,
  })

  useEffect(() => {
    if (!ticketLoad) dispatch(setTickets(userTickets!))
  }, [ticketLoad]);

  const handleEditReservation = (eventId: number) => {}
  const redirectToAfisha = () => navigate('/')

  return (
    <div>
      {areEventsLoading && <Spinner>Загрузка...</Spinner>}
      <TabsSwitch tabs={userPageEventTypes} activeTab={activeTab} setActiveTab={setActiveTab} />

      {!areEventsLoading && userReservations && activeTab === userPageEventTypes[0] && (
        upcomingAndPastEvents!.upcoming!.map(event => (
            <EventCard
              key={event.event_id}
              data={event}
              showActionButton
              customActionButtonText={'Изменить бронь'}
              customActionButtonAction={() =>
                handleEditReservation(event.event_id)
              }
              showUpperBubble
              cardType="userPage"
            />
        ))
      )}

      {!areEventsLoading && userReservations && activeTab === userPageEventTypes[1] && (
        upcomingAndPastEvents!.past!.map(event => (
            <EventCard
              key={event.event_id}
              data={event}
              showActionButton
              customActionButtonText={'Изменить бронь'}
              customActionButtonAction={() =>
                handleEditReservation(event.event_id)
              }
              showUpperBubble
              cardType="userPage"
            />
        ))
      )}
      
      {!areEventsLoading && userReservations && 
      (
        (activeTab === userPageEventTypes[0] && upcomingAndPastEvents!.upcoming!.length <= 0) ||
        (activeTab === userPageEventTypes[1] && upcomingAndPastEvents!.past!.length <= 0)
      ) && (
        <div className={styles.checkAfisha}>
          <p>
            {`У вас пока что нет билетов среди ${Array.from(activeTab).slice(0, -1).join('')}x событий`}
          </p>
          <Button
            text={'Посмотреть афишу'}
            type="blue"
            onClick={() => redirectToAfisha()}
          />
        </div>
      )}
    </div>
  )
}

export default ReservationList
