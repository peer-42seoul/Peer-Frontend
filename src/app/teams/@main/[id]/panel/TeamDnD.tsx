import { Box } from '@mui/material'
import useSWR from 'swr'
import useAxiosWithAuth from '@/api/config'
import 'react-grid-layout/css/styles.css'
import {
  IDroppingItem,
  ITeamDnDLayout,
  SizeType,
  WidgetType,
} from '@/types/ITeamDnDLayout'
import { useState } from 'react'
import WidgetList from '@/app/teams/@main/[id]/panel/widgets/WidgetList'
import WidgetsRender from '@/app/teams/@main/[id]/panel/widgets/WidgetsRender'
import useMedia from '@/hook/useMedia'

export const sizeRatio = {
  S: { w: 1, h: 1 },
  M: { w: 2, h: 1 },
  L: { w: 2, h: 2 },
}

const TeamDnD = ({ id }: { id: string }) => {
  /* id = 추후에 사용할 예정 */
  console.log('id', id)
  const [type, setType] = useState<WidgetType>('text')
  const [droppingItem, setDroppingItem] = useState<IDroppingItem>({
    i: '__dropping-elem__',
    w: 1,
    h: 1,
  })
  const [isDropping, setIsDropping] = useState(false)
  const [widgetSize, setWidgetSize] = useState(0)
  const [size, setSize] = useState<SizeType>('S')
  const { isPc } = useMedia()
  const ratio = isPc ? 2 : 1
  const axiosInstance = useAxiosWithAuth()
  const { data, isLoading, error } = useSWR<ITeamDnDLayout>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/temp/dnd/read`,
    (url: string) => axiosInstance.get(url).then((res) => res.data),
  )

  // if (isLoading) return <>로딩중입니다</>
  // if (error) return <>에러 발생</>

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        border: 1.55,
        padding: 2,
      }}
    >
      <WidgetList
        widgetSize={widgetSize}
        setIsDropping={setIsDropping}
        type={type}
        setType={setType}
        setSize={setSize}
        setDroppingItem={setDroppingItem}
        ratio={ratio}
      />
      <WidgetsRender
        key={data}
        data={data}
        type={type}
        size={size}
        widgetSize={widgetSize}
        setWidgetSize={setWidgetSize}
        isDropping={isDropping}
        droppingItem={droppingItem}
        ratio={ratio}
      />
    </Box>
  )
}

export default TeamDnD
