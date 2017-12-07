import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

function DateFormat({ date, format }) {
  const str = moment(date).format(format);
  return <time dateTime={str}>{str}</time>;
}

DateFormat.defaultProps = {
  format: 'YYYY/MM/DD'
};

DateFormat.propTypes = {
  date: PropTypes.string.isRequired,
  format: PropTypes.string
};

export default DateFormat;
