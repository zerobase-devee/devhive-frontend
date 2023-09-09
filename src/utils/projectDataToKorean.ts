export const isRegion = (region: string | null) => {
  if (region === null) {
    return
  } else {
    return '・' + region
  }
}

export const translateStatusToKorean = (status: string) => {
  if (status === 'RECRUITING' || status === 'RE_RECRUITING') {
    return '모집중'
  } else if (status === 'COMPLETE') {
    return '프로젝트완료'
  } else {
    return '모집완료'
  }
}

export const translateRecruitmentToKorean = (recruitmentType: string) => {
  if (recruitmentType === 'ONLINE') {
    return '온라인'
  } else if (recruitmentType === 'OFFLINE') {
    return '오프라인'
  } else {
    return '온/오프라인'
  }
}

export const translateDevelopmentToKorean = (developmentType: string) => {
  if (developmentType === 'FRONTEND') {
    return '프론트엔드'
  } else if (developmentType === 'BACKEND') {
    return '백엔드'
  } else if (developmentType === 'FULLSTACK') {
    return '풀스택'
  } else {
    return '전체'
  }
}
