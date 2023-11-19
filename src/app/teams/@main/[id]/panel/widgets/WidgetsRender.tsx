import { Box, Stack } from '@mui/material'
import TmpNoticeWidget from '@/app/teams/@main/[id]/panel/widgets/TmpNoticeWidget'
import TmpBoardWidget from '@/app/teams/@main/[id]/panel/widgets/TmpBoardWidget'
import TmpCalenderWidget from '@/app/teams/@main/[id]/panel/widgets/TmpCalenderWidget'
import TmpAttendWidget from '@/app/teams/@main/[id]/panel/widgets/TmpAttendWidget'
import TmpTextWidget from '@/app/teams/@main/[id]/panel/widgets/TmpTextWidget'
import TmpImageWidget from '@/app/teams/@main/[id]/panel/widgets/TmpImageWidget'
import TmpLinkWidget from '@/app/teams/@main/[id]/panel/widgets/TmpLinkWidget'
import { useCallback, useState } from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'
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
  isDropping: boolean
  droppingItem: IDroppingItem
}
const WidgetsRender = ({
  data,
  type,
  size,
  isDropping,
  droppingItem,
}: IWidgetsRenderProps) => {
  const setInitWidgets = () => {
    if (!data) return []
    const initWidgets = data?.widgets?.map((widget, index) => {
      if (index === widgets.length - 1) setIndex(index)
      return {
        ...widget,
        grid: {
          ...widget.grid,
          i: index,
        },
      }
    })

    return initWidgets
  }

  const [index, setIndex] = useState(0)
  const [widgets, setWidgets] = useState<IWidget[]>(setInitWidgets)
  const [edit, setEdit] = useState(false)
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
    [isDropping, widgets],
  )

  return (
    <Box>
      <ResponsiveGridLayout
        className="layout"
        layout={widgets}
        breakpoints={{
          sm: 768,
          xs: 480,
        }}
        cols={{ sm: 4, xs: 2 }} //그리드의 열 수. pc면 4, 모바일이면 2
        maxRows={4}
        width={800}
        rowHeight={200} //그리드 항목의 높이
        onDrop={onDrop}
        isDroppable={true} //true면 draggable={true}인 요소를 드래그 가능
        onLayoutChange={onLayoutChange}
        isResizable={false}
        isDraggable={edit}
        droppingItem={droppingItem}
        style={{
          minHeight: '900px',
          maxHeight: '900px',
          borderRadius: '5px',
          backgroundColor: 'yellow',
        }}
      >
        {widgets?.map(({ grid, type, size: wgSize }) => {
          return (
            <Box key={grid.i} data-grid={grid} width={'100%'} height={'100%'}>
              {type === 'notice' && (
                <TmpNoticeWidget data={data} size={wgSize} />
              )}
              {type === 'board' && <TmpBoardWidget data={data} size={wgSize} />}
              {type === 'calender' && (
                <TmpCalenderWidget data={data} size={wgSize} />
              )}
              {type === 'attendance' && (
                <TmpAttendWidget data={data} size={wgSize} />
              )}
              {type === 'text' && <TmpTextWidget data={data} size={wgSize} />}
              {type === 'image' && <TmpImageWidget data={data} size={wgSize} />}
              {type === 'linkTable' && (
                <TmpLinkWidget data={data} size={wgSize} />
              )}
            </Box>
          )
        })}
      </ResponsiveGridLayout>
      <Stack alignItems={'center'} marginY={2}>
        <CuButton
          message={edit ? '팀페이지 저장' : '팀페이지 수정'}
          action={() => {
            setEdit(!edit)
          }}
          variant={edit ? 'contained' : 'outlined'}
        />
      </Stack>
    </Box>
  )
}

export default WidgetsRender
