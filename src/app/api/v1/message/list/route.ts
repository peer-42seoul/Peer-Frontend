// TODO : PR 전 반드시 지울 것 - mock data 확인용 mock api
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json([
    {
      targetId: 1,
      targetNickname: 'jeyoon',
      targetProfile: 'https://picsum.photos/200', // URL
      conversationalId: 1, // 대화의 고유 ID
      unreadMsgNumber: 1, // 아직 확인하지 않은 메시지 데이터 수
      latestMsgId: 1, // 최신 메시지 고유 키
      latestContent: '당근당근', // 최신 메시지 내용
      latestDate: '11월 2일', // 최신 메시지 날짜
    },
    {
      targetId: 2,
      targetNickname: 'jeyoon2',
      targetProfile: 'https://picsum.photos/200', // URL
      conversationalId: 10, // 대화의 고유 ID
      unreadMsgNumber: 10, // 아직 확인하지 않은 메시지 데이터 수
      latestMsgId: 10, // 최신 메시지 고유 키
      latestContent: '당근당근당근', // 최신 메시지 내용
      latestDate: '11월 2일', // 최신 메시지 날짜
    },
    {
      targetId: 3,
      targetNickname: 'jeyoon3',
      targetProfile: 'https://picsum.photos/200', // URL
      conversationalId: 20, // 대화의 고유 ID
      unreadMsgNumber: 20, // 아직 확인하지 않은 메시지 데이터 수
      latestMsgId: 20, // 최신 메시지 고유 키
      latestContent: '당근당근당근당근', // 최신 메시지 내용
      latestDate: '11월 2일', // 최신 메시지 날짜
    },
    {
      targetId: 4,
      targetNickname: 'jeyoon4',
      targetProfile: 'https://picsum.photos/200', // URL
      conversationalId: 30, // 대화의 고유 ID
      unreadMsgNumber: 30, // 아직 확인하지 않은 메시지 데이터 수
      latestMsgId: 30, // 최신 메시지 고유 키
      latestContent: '당근당근당근당근당근', // 최신 메시지 내용
      latestDate: '11월 2일', // 최신 메시지 날짜
    },
    {
      targetId: 5,
      targetNickname: 'jeyoon5',
      targetProfile: 'https://picsum.photos/200', // URL
      conversationalId: 40, // 대화의 고유 ID
      unreadMsgNumber: 40, // 아직 확인하지 않은 메시지 데이터 수
      latestMsgId: 40, // 최신 메시지 고유 키
      latestContent: '당근당근당근당근당근당근', // 최신 메시지 내용
      latestDate: '11월 2일', // 최신 메시지 날짜
    },
    {
      targetId: 6,
      targetNickname: 'ae-jeyoon',
      targetProfile: 'https://picsum.photos/200', // URL
      conversationalId: 50, // 대화의 고유 ID
      unreadMsgNumber: 50, // 아직 확인하지 않은 메시지 데이터 수
      latestMsgId: 50, // 최신 메시지 고유 키
      latestContent: '당근', // 최신 메시지 내용
      latestDate: '11월 2일', // 최신 메시지 날짜
    },
  ])
}
