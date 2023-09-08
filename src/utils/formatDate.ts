const convertToKoreanTime = (utcDateTime: string) => {
  const date = new Date(utcDateTime)
  date.setHours(date.getHours() + 9)
  return date
}

export const formatDateToYYYYMMDD = (dateTime: string) => {
  const koreanTime = convertToKoreanTime(dateTime)
  const date = new Date(koreanTime)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export const formatDatePost = (dateTime: string) => {
  const today = new Date().getTime()
  const koreanTime = convertToKoreanTime(dateTime)
  const createdDate = new Date(koreanTime).getTime()
  const diff = today - createdDate

  if (diff < 60 * 1000) {
    return '방금 전'
  } else if (diff < 60 * 60 * 1000) {
    const minutes = Math.floor(diff / (60 * 1000))
    return `${minutes}분 전`
  } else if (diff < 24 * 60 * 60 * 1000) {
    const hours = Math.floor(diff / (60 * 60 * 1000))
    return `${hours}시간 전`
  } else if (diff <= 7 * 24 * 60 * 60 * 1000) {
    const days = Math.floor(diff / (24 * 60 * 60 * 1000))
    return `${days}일 전`
  } else {
    return formatDateToYYYYMMDD(dateTime)
  }
}

export const calculateDday = (deadline: string) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const target = new Date(convertToKoreanTime(deadline))
  target.setHours(0, 0, 0, 0)
  const day = 24 * 60 * 60 * 1000
  const diffDays = Math.ceil((target.getTime() - today.getTime()) / day)

  if (diffDays === 0) {
    return 'D-day'
  } else if (diffDays > 0) {
    return `D-${diffDays}`
  } else {
    return '모집이 완료되었습니다.'
  }
}

export const formatDateForSending = (deadline: string) => {
  const today = new Date()
  const days = parseInt(deadline)
  const futureDate = new Date(today.getTime() + days * 24 * 60 * 60 * 1000)
  const offset = 1000 * 60 * 60 * 9
  const koreaDate = new Date(new Date(futureDate).getTime() + offset)

  return koreaDate.toISOString().slice(0, 19).replace('T', ' ')
}
