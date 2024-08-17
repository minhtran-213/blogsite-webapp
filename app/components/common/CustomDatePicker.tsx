'use client'
import React, { useState } from 'react'
import DatePicker from 'react-date-picker'
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import styles from './styles/custom-date-picker.module.css'

interface CustomDatePickerProps {
  labelName: string,
  minDate?: Date,
  maxDate?: Date,
  disabled?: boolean,
}

type ValuePiece = Date | null

type Value = ValuePiece | [ValuePiece, ValuePiece]

const CustomDatePicker = ({labelName}: CustomDatePickerProps) => {
  const [value, onChange] = useState<Value>()
  return (
    <label className="form form-control w-full pb-3">
          <div className='label'>
            <span className='label-text'>{labelName}</span>
          </div>
          <DatePicker
            onChange={onChange}
            value={value}
            format='dd/MM/yyyy'
            dayPlaceholder='dd'
            monthPlaceholder='MM'
            yearPlaceholder='yyyy'
            clearIcon={null}
            className={styles.datePicker}
          />
      </label>
  )
}

export default CustomDatePicker