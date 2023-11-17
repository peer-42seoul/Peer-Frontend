import { Box, Stack } from '@mui/material'
import useSWR from 'swr'
import useAxiosWithAuth from '@/api/config'
import 'react-grid-layout/css/styles.css'
import GridLayout from 'react-grid-layout'
import {
  IDataGrid,
  ITeamDnDLayout,
  IWidget,
  SizeType,
  WidgetType,
} from '@/types/ITeamDnDLayout'
import { useCallback, useEffect, useRef, useState } from 'react'
import useMedia from '@/hook/useMedia'
import TeamDnDWidgetList from '@/app/teams/@main/[id]/panel/TeamDnDWidgetList'
import TmpWidget from '@/app/teams/@main/[id]/panel/TmpWidget'

export const sizeRatio = {
  S: { w: 1, h: 1 },
  M: { w: 2, h: 1 },
  L: { w: 2, h: 2 },
}

const TeamDnD = () => {
  // const axiosInstance = useAxiosWithAuth()
  const [widgets, setWidgets] = useState<IWidget[]>([])
  const [index, setIndex] = useState(1)
  const [type, setType] = useState<WidgetType>('text')
  const [droppingItem, setDroppingItem] = useState({
    i: '__dropping-elem__',
    w: 1,
    h: 1,
  })
  const [isDropping, setIsDropping] = useState(false)
  const [widgetSize, setWidgetSize] = useState(0)
  const [size, setSize] = useState<SizeType>('S')
  const layoutRef = useRef(null)
  const { isPc } = useMedia()
  const ratio = isPc ? 2 : 1
  const maxRows = 4
  const cols = ratio * 2

  const axiosInstance = useAxiosWithAuth()
  const { data, isLoading } = useSWR<ITeamDnDLayout>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/temp/dnd/read`,
    (url: string) => axiosInstance.get(url).then((res) => res.data),
  )

  useEffect(() => {
    let i = 0
    const newLayout = data?.widgets?.map((widget, index) => {
      i = index
      return {
        ...widget,
        grid: {
          ...widget.grid,
          i: index,
        },
      }
    })
    if (!newLayout) return
    setWidgets(newLayout)
    setIndex(i + 1) //인덱스는 각 요소들의 식별자. 중복되지 않기 위해서 setIndex로 관리
  }, [data])

  /* 페이지 사이즈의 resize가 일어날때마다 handleResize 호출 */
  useEffect(() => {
    const handleResize = () => {
      setWidgetSize(layoutRef.current?.offsetWidth / cols - 4 ?? 0) //layoutRef(레이아웃 바탕)의 길이의 4만큼 나눔 (
    }

    setWidgetSize(layoutRef.current?.offsetWidth / cols - 4 ?? 0)
    // 컴포넌트가 마운트될 때 실행되는 부분
    window.addEventListener('resize', handleResize)

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  /* drop시 호출 */
  const onDrop = useCallback(
    (currentLayout: IDataGrid[], layoutItem: IDataGrid) => {
      setWidgets([
        ...widgets,
        {
          key: index,
          grid: {
            ...layoutItem,
            i: index,
          },
          type,
          size,
          createdAt: new Date(),
          updatedAt: new Date(),
          data: null,
        },
      ])
      setIndex(index + 1)
    },
    [widgets, index, type, size],
  )

  const onLayoutChange = useCallback(
    (currentLayout: IDataGrid[]) => {
      //레이아웃 범위를 넘어갈 시 처리
      const newHeight =
        document?.querySelector('.react-grid-layout')?.offsetHeight
      if (newHeight > widgetSize * maxRows) return

      //드롭중일 경우 이미 onDrop에서 처리하고 있으므로 처리x
      if (!isDropping) {
        const updatedCurrentWidget = currentLayout.map(
          (grid: IDataGrid, i: number) => ({
            ...widgets[i],
            grid,
          }),
        )
        setWidgets(updatedCurrentWidget)
      }
    },
    [isDropping, widgetSize, widgets],
  )

  if (isLoading) return <>로딩중입니다</>
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
      <TeamDnDWidgetList
        widgetSize={widgetSize}
        setIsDropping={setIsDropping}
        type={type}
        setType={setType}
        setSize={setSize}
        setDroppingItem={setDroppingItem}
      />
      <Box
        ref={layoutRef}
        bgcolor={'yellow'}
        height={maxRows * widgetSize}
        width={'100%'}
      >
        <GridLayout
          className="layout"
          cols={cols} //그리드의 열 수. pc면 4, 모바일이면 2
          rowHeight={widgetSize} //그리드 항목의 높이
          width={widgetSize * ratio * 2} //레이아웃 너비. pc일 경우 widgetSize 4칸, 모바일이면 2칸
          preventCollision={true} //true면 그리드 항목을 드래그해도 위치가 변경되지 않음
          onDrop={onDrop}
          isDroppable={true} //true면 draggable={true}인 요소를 드래그 가능
          onLayoutChange={onLayoutChange}
          maxRows={maxRows}
          isResizable={false}
          droppingItem={droppingItem}
        >
          {widgets?.map(({ grid, type, size: wgSize }) => {
            return (
              <Stack
                key={grid.i}
                data-grid={{
                  ...grid,
                  w: grid.w * sizeRatio[wgSize].w, //size에 따라 w, h 비율 설정
                  h: grid.h * sizeRatio[wgSize].h,
                }}
                flexDirection={'row'}
                justifyContent={'center'}
                alignItems={'center'}
                bgcolor={'white'}
              >
                {type === 'notice' && <TmpWidget data={data} size={wgSize} />}
                {type === 'board' && <TmpWidget data={data} size={wgSize} />}
                {type === 'calender' && <TmpWidget data={data} size={wgSize} />}
                {type === 'attendance' && (
                  <TmpWidget data={data} size={wgSize} />
                )}
                {type === 'text' && <TmpWidget data={data} size={wgSize} />}
                {type === 'image' && <TmpWidget data={data} size={wgSize} />}
                {type === 'linkTable' && (
                  <TmpWidget data={data} size={wgSize} />
                )}
              </Stack>
            )
          })}
        </GridLayout>
      </Box>
    </Box>
  )
}

export default TeamDnD
