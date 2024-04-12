import React, { Suspense } from "react"
import { Modal } from '@mui/material';
import { useAppSelector } from "../../app/hooks/redux";
import { selectTicketByEventId, selectTickets, selectUID } from "../../entities/user/userSlice";
import { useQuery } from "@tanstack/react-query";
import { fetchUserTicketsByUID } from "../../entities/user/api";
import { EventId } from "../../shared/types";
import { fetchQrImg } from "../../entities/ticket/api";
import { selectEventById, selectEvents } from "../../entities/event/eventSlice";
import Spinner from "../../compoments/Spinner";
import { convertTimestampToDateString, splitDatetimeString } from "../../shared/utils";
import { barAddressMap, barDisplayNameList, barQrTextMap } from "../../shared/constants";
import styles from './styles.module.scss';
import QRCode from '../../shared/assets/QRCode.jpg';
import { useTheme } from "../../shared/ui/themeContext/ThemeContext";


type Props = {
    eventId: EventId,
    isModalOpen: boolean,
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    className?: string,
}
const EventQr = ({ eventId, isModalOpen, setIsModalOpen, className }: Props) => {
    const { activation_status, qr_path } = useAppSelector((state) => selectTicketByEventId(state, eventId));
    const { short_name, datetime, bar_id } = useAppSelector((state) => selectEventById(state, eventId));
    const [date, time] = splitDatetimeString(datetime);
    const readableDate = convertTimestampToDateString(date);

    const { data: qrImg, isLoading } = useQuery({
        queryKey: ['getQrImg'],
        queryFn: () => fetchQrImg(qr_path)
    });

    const { theme } = useTheme();
    const themeModalContainer = theme === 'dark' ? styles.darkThemeModal : styles.lightThemeModal;
    const themeContent = theme === 'dark' ? styles.darkTheme : styles.lightTheme;

    return (
        <Modal
            className={`${styles.modalContainer} ${themeModalContainer}`}
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
        >
            <div className={`${styles.content} ${themeContent}`}>
                {isLoading && <Spinner />}
                {!isLoading && (
                    <img src={URL.createObjectURL(qrImg)} alt='qr' />
                )}
                <div className={styles.status}>
                    <div className={activation_status ? styles.statusActive : styles.statusCompleted}>
                        {activation_status ? 'активен' : 'завершено'}
                    </div>
                </div>
                <p className={styles.shortName}>{short_name}</p>
                <div className={styles.dateTime}>
                    <p>Дата: {readableDate}</p>
                    <p>Время: {time}</p>
                </div>
                <div className={styles.barInfo}>
                    <p>{barQrTextMap.get(barDisplayNameList[bar_id - 1])}</p>
                    <p><span>{barAddressMap.get(barDisplayNameList[bar_id - 1])}</span></p>
                </div>
            </div>
        </Modal>
    )
};

export default EventQr;
