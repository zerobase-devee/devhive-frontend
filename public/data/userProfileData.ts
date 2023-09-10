import { techStackData } from './techStackData'
import { careerDataList } from './careerData'

export const userProfileData = {
  nickname: '야호',
  isFavorite: true,
  intro: '안녕하세요.',
  profileImage: null,
  exitNum: 3,
  techStacks: techStackData,
  projects: [
    {
      projectName: '프로젝트 이름 11111111111',
      point: 1,
    },
    {
      projectName: '프로젝트 이름 22211111111111',
      point: 20,
    },
  ],
  careers: careerDataList,
  badge: ['매너왕', '소통왕'],
}
