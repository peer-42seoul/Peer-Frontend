import { NextResponse } from 'next/server'

const convDateFormat = (date: Date) => {
  // '2023년 10월 11일 09:12' 형식으로 변환
  console.log(date)
  const year = date.getFullYear()
  console.log(year)
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
  const minute =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()

  return `${year}년 ${month}월 ${day}일 ${hour}:${minute}`
}

const data = {
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
        msgId: 11,
        userId: 28109,
        date: convDateFormat(new Date('2023-11-07T10:00:00')),
        content: 'ae-jeyoon, 오늘 영화를 볼만한 추천이 있을까요?',
        isEnd: false,
      },

      {
        msgId: 12,
        userId: 1273,
        date: convDateFormat(new Date('2023-11-07T10:05:00')),
        content: '물론입니다! 어떤 장르의 영화를 원하시나요?',
        isEnd: false,
      },

      {
        msgId: 13,
        userId: 28109,
        date: convDateFormat(new Date('2023-11-07T10:10:00')),
        content: '로맨틱 코미디 장르의 영화가 좋아요.',
        isEnd: false,
      },

      {
        msgId: 14,
        userId: 1273,
        date: convDateFormat(new Date('2023-11-07T10:15:00')),
        content: "로맨틱 코미디 중에서 '라라랜드'가 좋은 옵션입니다.",
        isEnd: false,
      },

      {
        msgId: 15,
        userId: 28109,
        date: convDateFormat(new Date('2023-11-07T10:20:00')),
        content: '감사합니다! 어디에서 상영하는지 알 수 있을까요?',
        isEnd: false,
      },

      {
        msgId: 16,
        userId: 1273,
        date: convDateFormat(new Date('2023-11-07T10:25:00')),
        content: '라라랜드는 현재 메가박스에서 상영 중이에요.',
        isEnd: false,
      },
    ],
  },
}

export async function POST() {
  return NextResponse.json(data)
}
