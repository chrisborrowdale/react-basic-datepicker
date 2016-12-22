import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { format } from 'date-fns';
import Calendar from './Calendar';

export default class Datepicker extends Component {
  constructor(props) {
    super(props);
    this.handleCalendarVisibility = this.handleCalendarVisibility.bind(this);
    this.dateChange = this.dateChange.bind(this);

    this.state = {
      showCalendar: false,
      selectedDate: this.props.startDate,
    };
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside.bind(this), false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside.bind(this), false);
  }

  handleClickOutside(e) {
    const calendar = ReactDOM.findDOMNode(this.calendar);

    if (e.target.contains(calendar)) {
      this.setState({ showCalendar: false });
    }
  }

  dateChange(selectedDate) {
    this.props.handleDateChange()
    this.setState({
      selectedDate,
      showCalendar: false,
    });
  }

  handleCalendarVisibility() {
    this.setState({
      showCalendar: !this.state.showCalendar,
    });
  }

  render() {
    return (
      <div>
        <input
          name={this.props.datepickerName}
          className={this.props.datepickerClassName}
          id={this.props.datepickerId}
          onFocus={this.handleCalendarVisibility}
          value={format(this.state.selectedDate, this.props.dateFormat)}
          readOnly
        />

        { this.state.showCalendar &&
          <Calendar
            ref={calendar => (this.calendar = calendar)}
            startDate={this.state.selectedDate}
            dateChange={this.dateChange}
            dateChange={this.dateChange}
          />
        }
      </div>
    );
  }
}

Datepicker.propTypes = {
  dateFormat: React.PropTypes.string,
  startDate: React.PropTypes.instanceOf(Date).isRequired,
  datepickerName: React.PropTypes.string,
  datepickerId: React.PropTypes.string,
  datepickerClassName: React.PropTypes.string,
};

Datepicker.defaultProps = {
  dateFormat: 'DD-MM-YYYY',
  startDate: new Date(),
  datepickerName: 'react-simple-datepicker',
  datepickerId: 'react-simple-datepicker',
  datepickerClassName: 'react-simple-datepicker-input',
};
