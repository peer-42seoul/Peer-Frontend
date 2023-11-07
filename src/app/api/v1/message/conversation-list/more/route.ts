import { NextResponse } from 'next/server'

const convDateFormat = (date: Date) => {
  // '2023년 10월 11일 09:12' 형식으로 변환
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
  const minute =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()

  return `${year}년 ${month}월 ${day}일 ${hour}:${minute}`
}

const oldData = {
  MsgList: {
    MsgOwner: {
      userId: 28109,
      userNickname: 'jeyoon',
      userProfile: '200',
    },
    MsgTarget: {
      userId: 1273,
      userNickname: 'ae-jeyoon',
      userProfile: '200',
    },
    Msg: [
      {
        msgId: 1,
        userId: 28109,
        date: convDateFormat(new Date('2023-11-07T09:00:00')),
        content: '안녕하세요!',
        isEnd: true,
      },

      {
        msgId: 2,
        userId: 1273,
        date: convDateFormat(new Date('2023-11-07T09:05:00')),
        content: '안녕하세요! 어떤 도움이 필요하신가요?',
        isEnd: false,
      },

      {
        msgId: 3,
        userId: 28109,
        date: convDateFormat(new Date('2023-11-07T09:10:00')),
        content: '오늘 날씨는 어때요?',
        isEnd: false,
      },

      {
        msgId: 4,
        userId: 1273,
        date: convDateFormat(new Date('2023-11-07T09:15:00')),
        content: '현재 날씨는 맑고 기온은 25도입니다.',
        isEnd: false,
      },

      {
        msgId: 5,
        userId: 28109,
        date: convDateFormat(new Date('2023-11-07T09:20:00')),
        content: '내일 비가 올까요?',
        isEnd: false,
      },

      {
        msgId: 6,
        userId: 1273,
        date: convDateFormat(new Date('2023-11-07T09:25:00')),
        content: '내일은 비가 올 것으로 예상됩니다. 우산을 챙기세요.',
        isEnd: false,
      },

      {
        msgId: 7,
        userId: 28109,
        date: convDateFormat(new Date('2023-11-07T09:30:00')),
        content: '어떻게 식사 메뉴를 고를까요?',
        isEnd: false,
      },

      {
        msgId: 8,
        userId: 1273,
        date: convDateFormat(new Date('2023-11-07T09:35:00')),
        content:
          '식사 메뉴를 고를 때, 원하는 음식 종류나 식사 시간을 고려하여 레스토랑을 선택하는 것이 좋아요.',
        isEnd: false,
      },

      {
        msgId: 9,
        userId: 28109,
        date: convDateFormat(new Date('2023-11-07T09:40:00')),
        content: '감사합니다!',
        isEnd: false,
      },

      {
        msgId: 10,
        userId: 1273,
        date: convDateFormat(new Date('2023-11-07T09:45:00')),
        content: '감사합니다! 더 도움이 필요하시면 언제든 물어봐 주세요.',
        isEnd: false,
      },
    ],
  },
}

export async function POST() {
  for (const msg of oldData.MsgList.Msg) {
    msg.date = convDateFormat(new Date(msg.date))
  }

  return NextResponse.json(oldData)
}
