import React from 'react'
import Datepicker from '../src/Datepicker'
import Calendar from '../src/Calendar'
import { mount } from 'enzyme';
import { format, getDaysInMonth } from 'date-fns'

let datepicker

beforeEach(() => {
  datepicker = mount(<Datepicker />)
});

test('calendar should be hidden by default', () => {
  expect(datepicker.state().showCalendar).toBeFalsy()
});

test('selecing a date updates date state and hides component', () => {
  datepicker.instance().dateChange('Thu Dec 01 2019 00:00:00 GMT+0000 (GMT)')
  expect(datepicker.state().selectedDate).toEqual('Thu Dec 01 2019 00:00:00 GMT+0000 (GMT)')
  expect(datepicker.state().showCalendar).toBeFalsy()
});

test('handleCalendarVisibility updates visibility of component', () => {
  datepicker.instance().handleCalendarVisibility()
  expect(datepicker.state().showCalendar).toBeTruthy()

  datepicker.instance().handleCalendarVisibility()
  expect(datepicker.state().showCalendar).toBeFalsy()
});
