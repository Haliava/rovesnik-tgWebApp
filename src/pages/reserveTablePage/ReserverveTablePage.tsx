import React, { Suspense, useState } from 'react'
import Header from '../../shared/ui/header'
import Footer from '../../shared/ui/footer'
import Button from '../../shared/ui/button'
import BarMap from '../../features/barMap'
import styles from './styles.module.scss'
import ReservationForm from '../../features/reservationForm'
import TableList from '../../features/tableList'
import { Modal } from '@mui/material'
import { ReservationInfo, TableData } from '../../shared/types'
import { reservationsApiMockResponse } from '../../shared/constants'
import { convertTimestampToDateString } from '../../shared/utils'
import Spinner from '../../compoments/Spinner'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftIcon, ArrowRightIcon } from '@mui/x-date-pickers'
import { arrowLeftLight, arrowLeftDark, arrowRightLight, arrowRightDark } from '../../shared/assets';
import { useTheme } from '../../shared/ui/themeContext/ThemeContext'
import { closeCross } from '../../shared/assets';
import TabsSwitch from '../../shared/ui/tabsSwitch'

const ReserveTablePage = () => {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('3D - карта');
    const [shouldShowMap, setShouldShowMap] = useState(true)
    const [isOpen, setIsOpen] = useState(false)
    const [currentStep, setCurrentStep] = useState(1)
    const [selectedFloor, setSelectedFloor] = useState(1)
    const selectedTable: TableData = {
        capacity: 4,
        id: 1,
        location: '3',
        status: 'free',
    } // useSelector(selectTableUpForReservation)
    const selectedReservationDate: ReservationInfo =
        reservationsApiMockResponse[1] // useSelector(selectCurrentReservationDate(selectedTable.id))
    const [maxFloor, setMaxFloor] = useState(3)

    const reserveTable = async () => {
        await setTimeout(() => Promise.resolve(true), 1000)
        setCurrentStep(2)
    }
    const handleOpen = () => setIsOpen(true)
    const handleClose = () => {
        setIsOpen(false)
        if (currentStep === 2) navigate('/my/reservations')
    }
    const handleTypeChange = (type: string) => {
        setShouldShowMap(type === 'map')
    }

    const { theme } = useTheme();
    const rootClassName = theme === 'dark' ? styles.darkRoot : styles.lightRoot;
    const mainClassName1 = theme === 'dark' ? styles.darkMain : styles.lightMain;
    const buttonClassName = theme === 'dark' ? styles.buttonDark : styles.buttonLight;
    const arrowLeftTheme = theme === 'dark' ? arrowLeftDark : arrowLeftLight;
    const arrowRightTheme = theme === 'dark' ? arrowRightDark : arrowRightLight;
    const modalContentTheme = theme === 'dark' ? styles.modalContentDark : styles.modalContentLight;

    return (
        <Suspense fallback={<Spinner />}>
            <div className={`${styles.root} ${rootClassName}`}>
                <Header type="reservations" />
                <div className={`${styles.main} ${mainClassName1}`}>
                    <h1>{'Забронировать стол'}</h1>
                    <p>
                        {'Обратите внимание! Если вы хотите забронировать стол на 2+ часа, тогда свяжитесь с нашим менеджером.'}
                    </p>
                    <ReservationForm />
                    <TabsSwitch activeTab={activeTab} setActiveTab={setActiveTab} tabs={['3D - карта', 'Таблица']} />
                    {activeTab === '3D - карта' && (
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div className={styles.arrowsBtn}>
                                <div
                                    onClick={() =>
                                        setSelectedFloor((prev) => Math.max(prev - 1, 1))
                                    }
                                >
                                    <img className={styles.arrowLeft} src={arrowLeftTheme} alt="arrow-left" width={24} height={24} />
                                </div>
                                <p>{selectedFloor} Этаж</p>
                                <div
                                    onClick={() =>
                                        setSelectedFloor((prev) => Math.min(prev + 1, maxFloor))
                                    }
                                >
                                    <img className={styles.arrowRight} src={arrowRightTheme} alt="arrow-right" width={24} height={24} />
                                </div>
                            </div>

                            <BarMap floor={selectedFloor} />

                        </div>
                    )}
                    <TableList />
                    <Button
                        className={styles.submitReserve}
                        type="blue"
                        text={'Забронировать стол'}
                        onClick={handleOpen}
                    />
                    <Modal open={isOpen} onClose={handleClose} className={styles.modal}>
                        <div className={`${styles.modalContent} ${modalContentTheme}`}>
                            {currentStep === 1 && (
                                <div>
                                    <button onClick={handleClose}>
                                        <img className={styles.closeCrossButton1} src={closeCross} alt="closeBtn" />
                                    </button>
                                    <h1>Бронь стола</h1>
                                    <p>{`Количество человек: ${selectedReservationDate.guestCount}`}</p>
                                    <p>{`Стол №${selectedTable.id}`}</p>
                                    <p>{`Дата: ${convertTimestampToDateString(selectedReservationDate.date)}`}</p>
                                    <p>{`Время: ${selectedReservationDate.time}`}</p>
                                    <div className={styles.buttons}>
                                        <Button
                                            type="realBlue"
                                            text="Забронировать стол"
                                            onClick={reserveTable}
                                        />
                                        {/* type='hollow' */}
                                        {/* <Button
                                            type="realBlue"
                                            text="Закрыть"
                                            onClick={() => setIsOpen(false)}
                                        /> */}
                                    </div>
                                </div>
                            )}
                            {currentStep === 2 && (
                                <div className={`${styles.modalContent} ${modalContentTheme}`}>
                                    <button onClick={handleClose}>
                                        <img className={styles.closeCrossButton2} src={closeCross} alt="closeBtn" />
                                    </button>
                                    <h1>Спасибо!</h1>
                                    <p>{`Стол забронирован для Вас на ${convertTimestampToDateString(selectedReservationDate.date)} в ${selectedReservationDate.time}. Ждём в нашем заведении!`}</p>
                                </div>
                            )}
                        </div>
                    </Modal>
                </div>
                <Footer />
            </div>
        </Suspense>
    )
}

export default ReserveTablePage
