import React from 'react'
import styles from './styles.module.scss'
import descriptionStyles from './styles2.module.scss'
import { Optional, TEvent, Timestamp } from '../../shared/types'
import classNames from 'classnames'
import { arrow } from '../../shared/assets'
import { convertTimestampToDateString } from '../../shared/utils'
import { useTheme } from '../../shared/ui/themeContext/ThemeContext'

type Props = {
    data: Pick<TEvent, 'datetime' | 'short_name' | 'place' | 'age_restriction'>
    className?: string
    fullWidth?: boolean
    cardType: 'base' | 'description' | 'userPage',
}
const EventInfoText = ({ data, className, cardType = 'base' }: Props) => {
    const { datetime, short_name, place, age_restriction } = data;
    const date = datetime.split('T')[0] as Timestamp;

    const { theme } = useTheme();
    const themeClass = theme === 'dark' ? styles.darkTheme : styles.lightTheme;

    return (
        <div className={classNames(className, themeClass, cardType === 'description' ? descriptionStyles.root : styles.root)}>
            <div className={cardType === 'description' ? descriptionStyles.rootName : styles.rootName}>
                <h1>{short_name}</h1>
            </div>
            <div className={cardType === 'description' ? descriptionStyles.rootInfo: styles.rootInfo}>
                <p>
                    {convertTimestampToDateString(date)}<span className={styles.line}>|</span>{place}
                </p>
            </div>
            <span>
                    {
                        (cardType === 'description') ? 
                            <img src={arrow} alt='arrow' style={{backgroundSize: 'cover'}} /> : 
                            <span>{age_restriction}+</span>
                    }
            </span>
        </div>
    )
}

export default EventInfoText