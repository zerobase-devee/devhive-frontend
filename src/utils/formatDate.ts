export const formatDateToYYYYMMDD = (dateTime: string) => {
  const date = new Date(dateTime)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export const formatDatePost = (dateTime: string) => {
  const today = new Date().getTime()
  const createdDate = new Date(dateTime).getTime()
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
  const target = new Date(deadline)
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
