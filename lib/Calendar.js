'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _format = require('date-fns/format');

var _format2 = _interopRequireDefault(_format);

var _get_days_in_month = require('date-fns/get_days_in_month');

var _get_days_in_month2 = _interopRequireDefault(_get_days_in_month);

var _add_months = require('date-fns/add_months');

var _add_months2 = _interopRequireDefault(_add_months);

var _sub_months = require('date-fns/sub_months');

var _sub_months2 = _interopRequireDefault(_sub_months);

var _is_before = require('date-fns/is_before');

var _is_before2 = _interopRequireDefault(_is_before);

var _is_equal = require('date-fns/is_equal');

var _is_equal2 = _interopRequireDefault(_is_equal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Calendar = function (_Component) {
  _inherits(Calendar, _Component);

  function Calendar(props) {
    _classCallCheck(this, Calendar);

    var _this = _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call(this, props));

    _this.daysOfMonth = _this.daysOfMonth.bind(_this);
    _this.nextMonth = _this.nextMonth.bind(_this);
    _this.previousMonth = _this.previousMonth.bind(_this);
    _this.handleDateSelected = _this.handleDateSelected.bind(_this);

    _this.state = {
      date: _this.props.startDate,
      selectedDate: _this.props.startDate
    };
    return _this;
  }

  _createClass(Calendar, [{
    key: 'nextMonth',
    value: function nextMonth() {
      this.setState({ date: (0, _add_months2.default)(this.state.date, 1) });
    }
  }, {
    key: 'previousMonth',
    value: function previousMonth() {
      this.setState({ date: (0, _sub_months2.default)(this.state.date, 1) });
    }
  }, {
    key: 'handleDateSelected',
    value: function handleDateSelected(evt) {
      var dateBefore = !(0, _is_before2.default)(evt.target.dataset.date, new Date((0, _format2.default)(this.props.minDate, 'MM/DD/YYYY')));

      if (dateBefore) {
        this.setState({
          selectedDate: new Date((0, _format2.default)(evt.target.dataset.date, 'MM/DD/YYYY'))
        });

        this.props.dateChange(new Date((0, _format2.default)(evt.target.dataset.date, 'MM/DD/YYYY')));
      }
    }
  }, {
    key: 'daysOfMonth',
    value: function daysOfMonth() {
      var daysOfMonth = [];
      var daysInMonth = (0, _get_days_in_month2.default)(this.state.date) + 1;

      for (var dateIndex = 1; dateIndex < daysInMonth; dateIndex += 1) {
        var isDisabled = (0, _is_before2.default)(new Date((0, _format2.default)(this.state.date, 'MM/' + dateIndex + '/YYYY')), new Date((0, _format2.default)(this.props.minDate, 'MM/DD/YYYY')));

        var date = (0, _is_equal2.default)(new Date((0, _format2.default)(this.state.selectedDate, 'MM/' + dateIndex + '/YYYY')), new Date((0, _format2.default)(this.state.date, 'MM/DD/YYYY')));

        daysOfMonth.push(_react2.default.createElement(
          'button',
          { type: 'button', key: dateIndex, className: 'react-datepicker-date ' + (date ? 'react-datepicker-date-active' : '') + ' ' + (isDisabled ? 'react-datepicker-date-disabled' : ''), onClick: this.handleDateSelected, 'data-date': new Date((0, _format2.default)(this.state.date, 'MM/' + dateIndex + '/YYYY')) },
          dateIndex
        ));
      }

      return daysOfMonth;
    }
  }, {
    key: 'render',
    value: function render() {
      var days = this.daysOfMonth().map(function (d) {
        return d;
      });

      return _react2.default.createElement(
        'div',
        { className: 'react-datepicker', style: { display: 'inline-block' } },
        _react2.default.createElement(
          'div',
          { className: 'react-datepicker-controls' },
          _react2.default.createElement(
            'button',
            { type: 'button', className: 'react-datepicker-previous', onClick: this.previousMonth },
            String(this.props.prevButtonLabel)
          ),
          _react2.default.createElement(
            'div',
            { className: 'react-datepicker-month' },
            (0, _format2.default)(this.state.date, 'MMMM YYYY')
          ),
          _react2.default.createElement(
            'button',
            { type: 'button', className: 'react-datepicker-next', onClick: this.nextMonth },
            _react2.default.createElement(
              'span',
              null,
              this.props.nextButtonLabel
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'react-datepicker-dates' },
          days
        )
      );
    }
  }]);

  return Calendar;
}(_react.Component);

exports.default = Calendar;


Calendar.defaultProps = {
  dateFormat: 'DD-MM-YYYY',
  startDate: new Date(),
  minDate: new Date(),
  prevButtonLabel: String.fromCharCode(8592),
  nextButtonLabel: String.fromCharCode(8594)
};