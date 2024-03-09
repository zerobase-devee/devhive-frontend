import { RankDataType } from '@/types/rank/rankDataType'
import achievement1 from 'public/images/achievement/achievement1.png'
import achievement2 from 'public/images/achievement/achievement2.png'
import achievement3 from 'public/images/achievement/achievement3.png'
import achievement4 from 'public/images/achievement/achievement4.png'
import achievement5 from 'public/images/achievement/achievement5.png'

export const rankData: RankDataType[] = [
  {
    userId: 1,
    nickName: '개발자',
    profileImage: null,
    rankPoint: 580,
    userBadges: [
      {
        badgeDto: {
          id: 0,
          image: achievement1,
          name: '매너왕',
        },
        score: 20,
      },
      {
        badgeDto: {
          id: 1,
          image: achievement2,
          name: '재능기부왕',
        },
        score: 40,
      },
      {
        badgeDto: {
          id: 2,
          image: achievement4,
          name: '소통왕',
        },
        score: 50,
      },
      {
        badgeDto: {
          id: 3,
          image: achievement3,
          name: '마감왕',
        },
        score: 60,
      },
      {
        badgeDto: {
          id: 4,
          image: achievement5,
          name: '척척박사',
        },
        score: 80,
      },
    ],
  },
  {
    userId: 2,
    nickName: '미술관',
    profileImage: achievement1,
    rankPoint: 400,
    userBadges: [
      {
        badgeDto: {
          id: 0,
          image: achievement1,
          name: '매너왕',
        },
        score: 20,
      },
      {
        badgeDto: {
          id: 1,
          image: achievement2,
          name: '재능기부왕',
        },
        score: 0,
      },
      {
        badgeDto: {
          id: 2,
          image: achievement4,
          name: '소통왕',
        },
        score: 20,
      },
      {
        badgeDto: {
          id: 3,
          image: achievement3,
          name: '마감왕',
        },
        score: 20,
      },
      {
        badgeDto: {
          id: 4,
          image: achievement5,
          name: '척척박사',
        },
        score: 10,
      },
    ],
  },
  {
    userId: 3,
    nickName: 'here',
    profileImage: null,
    rankPoint: 300,
    userBadges: [
      {
        badgeDto: {
          id: 0,
          image: achievement1,
          name: '매너왕',
        },
        score: 20,
      },
      {
        badgeDto: {
          id: 1,
          image: achievement2,
          name: '재능기부왕',
        },
        score: 30,
      },
      {
        badgeDto: {
          id: 2,
          image: achievement4,
          name: '소통왕',
        },
        score: 50,
      },
      {
        badgeDto: {
          id: 3,
          image: achievement3,
          name: '마감왕',
        },
        score: 10,
      },
      {
        badgeDto: {
          id: 4,
          image: achievement5,
          name: '척척박사',
        },
        score: 80,
      },
    ],
  },
  {
    userId: 4,
    nickName: '테스트',
    profileImage: null,
    rankPoint: 100,
    userBadges: [
      {
        badgeDto: {
          id: 0,
          image: achievement1,
          name: '매너왕',
        },
        score: 20,
      },
      {
        badgeDto: {
          id: 1,
          image: achievement2,
          name: '재능기부왕',
        },
        score: 30,
      },
      {
        badgeDto: {
          id: 2,
          image: achievement4,
          name: '소통왕',
        },
        score: 50,
      },
      {
        badgeDto: {
          id: 3,
          image: achievement3,
          name: '마감왕',
        },
        score: 10,
      },
      {
        badgeDto: {
          id: 4,
          image: achievement5,
          name: '척척박사',
        },
        score: 80,
      },
    ],
  },
  {
    userId: 5,
    nickName: '오르락내리락',
    profileImage: null,
    rankPoint: 80,
    userBadges: [
      {
        badgeDto: {
          id: 0,
          image: achievement1,
          name: '매너왕',
        },
        score: 0,
      },
      {
        badgeDto: {
          id: 1,
          image: achievement2,
          name: '재능기부왕',
        },
        score: 0,
      },
      {
        badgeDto: {
          id: 2,
          image: achievement4,
          name: '소통왕',
        },
        score: 0,
      },
      {
        badgeDto: {
          id: 3,
          image: achievement3,
          name: '마감왕',
        },
        score: 0,
      },
      {
        badgeDto: {
          id: 4,
          image: achievement5,
          name: '척척박사',
        },
        score: 80,
      },
    ],
  },
]
