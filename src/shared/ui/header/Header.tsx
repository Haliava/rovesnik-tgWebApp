import React from 'react';
import styles from './styles.module.scss';
import { userPic } from '../../assets/';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks/redux';
import { currentBarId, headerBarToLogoMap } from '../../constants';
import { selectCurrentBar } from '../../../entities/bar/barSlice';
import { BarName } from '../../types';
import { useTheme } from '../../ui/themeContext/ThemeContext';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { dorozhkaDarkHeaderLogo, dorozhkaLightHeaderLogo } from '../../assets/';

type Props = {
    type?: 'afisha' | 'reservations'
}

const Header = ({ type = 'afisha' }: Props) => {
    const barId: number = currentBarId;
    let logoSrc = headerBarToLogoMap.get(barId);
    const { theme, toggleTheme } = useTheme();
    const rootClassName = theme === 'dark' ? styles.darkRoot : styles.lightRoot;

    if (barId === 3) {
        logoSrc = theme === 'dark' ? dorozhkaDarkHeaderLogo : dorozhkaLightHeaderLogo;
    }

    return (
        <div className={`${styles.root} ${rootClassName}`}>
            <div className={styles.container}>
                <div className={styles.headerLogo}>
                    <Link to={type === 'afisha' ? "/" : "/reservation"}>
                        <img src={logoSrc} alt='barLogo' />
                    </Link>
                </div>
                <div className={styles.headerNav}>
                    <button onClick={toggleTheme}>
                        {theme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
                    </button>
                    <Link to={type === 'afisha' ? "/my/events" : "/my/reservations"}>
                        <img src={userPic} alt='userPic' />
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default Header;