import GridLayout from 'react-grid-layout'
import { Box } from '@mui/material'
import TmpNoticeWidget from '@/app/teams/@main/[id]/panel/widgets/TmpNoticeWidget'
import TmpBoardWidget from '@/app/teams/@main/[id]/panel/widgets/TmpBoardWidget'
import TmpCalenderWidget from '@/app/teams/@main/[id]/panel/widgets/TmpCalenderWidget'
import TmpAttendWidget from '@/app/teams/@main/[id]/panel/widgets/TmpAttendWidget'
import TmpTextWidget from '@/app/teams/@main/[id]/panel/widgets/TmpTextWidget'
import TmpImageWidget from '@/app/teams/@main/[id]/panel/widgets/TmpImageWidget'
import TmpLinkWidget from '@/app/teams/@main/[id]/panel/widgets/TmpLinkWidget'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Responsive, WidthProvider, Layout } from 'react-grid-layout'
import {
  IDataGrid,
  IDroppingItem,
  ITeamDnDLayout,
  IWidget,
  SizeType,
  WidgetType,
} from '@/types/ITeamDnDLayout'
import CuButton from '@/components/CuButton'
const ResponsiveGridLayout = WidthProvider(Responsive)

interface IWidgetsRenderProps {
  data: ITeamDnDLayout
  type: WidgetType
  size: SizeType
  widgetSize: number
  setWidgetSize: (widgetSize: number) => void
  isDropping: boolean
  droppingItem: IDroppingItem
  ratio: number
}
const WidgetsRender = ({
  data,
  type,
  size,
  widgetSize,
  setWidgetSize,
  isDropping,
  droppingItem,
  ratio,
}: IWidgetsRenderProps) => {
  const setInitWidgets = () => {
    if (!data) return []
    return data?.widgets?.map((widget, index) => {
      if (index === widgets.length - 1) setIndex(index)
      return {
        ...widget,
        grid: {
          ...widget.grid,
          i: index,
        },
      }
    })
  }
  const [index, setIndex] = useState(0)
  const [widgets, setWidgets] = useState<IWidget[]>(setInitWidgets)
  const [edit, setEdit] = useState(false)
  const layoutRef = useRef(null)
  const maxRows = 4
  const cols = ratio * 2

  console.log('widgets', widgets)
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

  return (
    <>
      <Box
        ref={layoutRef}
        bgcolor={'yellow'}
        height={maxRows * widgetSize * 1.1}
        width={'100%'}
      >
        <ResponsiveGridLayout
          className="layout"
          cols={{ sm: 4, xs: 2 }} //그리드의 열 수. pc면 4, 모바일이면 2
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
              <Box key={grid.i} data-grid={grid} width={'100%'} height={'100%'}>
                {type === 'notice' && (
                  <TmpNoticeWidget data={data} size={wgSize} />
                )}
                {type === 'board' && (
                  <TmpBoardWidget data={data} size={wgSize} />
                )}
                {type === 'calender' && (
                  <TmpCalenderWidget data={data} size={wgSize} />
                )}
                {type === 'attendance' && (
                  <TmpAttendWidget data={data} size={wgSize} />
                )}
                {type === 'text' && <TmpTextWidget data={data} size={wgSize} />}
                {type === 'image' && (
                  <TmpImageWidget data={data} size={wgSize} />
                )}
                {type === 'linkTable' && (
                  <TmpLinkWidget data={data} size={wgSize} />
                )}
              </Box>
            )
          })}
        </ResponsiveGridLayout>
      </Box>
      <CuButton
        message={'팀페이지 수정'}
        action={() => {}}
        variant={'contained'}
        fullWidth={false}
        disabled
      />
    </>
  )
}

export default WidgetsRender
