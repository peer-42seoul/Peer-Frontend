import { Stack, Typography } from '@mui/material'
import useAxiosWithAuth from '@/api/config'
import 'react-grid-layout/css/styles.css'
import { ITeamDnDLayout, SizeType, WidgetType } from '@/types/ITeamDnDLayout'
import { useEffect, useState } from 'react'
import ReactGridLayout from 'react-grid-layout'
import useSWRMutation from 'swr/mutation'
import WidgetsRender from './WidgetsRender'
import WidgetList from '@/app/teams/[id]/panel/WidgetList'
import useDnDStore from '@/states/useDnDStore'
import { useParams } from 'next/navigation'

export const sizeRatio = {
  S: { w: 1, h: 1 },
  M: { w: 2, h: 1 },
  L: { w: 2, h: 2 },
}

const TeamDnD = ({ id }: { id: string }) => {
  const { setStoredWidgets, setTeamId } = useDnDStore()
  const [edit, setEdit] = useState(false)
  const [type, setType] = useState<WidgetType>('text')
  const [droppingItem, setDroppingItem] = useState<
    ReactGridLayout.CoreProps['droppingItem']
  >({
    i: '__dropping-elem__',
    w: 1,
    h: 1,
  })
  const [isDropping, setIsDropping] = useState(false)
  const [size, setSize] = useState<SizeType>('S')
  const axiosInstance = useAxiosWithAuth()
  const { trigger, data, error, isMutating } = useSWRMutation<ITeamDnDLayout>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/dnd-main/read`,
    (url: string) =>
      axiosInstance
        .post(url, { teamId: id, type: 'team' })
        .then((res) => res.data),
  )
  const params = useParams<{ id: string }>()

  useEffect(() => {
    trigger()
    setTeamId(Number(params?.id))
  }, [])

  useEffect(() => {
    if (!data) return
    setStoredWidgets(data.widgets)
  }, [data])

  // api 에러 생길 시 주석 처리 필요
  if (!data && isMutating) return <Typography>로딩중입니다...</Typography>
  if (!data && error) return <Typography>에러 발생</Typography>

  return (
    <Stack
      sx={{
        width: '100%',
        height: '100%',
      }}
      spacing={4}
    >
      {/*dnd 렌더링*/}
      <WidgetsRender
        key={data?.updatedAt ? data?.updatedAt.toString() : null}
        data={data}
        type={type}
        size={size}
        isDropping={isDropping}
        droppingItem={droppingItem}
        edit={edit}
        setEdit={setEdit}
      >
        {/*툴 박스 리스트*/}
        {edit && (
          <WidgetList
            setIsDropping={setIsDropping}
            setType={setType}
            setSize={setSize}
            setDroppingItem={setDroppingItem}
          />
        )}
      </WidgetsRender>
    </Stack>
  )
}

export default TeamDnD
