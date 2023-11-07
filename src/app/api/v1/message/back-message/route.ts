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

const singleMsg = {
  msgId: 17,
  userId: 28109,
  date: convDateFormat(new Date('2023-11-07T10:30:00')),
  content: '감사합니다! 다른 추천이 필요하면 물어볼게요.',
  isEnd: false,
}

export async function POST() {
  return NextResponse.json(singleMsg, {
    status: 201,
  })
}
