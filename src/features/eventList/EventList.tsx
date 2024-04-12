import React, { Suspense, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks/redux';
import { selectEvents, setEvents } from '../../entities/event/eventSlice';
import EventCard from '../../widgets/eventCard';
import styles from './styles.module.scss';
import Spinner from '../../compoments/Spinner';
import { useQuery } from '@tanstack/react-query';
import { fetchEvents } from '../../entities/event/api';

const EventList = () => {
    const events = useAppSelector(selectEvents);

    return (
        <div>
            {(
                events.map((event, i) => (
                    <div key={i} className={styles.container}>
                        <EventCard
                            key={i}
                            data={event}
                            showUpperBubble
                            showActionButton
                            cardType='base'
                        />
                    </div>
                ))
            )}                
        </div>
    );
};

export default EventList;