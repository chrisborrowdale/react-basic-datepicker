import React from 'react'
import Calendar from '../src/Calendar'
import { mount } from 'enzyme';
import { format, getDaysInMonth } from 'date-fns'

let calendar

beforeEach(() => {
  calendar = mount(<Calendar />)
});

test('Initialises with todays date if startDate prop is not defined', () => {
  const todaysDate = format(new Date(), calendar.props().dateFormat)
  expect(format(calendar.state().date, calendar.props().dateFormat)).toEqual(todaysDate)
});

test('Date should format to DD-MM-YYYY by default', () => {
  const defaultFormat = 'DD-MM-YYYY'
  expect(calendar.props().dateFormat).toEqual(defaultFormat)
});

test('Date can be formatted by prop', () => {
  const calendar = mount(<Calendar dateFormat="YYYY-MM-DD" />)
  expect(format(calendar.state().date, 'YYYY-MM-DD')).toEqual(format(new Date(), 'YYYY-MM-DD'))
});

test('Initialises with startDate prop if defined', () => {
  const date = new Date(2010, 0, 10)
  const calendar = mount(<Calendar startDate={date} />)
  expect(calendar.state().date).toEqual(date)
});

test('Displays the correct amount of days', () => {
  const date = new Date(2016, 11)
  const calendar = mount(<Calendar startDate={date} />)
  expect(getDaysInMonth(calendar.state().date)).toEqual(31)
});

test('Can move to the next month', () => {
  const date = new Date(2016, 10)
  const calendar = mount(<Calendar startDate={date} />)
  calendar.instance().nextMonth(date)
  expect(calendar.state().date).toEqual(new Date(2016, 11))
});

test('Can move to the previous month', () => {
  const date = new Date(2016, 10)
  const calendar = mount(<Calendar startDate={date} />)
  calendar.instance().previousMonth(date)
  expect(calendar.state().date).toEqual(new Date(2016, 9))
});

test('Selecting a date updates state if current or future date', () => {
  const node = {
    target: {
      dataset: {
        date: 'Thu Dec 01 2019 00:00:00 GMT+0000 (GMT)'
      }
    }
  }

  const calendar = mount(<Calendar dateChange={jest.fn()} />)

  calendar.instance().handleDateSelected(node)
  expect(calendar.state().selectedDate).toEqual(new Date(2019, 11))
});

test('Selecting a date does not update state if < minDate', () => {
  const node = {
    target: {
      dataset: {
        date: 'Thu Dec 01 2012 00:00:00 GMT+0000 (GMT)'
      }
    }
  }

  const date = new Date()
  const calendar = mount(<Calendar startDate={date} dateChange={jest.fn()} />)

  calendar.instance().handleDateSelected(node)
  expect(calendar.state().selectedDate).toEqual(date)
});
