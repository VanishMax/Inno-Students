import moment from 'moment'

export default (date, lang) => {
  let parsed = moment(date, 'YYYY-MM-DD HH:mm')
  let output = ''
  if (moment().diff(parsed, 'seconds') < 60) {
    output = lang === 'ru' ? 'сейчас' : 'now'
  } else if (moment().diff(parsed, 'minutes') < 60) {
    output = moment().diff(parsed, 'minutes') + (lang === 'ru' ? ' минут назад' : ' minutes ago')
  } else if (moment().diff(parsed, 'hours') < 12 || parsed.isSame(moment(), 'day')) {
    output = parsed.locale(lang).fromNow()
  } else if(parsed.isSame(moment(), 'year')) {
    output = parsed.locale(lang).format('D MMMM')
  } else {
    output = parsed.locale(lang).format('D MMMM, YYYY')
  }

  return output
}
