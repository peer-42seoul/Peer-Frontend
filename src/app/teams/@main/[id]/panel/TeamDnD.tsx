import { Box, Input, Stack } from '@mui/material'
import useSWR from 'swr'
import { IPostDetail } from '@/types/IPostDetail'
import { defaultGetFetcher } from '@/api/fetchers'
import { useRouter } from 'next/navigation'
import useAxiosWithAuth from '@/api/config'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import GridLayout from 'react-grid-layout'
import { ITeamDnDLayout, IWidget } from '@/types/ITeamDnDLayout'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import useMedia from '@/hook/useMedia'
import TeamDnDWidgetList from '@/app/teams/@main/[id]/panel/TeamDnDWidgetList'
import TmpWidget from '@/app/teams/@main/[id]/panel/TmpWidget'

type WidgetType =
  | 'Notice'
  | 'Board'
  | 'Calender'
  | 'Attendance'
  | 'Text'
  | 'Image'
  | 'LinkTable'

const data: ITeamDnDLayout = {
  teamId: 1,
  type: 'teamPage',
  createdAt: new Date(),
  updatedAt: new Date(),
  widgets: [
    {
      key: 1,
      size: 'M',
      grid: { x: 0, y: 0, w: 2, h: 2 },
      type: 'Text',
      createdAt: new Date(),
      updatedAt: new Date(),
      data: {
        /* 실제 위젯 데이터 */
      },
    },
    {
      key: 2,
      size: 'S',
      grid: { x: 2, y: 0, w: 1, h: 1 },
      type: 'Text',
      createdAt: new Date(),
      updatedAt: new Date(),
      data: {
        /* 실제 위젯 데이터 */
      },
    },
  ],
}

const TeamDnD = ({ id }: { id: string }) => {
  // const axiosInstance = useAxiosWithAuth()
  const [layout, setLayout] = useState<IWidget[]>([])
  const [index, setIndex] = useState(1)
  const [type, setType] = useState<'input' | 'image'>('input')
  const [isDropping, setIsDropping] = useState(false)
  const [widgetSize, setWidgetSize] = useState(0)
  const layoutRef = useRef(null)
  const { isPc } = useMedia()
  const size = isPc ? 2 : 1
  const maxRows = 4

  // const { data, isLoading, error } = useSWR<ITeamDnDLayout>(
  //   `${process.env.NEXT_PUBLIC_API_URL}/api/v1/recruit/${params?.id}`,
  //   (url: string) => axiosInstance.get(url).then((res) => res.data),
  // )
  //onDrop 함수는 드래그한 요소를 놓았을 때 호출되는 함수입니다.
  //currentLayout은 현재 그리드의 레이아웃 정보를 담고 있습니다.
  //layoutItem은 드래그한 요소의 레이아웃 정보를 담고 있습니다.
  //event는 이벤트 객체입니다.

  useEffect(() => {
    const newLayout = data.widgets.map((widget, index) => {
      return {
        ...widget,
        grid: {
          i: index,
          ...widget.grid,
        },
      }
    })
    setLayout(newLayout)
  }, [data])

  useEffect(() => {
    const handleResize = () => {
      setWidgetSize(layoutRef.current?.offsetWidth / 4 - 4 ?? 0)
    }

    setWidgetSize(layoutRef.current?.offsetWidth / 4 - 4 ?? 0)
    // 컴포넌트가 마운트될 때 실행되는 부분
    window.addEventListener('resize', handleResize)

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const onDrop = useCallback(
    (currentLayout, layoutItem, _event) => {
      console.log('currentLayout', currentLayout)
      //   console.log('onDrop')
      //   setLayout([
      //     ...layout,
      //     {
      //       ...layoutItem,
      //       i: index.toString(),
      //       type: type,
      //       w: type === 'image' ? 2 : 1,
      //       minW: null,
      //       maxW: null,
      //     },
      //   ])
      //   setIndex(index + 1)
    },
    [index, layout, type],
  )

  const onLayoutChange = useCallback(
    (currentLayout) => {
      console.log('onLayoutChange', currentLayout)
      console.log('layout22', layout)
      // const newHeight =
      //   document?.querySelector('.react-grid-layout')?.offsetHeight
      // console.log('newHeight', newHeight)
      //
      // if (newHeight > widgetSize * maxRows) {
      //   console.log('newHeight!!', newHeight)
      //   const prevLayout = [...layout]
      //   // setLayout([
      //   //     {i: 0, x: 0, y: 0, w: 1, h: 1, minW: null, maxW: null, type: "input"}
      //   // ])
      //   setLayout(prevLayout)
      //   return
      // }
      // if (!isDropping) {
      //   console.log('isDropping', isDropping)
      //   const updatedCurrentLayout = currentLayout.map((item, i) => {
      //     item.type = layout[i].type
      //     return item
      //   })
      //   setLayout(updatedCurrentLayout)
      // }
    },
    [isDropping, layout],
  )

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
        setType={setType}
      />
      <Box
        ref={layoutRef}
        bgcolor={'yellow'}
        height={maxRows * widgetSize}
        width={'100%'}
      >
        <GridLayout
          className="layout"
          cols={size * 2} //그리드의 열 수. pc면 4, 모바일이면 2
          rowHeight={widgetSize} //그리드 항목의 높이
          width={widgetSize * size * 2}
          preventCollision={true} //true면 그리드 항목을 드래그해도 위치가 변경되지 않음
          onDrop={onDrop}
          isDroppable={true} //true면 draggable={true}인 요소를 드래그 가능
          onLayoutChange={onLayoutChange}
          maxRows={maxRows}
        >
          {layout.map(({ grid, type }) => {
            return (
              <Box
                key={grid.i}
                data-grid={grid}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {type === 'Notice' && <TmpWidget data={data} />}
                {type === 'Board' && <TmpWidget data={data} />}
                {type === 'Calender' && <TmpWidget data={data} />}
                {type === 'Attendance' && <TmpWidget data={data} />}
                {type === 'Text' && <TmpWidget data={data} />}
                {type === 'Image' && <TmpWidget data={data} />}
                {type === 'LinkTable' && <TmpWidget data={data} />}
              </Box>
            )
          })}
        </GridLayout>
      </Box>
    </Box>
  )
}

export default TeamDnD
