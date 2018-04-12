import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import format from 'date-fns/format'
import Calendar from './Calendar'

function noop() {
  return null
}

function hasOpenHandler(props) {
  return props.externalOpenHandler && props.externalOpenHandler.subscribe && typeof props.externalOpenHandler.subscribe === 'function'
}

export default class Datepicker extends Component {
  constructor(props) {
    super(props)
    this.onOutsideClick = this.onOutsideClick.bind(this)
    this.handleCalendarVisibility = this.handleCalendarVisibility.bind(this)
    this.dateChange = this.dateChange.bind(this)

    this.state = {
      showCalendar: false,
      selectedDate: this.props.startDate,
      usingExternalOpenHandler: hasOpenHandler(this.props)
    }
  }

  componentWillMount() {
    var _this = this
    document.addEventListener('click', this.onOutsideClick, false)
    if (hasOpenHandler(_this.props)) {
      _this.props.externalOpenHandler.subscribe(function(next) {
        _this.handleCalendarVisibility()
      })
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onOutsideClick, false)
  }

  onOutsideClick(event) {
    if (!this.mainNode.contains(event.target) && this.state.showCalendar) {
      this.setState({ showCalendar: false })
    }
  }

  dateChange(selectedDate) {
    if (this.props.handleDateChange) this.props.handleDateChange(selectedDate)
    this.setState({
      selectedDate,
      showCalendar: false
    })
  }

  handleCalendarVisibility() {
    this.setState({
      showCalendar: !this.state.showCalendar
    })
  }

  render() {
    var open = this.state.usingExternalOpenHandler ? noop : this.handleCalendarVisibility
    return (
      <div
        ref={node => {
          this.mainNode = node
        }}
      >
        <input name={this.props.datepickerName} className={this.props.datepickerClassName} id={this.props.datepickerId} onFocus={open} value={format(this.state.selectedDate, this.props.dateFormat)} readOnly />

        {this.state.showCalendar && <Calendar startDate={this.state.selectedDate} dateChange={this.dateChange} minDate={this.props.minDate} />}
      </div>
    )
  }
}

Datepicker.defaultProps = {
  dateFormat: 'DD-MM-YYYY',
  startDate: new Date(),
  datepickerName: 'react-simple-datepicker',
  datepickerId: 'react-simple-datepicker',
  datepickerClassName: 'react-simple-datepicker-input',
};
