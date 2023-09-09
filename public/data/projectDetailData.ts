export const projectDetailData = {
  projectStatus: '팀원모집중',
  projectTitle:
    '프로젝트 게시글 제목입니다다다다다다다다다다다다다다다다다다다다다닫다다다',
  createdDate: '2023-08-24 10:00:00',
  modifiedDate: '2023-08-28 10:00:00',
  viewCount: 200,
  recruitmentType: '오프라인',
  region: '서울',
  developmentType: '백엔드',
  recruitmemtNum: 3,
  deadline: '2023-08-31 10:00:00',
  bookmark: false,
  projectName: 'devHive',
  techStacks: [
    {
      id: 1,
      name: 'javascript',
      image: '/images/techStack/javascript.png',
    },
    {
      id: 2,
      name: 'javascript',
      image: '/images/techStack/javascript.png',
    },
    {
      id: 3,
      name: 'javascript',
      image: '/images/techStack/javascript.png',
    },
    {
      id: 4,
      name: 'javascript',
      image: '/images/techStack/javascript.png',
    },
    {
      id: 5,
      name: 'javascript',
      image: '/images/techStack/javascript.png',
    },
  ],
  content: '<h2>게시글입니다.</h2><p>게시글입니다</p>',
  projectWriter: {
    userId: 1,
    nickname: '야호',
    profileImage: '/images/techStack/javascript.png',
  },
  projectMembers: [
    {
      userId: 2,
      nickname: '야호호호호',
      profileImage: '/images/techStack/javascript.png',
    },
    {
      userId: 3,
      nickname: '야호호호호',
      profileImage: '/images/techStack/javascript.png',
    },
    {
      userId: 4,
      nickname: '야호호호호',
      profileImage: null,
    },
  ],
  commentAndReply: [
    {
      commentId: 1,
      user: {
        userId: 1,
        nickname: '야호호호호',
        profileImage: null,
      },
      comment: '댓글입니다',
      createdDate: '2023-08-26 10:00:00',
      modifiedDate: null,
      replies: [
        {
          replyId: 1,
          user: {
            userId: 3,
            nickname: '야호호호호',
            profileImage: '/images/techStack/javascript.png',
          },
          reply: '대댓글입니다',
          createdDate: '2023-08-26 10:00:00',
          modifiedDate: null,
        },
        {
          replyId: 2,
          user: {
            userId: 3,
            nickname: '야호호호호',
            profileImage: '/images/techStack/javascript.png',
          },
          reply: '대댓글입니다',
          createdDate: '2023-08-26 10:00:00',
          modifiedDate: null,
        },
      ],
    },
    {
      commentId: 2,
      user: {
        userId: 1,
        nickname: '야호호호호',
        profileImage: null,
      },
      comment: '댓글입니다',
      createdDate: '2023-08-26 10:00:00',
      modifiedDate: null,
      replies: [],
    },
  ],
  loginUser: {
    userId: 1,
    nickname: '야호',
    profileImage: '/images/techStack/javascript.png',
  },
  applyStatus: null,
}
