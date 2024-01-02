import { Stack } from '@mui/material'
import useAxiosWithAuth from '@/api/config'
import 'react-grid-layout/css/styles.css'
import { ITeamDnDLayout, SizeType, WidgetType } from '@/types/ITeamDnDLayout'
import { useEffect, useState } from 'react'
import WidgetList from '@/app/teams/[id]/panel/widgets/WidgetList'
import WidgetsRender from '@/app/teams/[id]/panel/widgets/WidgetsRender'
import ReactGridLayout from 'react-grid-layout'
import useSWRMutation from 'swr/mutation'

export const sizeRatio = {
  S: { w: 1, h: 1 },
  M: { w: 2, h: 1 },
  L: { w: 2, h: 2 },
}

const TeamDnD = ({ id }: { id: string }) => {
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
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/temp/dnd/read`,
    (url: string) =>
      axiosInstance
        .post(url, { teamId: id, type: 'team' })
        .then((res) => res.data),
  )

  useEffect(() => {
    trigger()
  }, [])

  // if (!data && isMutating) return <>로딩중입니다</>
  // if (!data && error) return <>에러 발생</>

  return (
    <Stack
      sx={{
        width: '100%',
        height: '100%',
        border: 1.55,
        padding: 2,
      }}
      bgcolor={'beige'}
    >
      {edit && (
        /* 툴 박스 리스트 */
        <WidgetList
          setIsDropping={setIsDropping}
          setType={setType}
          setSize={setSize}
          setDroppingItem={setDroppingItem}
        />
      )}
      {/*dnd 렌더링*/}
      <WidgetsRender
        id={id}
        // key={data}
        data={data}
        type={type}
        size={size}
        isDropping={isDropping}
        droppingItem={droppingItem}
        edit={edit}
        setEdit={setEdit}
      />
    </Stack>
  )
}

export default TeamDnD
