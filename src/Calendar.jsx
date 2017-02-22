import React, { Component } from 'react';
import { format, getDaysInMonth, addMonths, subMonths, isBefore, isEqual } from 'date-fns';

export default class Calendar extends Component {
  constructor(props) {
    super(props);

    this.daysOfMonth = this.daysOfMonth.bind(this);
    this.nextMonth = this.nextMonth.bind(this);
    this.previousMonth = this.previousMonth.bind(this);
    this.handleDateSelected = this.handleDateSelected.bind(this);

    this.state = {
      date: this.props.startDate,
      selectedDate: this.props.startDate,
    };
  }

  nextMonth() {
    this.setState({ date: addMonths(this.state.date, 1) });
  }

  previousMonth() {
    this.setState({ date: subMonths(this.state.date, 1) });
  }

  handleDateSelected(evt) {
    const dateBefore = !isBefore(evt.target.dataset.date, new Date(format(this.props.minDate, 'MM-DD-YYYY')));
    
    if (dateBefore) {
      this.setState({
        selectedDate: new Date(format(evt.target.dataset.date, 'MM-DD-YYYY')),
      });

      this.props.dateChange(new Date(format(evt.target.dataset.date, 'MM-DD-YYYY')));
    }
  }

  daysOfMonth() {
    const daysOfMonth = [];
    const daysInMonth = getDaysInMonth(this.state.date) + 1;

    for (let dateIndex = 1; dateIndex < daysInMonth; dateIndex += 1) {
      const isDisabled = isBefore(
        new Date(format(this.state.date, `MM-${dateIndex}-YYYY`)),
        new Date(format(this.props.minDate, 'MM-DD-YYYY'))
      );

      const date = isEqual(
        new Date(format(this.state.selectedDate, `MM-${dateIndex}-YYYY`)),
        new Date(format(this.state.date, 'MM-DD-YYYY'))
      );

      daysOfMonth.push(
        <button
          type="button"
          key={dateIndex}
          className={`react-datepicker-date ${date ? 'react-datepicker-date-active' : ''} ${isDisabled ? 'react-datepicker-date-disabled' : ''}`}
          onClick={this.handleDateSelected}
          data-date={new Date(format(this.state.date, `MM-${dateIndex}-YYYY`))}
        >
          {dateIndex}
        </button>
      );
    }

    return daysOfMonth;
  }

  render() {
    const days = this.daysOfMonth().map(d => d);

    return (
      <div className="react-datepicker">
        <div className="react-datepicker-controls">
          <button type="button" className="react-datepicker-previous" onClick={this.previousMonth}>
            {String(this.props.prevButtonLabel)}
          </button>
          <div className="react-datepicker-month">
            {format(this.state.date, 'MMMM YYYY')}
          </div>
          <button type="button" className="react-datepicker-next" onClick={this.nextMonth}>
            <span>{this.props.nextButtonLabel}</span>
          </button>
        </div>
        <div className="react-datepicker-dates">
          { days }
        </div>
      </div>
    );
  }
}

Calendar.defaultProps = {
  dateFormat: 'DD-MM-YYYY',
  startDate: new Date(),
  minDate: new Date(),
  prevButtonLabel: String.fromCharCode(8592),
  nextButtonLabel: String.fromCharCode(8594),
};

Calendar.propTypes = {
  dateFormat: React.PropTypes.string.isRequired,
  startDate: React.PropTypes.instanceOf(Date).isRequired,
  minDate: React.PropTypes.instanceOf(Date).isRequired,
  prevButtonLabel: React.PropTypes.string,
  nextButtonLabel: React.PropTypes.string,
  dateChange: React.PropTypes.func,
};
