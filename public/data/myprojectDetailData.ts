import { MyprojectDetailDataType } from '@/types/mypageDataType'

export const myprojectDetailData: MyprojectDetailDataType[] = [
  {
    projectId: 1,
    projectName: 'Sample Project',
    projectStatus: '팀원모집중',
    deadline: '2023-08-28',
    startDate: '2023-01-01',
    endDate: '2023-12-31',
    totalAverageScore: 4.5,
    leader: true,
    projectMembers: [
      {
        userId: 1,
        nickname: '야호',
        profileImage: null,
      },
      {
        userId: 2,
        nickname: '라라라랄라',
        profileImage: '/images/techStack/javascript.png',
      },
    ],
  },
  {
    projectId: 2,
    projectName: 'Sample Project11111',
    projectStatus: '팀원모집중',
    deadline: '2023-12-31',
    startDate: null,
    endDate: null,
    totalAverageScore: null,
    leader: true,
    projectMembers: [
      {
        userId: 1,
        nickname: '야호',
        profileImage: '/images/techStack/javascript.png',
      },
      {
        userId: 2,
        nickname: '라라라랄라',
        profileImage: null,
      },
    ],
  },
]
