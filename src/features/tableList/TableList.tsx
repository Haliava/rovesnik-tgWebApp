import React, { useState } from 'react'
import { TableData } from '../../shared/types'
import Table from '../table'
import { mockAvailableTables } from '../../shared/constants'
import styles from './styles.module.scss'
import { List } from '@mui/material'

const TableList = () => {
  const availableTables: TableData[] = mockAvailableTables // useSelector(selectAvailableTables)
  const [selectedTableId, setSelectedTableId] = useState<number | null>(null)

  const handleTableClick = (tableId: number) => {
    setSelectedTableId((prevSelectedTableId) =>
      prevSelectedTableId === tableId ? null : tableId,
    )
  }

  return (
    <div className={styles.root}>
      <List style={{ maxHeight: '100%', overflow: 'auto' }}>
        {availableTables.map((table) => (
          <Table
            key={table.id}
            info={table}
            isSelected={table.id === selectedTableId}
            onClick={() => handleTableClick(table.id)}
          />
        ))}
      </List>
    </div>
  )
}

export default TableList
