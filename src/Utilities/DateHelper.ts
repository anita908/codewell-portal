import moment from 'moment'

class DateHelper {
  public static convertStringToMoment(
    dateString: string,
    isUTC: boolean = true
  ): moment.Moment | null {
    if (!dateString) {
      return null
    } else {
      return isUTC ? moment.utc(dateString) : moment(dateString)
    }
  }

  public static convertToUtcDate(offsettedLocalDate: moment.Moment): moment.Moment | null {
    if (!offsettedLocalDate || offsettedLocalDate.isUTC()) {
      return offsettedLocalDate
    } else {
      return moment.utc(offsettedLocalDate)
    }
  }
}

export default DateHelper
