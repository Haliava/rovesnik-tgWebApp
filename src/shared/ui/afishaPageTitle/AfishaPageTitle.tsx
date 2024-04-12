import React from "react"
import styles from './styles.module.scss';

type Props = {
    text: string,
}
const AfishaPageTitle = ({text}: Props) => {

    return (
        <div className={styles.title}>
            <p>Афиша событий в {text}</p>
        </div>
    )
};

export default AfishaPageTitle;
