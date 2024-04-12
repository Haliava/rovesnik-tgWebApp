import React, { useEffect } from "react";
import ReservationList from "../../features/reservationList";
import Header from "../../shared/ui/header";
import Footer from "../../shared/ui/footer";
import styles from './styles.module.scss';
import TableReservationList from "../../features/tableReservationList/TableReservationList";
import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "../../entities/event/api";
import { setEvents } from "../../entities/event/eventSlice";
import { useAppDispatch } from "../../app/hooks/redux";
import { useTheme } from "../../shared/ui/themeContext/ThemeContext";

type Props = {
    type?: 'afisha' | 'reservations',
}
const UserPage = ({type = 'afisha'}: Props) => {
    const dispatch = useAppDispatch();
    const reservationTypeToTextMap = new Map([
        ['afisha', 'Запланированные события:'],
        ['reservations', 'Забронированные столы:']
    ]);

    const {data: events, isLoading} = useQuery({
        queryKey: ['events'],
        queryFn: () => fetchEvents()
    });

    useEffect(() => {
        if (!isLoading) dispatch(setEvents(events!));
    }, [isLoading])

    const { theme } = useTheme();
    const rootClassName = theme === 'dark' ? styles.darkRoot : styles.lightRoot;

    return (
        <div className={`${styles.root} ${rootClassName}`}>
            
            <Header type={type} />
            <div className={styles.main}>
                <h2>Личный кабинет</h2>
                {/* сделать две вкладки: предстоящие события и прошедшие */}
                <p>{reservationTypeToTextMap.get(type)}</p>
                {type === 'afisha' && <ReservationList />}
                {type === 'reservations' && <TableReservationList />}
            </div>
            <Footer />
        </div>
    )
};

export default UserPage;
