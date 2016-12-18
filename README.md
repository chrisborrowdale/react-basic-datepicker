# React Basic Datepicker

A barebones, no-frills React datepicker.  This was built to scratch my own itch and is very basic, if you want something with a few more features then check out [React Datepicker](https://github.com/Hacker0x01/react-datepicker).

[Check out the demo](https://chrisborrowdale.github.io/react-basic-datepicker/demo/)

## Usage

Render the datepicker and supply any of the props listed below.

`ReactDOM.render(<Datepicker dateFormat="DD/MM/YYYY" />, document.getElementById('react-root'));`

There are basic styles defined in the demo directory.

## Props

- `dateFormat` e.g. DD-MM-YYYY
- `startDate` e.g. `new Date()`
- `minDate` e.g. `new Date(2016, 11)`
- `prevButtonLabel` e.g. 'Previous Month'
- `nextButtonLabel` e.g. 'Next Month'
- `handleDateChange` e.g. set state or do whatever with the date...
- `datepickerName` e.g. `my-date-picker`
- `datepickerId` e.g. `my-date-picker`
- `datepickerClassName` e.g. `my-date-picker`
