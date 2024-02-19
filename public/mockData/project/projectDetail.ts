import { ProjectDetailDataType } from '@/types/project/projectDataType'
import techStackImg1 from '/public/images/techStack/javascript.png'
import techStackImg2 from '/public/images/techStack/React.png'
import techStackImg3 from '/public/images/techStack/typescript.png'

export const projectDetialData: ProjectDetailDataType = {
  status: 'RECRUITING',
  projectTitle: '캠핑 관련 사이드 프로젝트 팀원 모집합니다.',
  createDate: '2024-02-19',
  modifiedDate: null,
  viewCount: 150,
  recruitmentType: 'ONLINE',
  region: null,
  developmentType: 'FRONTEND',
  recruitmentNum: 4,
  deadline: '2024-02-29',
  projectName: '캠핑',
  techStacks: [
    {
      id: 0,
      image: techStackImg1,
      name: 'Javascript',
    },
    {
      id: 1,
      image: techStackImg2,
      name: 'React',
    },
    {
      id: 2,
      image: techStackImg3,
      name: 'Typescript',
    },
  ],
  content: '<p>같이 프로젝트 하실 팀원 구해요.</p>',
  writerInfo: {
    userId: 1,
    nickName: '유저1',
    profileImage: null,
  },
  projectMembers: [
    {
      userId: 1,
      nickName: '유저1',
      profileImage: null,
    },
    {
      userId: 2,
      nickName: '유저2',
      profileImage: null,
    },
  ],
  userInfo: null,
  applyStatus: null,
  bookmarkId: null,
}
