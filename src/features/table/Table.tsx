import React, { useState } from 'react'
import styles from './styles.module.scss'
import { TableData } from '../../shared/types'
import { twoPersonTableLight, twoPersonTableDark } from '../../shared/assets'
import { tableCapacityCases } from '../../shared/constants'
import { useTheme } from '../../shared/ui/themeContext/ThemeContext'

type Props = {
  info: TableData
  isSelected: boolean
  onClick: () => void
}
const Table = ({ info, isSelected, onClick }: Props) => {
  const { id, capacity, location, status } = info

  const getAvailabilityColor = () => {
    switch (status) {
      case 'free':
        return 'rgba(0, 211, 34, 1)'
      case 'reserved':
        return 'orange'
      case 'occupied':
        return 'red'
    }
  }

  const { theme } = useTheme();
  const rootClassName = theme === 'dark' ? styles.darkRoot : styles.lightRoot;
  const mainClassName = theme === 'dark' ? styles.darkMain : styles.lightMain;
  const imgTableTheme  = theme === 'dark' ? twoPersonTableDark : twoPersonTableLight;

  return (
    <div className={`${styles.root} ${rootClassName}`}>
      <div
        className={`${styles.main} ${isSelected ? styles.selected : ''} ${mainClassName}`}
        onClick={onClick}
      >
        <div className={styles.tableInfo}>
          <div className={styles.tableInfoTitle}>
            <div
              className={styles.availability}
              style={{ backgroundColor: getAvailabilityColor() }}
            />
            <h1>{`Стол №${id}`.toLocaleUpperCase()}</h1>
          </div>
          <div className={styles.tableDetails}>
            <p>
              {`Стол на ${capacity} ${tableCapacityCases.get(capacity)}`}
              <span>|</span>
              {`${location} этаж`}
            </p>
          </div>
        </div>
        <div className={styles.table}>
          <img src={imgTableTheme} />
        </div>
      </div>
    </div>
  )
}

export default Table
