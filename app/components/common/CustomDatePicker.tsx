'use client'

import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

import React, { useState } from 'react'

import DatePicker from 'react-date-picker'
import { Value } from '@/app/types/custom-types';
import styles from './styles/custom-date-picker.module.css'

interface CustomDatePickerProps {
  label: string,
  minDate?: Date,
  maxDate?: Date,
  disabled?: boolean,
  name?: string,
  onChange: (value: Value) => void,
  value: Value,
  error?: string
}

const CustomDatePicker = ({label, onChange, value, error, ...rest}: CustomDatePickerProps) => {
  return (
    <label className="form form-control w-full pb-3">
          <div className='label'>
            <span className='label-text'>{label}</span>
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
            {...rest}
          />
          {error && <span className='text-error text-sm pt-2'>{error}</span>}
    </label>
  )
}

export default CustomDatePicker