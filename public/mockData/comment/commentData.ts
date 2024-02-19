import { CommentDataType } from '@/types/project/commentDataType'

export const commentMockData: CommentDataType[] = [
  {
    commentId: 0,
    userDto: {
      userId: 0,
      nickName: '개발자',
      profileImage: null,
    },
    createDate: '2024-02-19',
    modifyDate: '2024-02-19',
    replies: [
      {
        replyId: 0,
        userDto: {
          userId: 1,
          nickName: '유저1',
          profileImage: null,
        },
        createDate: '2024-02-19',
        modifyDate: '2024-02-19',
        content: '신청해주세요.',
      },
    ],
    content: '저도 하고 싶어요.',
  },
]
