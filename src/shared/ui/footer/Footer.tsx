import React from 'react';
import styles from './styles.module.scss';
import { userPic, rovesnikWhiteLogo } from '../../assets/';
import { currentBarId, footerBarToResourcesMap, logoSizes } from '../../constants';


const Footer = () => {
    const barId: number = currentBarId; 
    const resources = footerBarToResourcesMap.get(barId);
    const logoSrc = resources?.logo;
    const backgroundStyle = { backgroundColor: resources?.background };

    
    const { logoWidth, logoHeight } = logoSizes[barId];


    return (
        <div className={styles.root} style={backgroundStyle}>
            <div className={styles.container}>
                <div className={styles.footerLogo}>
                    <img src={logoSrc} alt='afishaFooter' width={logoWidth} height={logoHeight} />
                </div>
                <div className={styles.footerNav}>
                    <div className={styles.footerText}>
                        <p>Язык</p>
                        <p>Контакты</p>
                        <p>Адрес</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;