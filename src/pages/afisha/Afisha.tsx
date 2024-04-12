import React, { Suspense, useEffect } from 'react';
import Header from "../../shared/ui/header";
import EventList from '../../features/eventList';
import AfishaPageTitle from '../../shared/ui/afishaPageTitle';
import EventSearchField from '../../features/eventSearchField';
import Footer from '../../shared/ui/footer';
import styles from './styles.module.scss';
import Spinner from '../../compoments/Spinner';
import { useAppDispatch } from '../../app/hooks/redux';
import { setUID } from '../../entities/user/userSlice';
import { testUid } from '../../shared/constants';
import { useQuery } from '@tanstack/react-query';
import { fetchEvents } from '../../entities/event/api';
import { setEvents } from '../../entities/event/eventSlice';
import { useTheme } from '../../shared/ui/themeContext/ThemeContext';


const AfishaPage = () => {
    const dispatch = useAppDispatch();
    dispatch(setUID(testUid));
    // @ts-ignore
    // dispatch(setTheme(tgWebApp.colorScheme ?? 'light'));

    const {data: events, isLoading} = useQuery({
        queryKey: ['events'],
        queryFn: () => fetchEvents()
    });

    useEffect(() => {
        if (!isLoading) dispatch(setEvents(events!));
    }, [isLoading])

    const { theme } = useTheme();
    const rootClassName = theme === 'dark' ? styles.darkRoot : styles.lightRoot;
    const mainClassName1 = theme === 'dark' ? styles.darkMain : styles.lightMain;

    return (
        <div className={`${styles.root} ${rootClassName}`}>
            <Header />
                <div className={`${styles.main} ${mainClassName1}`}>
                    <AfishaPageTitle text={'Ровеснике'} />
                    <EventSearchField />
                    <p>Ближайшие события:</p>
                    {isLoading && <Spinner />}
                    {!isLoading && <EventList />}
                </div>
            <Footer />
        </div>
    );

};



export default AfishaPage;
