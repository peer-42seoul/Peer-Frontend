'use client'

import { Box, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import MessageNavigator from '../../../components/MessageNavigator'

interface IUserInformation {
  nickname: string
  profileImage: string
  messageTime: string
  lastContent: string
}

type MessageListProps = {
  data: IUserInformation
  error: undefined
  isLoading: boolean
}
const MessageItem = ({ user }: { user: IUserInformation }) => {
  return (
    <>
      <Typography>{user.nickname}</Typography>
      <Typography>{user.messageTime}</Typography>
      <Typography>{user.lastContent}</Typography>

      <Box
        component="img"
        src={`${user.profileImage}`}
        alt="picture_of_sender"
        width={100}
        height={100}
      />
    </>
  )
}

const MessageList = ({ data, error, isLoading }: MessageListProps) => {
  // const [page, setPage] = useState(1)
  // const [messageList, setMessageList] = useState<IUserInformation[]>([])
  // const [loading, setLoading] = useState(false)
  // const target = useRef(null)

  const userId = 'userzero' // 예시로 문자열 "123" 사용
  const router = useRouter()

  // const fetcher = (url: string) => fetch(url).then((res) => res.json())
  // const { data, error, isLoading } = useSWR(
  //   'http://localhost:4000/message_list?page=1',
  //   defaultGetFetcher,
  // )

  const messageContentHandler = useCallback(() => {
    router.push(`http://localhost:3000/profile/message/${userId}`)
  }, [router])

  // console.log('taget', target)
  // if (target.current) {
  //   alert(target.current)
  // }

  // useEffect(() => {
  //   if (target.current && !observerRef.current) {
  //     let options = { threshold: 0.5 }
  //     observerRef.current = new IntersectionObserver((entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.isIntersecting) {
  //           setPage((prev: number) => prev + 1)
  //           alert(' reached ')
  //         }
  //       })
  //     }, options)
  //   }

  //   if (target.current && observerRef.current) {
  //     observerRef.current.observe(target.current)
  //     //   // return () => {
  //     //   //   if (observerRef.current) {
  //     //   //     observerRef.current.unobserve(target.current)
  //     //   //   }
  //     //   // }
  //   }
  // }, [])

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       console.log('entries: ', entries)
  //       if (entries[0].isIntersecting) {
  //         setPage((prev: number) => prev + 1)
  //         console.log('page number', page)
  //         setLoading(true)
  //       }
  //     },
  //     { threshold: 0.5 },
  //   )

  //   if (target.current) {
  //     console.log('start')
  //     observer.observe(target.current)
  //   }

  //   return () => {
  //     if (target.current) observer.unobserve(target.current)
  //   }
  // }, [target.current])

  // useEffect(() => {
  //   if (loading === true) {
  //     setLoading(false)
  //     console.log('loading', loading)
  //   }
  // }, [loading])
  // const { tdata, terror, tisLoading } = useSWR(
  //   `http://localhost:4000/message_list?page=${page}`,
  //   defaultGetFetcher,
  // )

  if (error) return <Box>데이터 불러오기를 실패하였습니다.</Box>
  if (!data) return <Box>쪽지함이 비었습니다.</Box>
  if (isLoading) return <Box>데이터를 불러오는 중입니다...</Box>

  return (
    // <Container sx={{ height: '90vh' }}>
    <>
      <MessageNavigator title={'쪽지'} messageType={'쪽지'} />
      <Box>
        {data.map((user: IUserInformation, idx: number) => (
          <Box
            sx={{ padding: '16px 0 16px 0' }}
            key={idx}
            onClick={messageContentHandler}
          >
            <MessageItem user={user} />
          </Box>
        ))}
      </Box>
    </>
    // </Container>
  )
}

export default MessageList
