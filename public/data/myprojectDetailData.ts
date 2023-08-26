import { MyprojectDetailDataType } from '@/types/mypageDataType'

export const myprojectDetailData: MyprojectDetailDataType[] = [
  {
    userId: 1,
    leader: true,
    projectId: 1,
    projectName: 'Sample Project',
    projectStatus: '프로젝트완료',
    deadline: '2023-01-01',
    startDate: '2023-01-01',
    endDate: '2023-12-31',
    totalAverageScore: 21.5,
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
      {
        userId: 3,
        nickname: '되나요',
        profileImage: null,
      },
    ],
    projectExitVote: null,
    reviewerId: [3],
  },
  {
    userId: 3,
    leader: false,
    projectId: 2,
    projectName: 'Sample Project11111',
    projectStatus: '팀원모집중',
    deadline: '2023-12-31',
    startDate: null,
    endDate: null,
    totalAverageScore: null,
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
      {
        userId: 3,
        nickname: '되나요',
        profileImage: null,
      },
    ],
    projectExitVote: {
      targetUserId: 3,
      createdDate: '2023-08-26T10:15:30',
      votedMemberList: [
        {
          userId: 1,
          isVoted: true,
        },
        {
          userId: 2,
          isVoted: false,
        },
      ],
    },
    reviewerId: [],
  },
]
