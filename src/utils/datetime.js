import moment from 'moment';

// CONVERT
export function convertSecond2010ToDateTime (secs) {
  let date = moment([2010, 0, 1, 0, 0, 0, 0]).add(secs, 'seconds');
  return date;
}

export function convertDateTimeToSecond2010 (date) {
  let mSecond2010 = moment([2010, 0, 1, 0, 0, 0, 0]).unix();
  let mSecondDate = moment(date).unix();

  return (mSecondDate - mSecond2010);
}

export function convertSecondToDateTime (secs) {
  return convertSecond2010ToDateTime(secs);
}

export function convertSecondToRelativeTime (secs) {
  return convertSecond2010ToDateTime(secs).locale('vi').fromNow();
}

export function getBeginOfDayAsSecond (date) {
  let startOfDate = moment(date).startOf('day');
  let seconds = convertDateTimeToSecond2010(startOfDate);
  let test = convertSecond2010ToDateTime(seconds);
  return seconds;
}

export function getEndOfDayAsSecond (date) {
  let endOfDate = moment(date).endOf('day');
  let seconds = convertDateTimeToSecond2010(endOfDate);
  let test = convertSecond2010ToDateTime(seconds);
  return seconds;
}

export function convertGMTToLocalTime (gmtString) {
  return moment(gmtString).add(7, 'hours');
}

// FORMAT
export function formatSecondToGPSTime (secs) {
  if (secs > 0) {
    return convertSecond2010ToDateTime(secs).format('YYYY-MM-DD, HH:mm:ss');
  }
  return '';
}

export function formatSecondToYYMMDD (secs) {
  return convertSecond2010ToDateTime(secs).format('YYYY-MM-DD');
}

export function formatSecondToHHmm (secs) {
  return convertSecond2010ToDateTime(secs).format('HH:mm');
}

export function formatSecondToDuration (totalSeconds) {

  if (totalSeconds > 0) {
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    let result = '';

    if (hours > 0) {
      result += `${hours}h `;
    }
    if (minutes > 0) {
      result += `${minutes}m `;
    }
    if (seconds > 0) {
      result += `${seconds}s`;
    }

    return result;
  } else {
    return '---';
  }
}

export function formatGMTToLocalTime (gmtString) {
  if (gmtString) {
    return convertGMTToLocalTime(gmtString).format('YYYY-MM-DD HH:mm:ss');
  }
  return '';
}
