import { Box, IconButton, useMediaQuery } from '@mui/material'
import TmpNoticeWidget from '@/app/teams/[id]/panel/widgets/TmpNoticeWidget'
import TmpBoardWidget from '@/app/teams/[id]/panel/widgets/TmpBoardWidget'
import CalenderWidget from '@/app/teams/[id]/panel/widgets/CalenderWidget'
import TmpAttendWidget from '@/app/teams/[id]/panel/widgets/TmpAttendWidget'
import TextWidget from '@/app/teams/[id]/panel/widgets/TextWidget'
import ImageWidget from '@/app/teams/[id]/panel/widgets/ImageWidget'
import TmpLinkWidget from '@/app/teams/[id]/panel/widgets/TmpLinkWidget'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import GridLayout, { Layout } from 'react-grid-layout'
import { ITeamDnDLayout, IWidget, SizeType, WidgetType } from '@/types/ITeamDnDLayout'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import WidgetUpdate from '@/app/teams/[id]/panel/WidgetUpdate'
import { useRouter } from 'next/navigation'

interface IWidgetsRenderProps {
  id: number | string
  data: ITeamDnDLayout | undefined
  type: WidgetType
  size: SizeType
  isDropping: boolean
  droppingItem: ReactGridLayout.CoreProps['droppingItem']
  edit: boolean
  setEdit: (edit: boolean) => void
  children?: React.ReactNode
}

/** @todo 나중에 위젯 데이터 받는 방식 결정나면 저장버튼-툴박스-렌더 컴포넌트가 형제컴포넌트가 되도록 리팩토링 **/
const WidgetsRender = ({
  id,
  data,
  type,
  size,
  isDropping,
  droppingItem,
  edit,
  setEdit,
  children,
}: IWidgetsRenderProps) => {
  const router = useRouter()
  const [index, setIndex] = useState(0)
  const layoutRef = useRef<HTMLInputElement | null>(null)

  /* 초기 layout값을 만드는 함수 */
  const setInitLayouts: IWidget[] = useMemo(() => {
    if (!data) return []
    return data?.widgets?.map((widget, index) => {
      const res = {
        ...widget,
        grid: {
          ...widget.grid,
          i: index.toString(),
        },
      }
      if (index === data?.widgets?.length - 1) setIndex(index + 1)
      return res
    })
  }, [data])

  const [layouts, setLayouts] = useState<IWidget[]>(setInitLayouts)
  const [prevLayouts, setPrevLayouts] = useState<IWidget[] | null>(null)

  /* tablet 보다 크면 4개, 작으면 2개 */
  const isFourRow = useMediaQuery('(min-width:900px)')

  /* widget 가져오기 */
  const getWidget = useCallback(
    (type: WidgetType, wgData: any, wgSize: SizeType) => {
      switch (type) {
        case 'notice':
          return <TmpNoticeWidget data={wgData} size={wgSize} />
        case 'board':
          return <TmpBoardWidget data={wgData} size={wgSize} />
        case 'calender':
          return <CalenderWidget data={wgData} size={wgSize} />
        case 'attendance':
          return <TmpAttendWidget data={wgData} size={wgSize} />
        case 'text':
          return <TextWidget data={wgData} size={wgSize} />
        case 'image':
          return <ImageWidget data={wgData} size={wgSize} />
        case 'linkTable':
          return <TmpLinkWidget data={wgData} size={wgSize} />
        default:
          return null
      }
    },
    [],
  )

  /* 지정된 레이아웃에서 벗어나지 않았는지 확인 */
  const isValidLayout = useCallback((newLayout: Layout[]) => {
    const checkX = newLayout.some((item) => item?.x + item?.w > 4)
    if (checkX) return false
    const checkY = newLayout.some((item) => item?.y + item?.h > 4)
    if (checkY) return false
    return true
  }, [])

  /*
   * 현재 react-grid-layout에서 전체 height를 제한하는 코드가 없음
   * onDrop시에는 우리가 직접 해당 아이템을 넣는 방식이기 때문에 widgets 배열에 넣지 않는 방식으로 제한 가능
   * 그러나 onLayoutChange시에는 react-grid-layout에서 자동으로 아이템을 넣는 방식이기 때문에 제한 불가능
   * 따라서 최대 높이를 제한하기 위해 위젯이 추가될 때마다 height를 계산하여 height가 제한 값을 넘은 경우 다시 재조정해줘야함
   */
  useEffect(() => {
    if (prevLayouts) {
      setLayouts(prevLayouts)
    }
  }, [prevLayouts])

  /* 윈도우 resize시 위젯 다시 렌더링 */
  useEffect(() => {
    const handleResize = () => {
      setLayouts((prev) => (prev ? [...prev] : []))
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  /* 드롭 시 호출 */
  const onDrop = useCallback(
    (layout: Layout[], layoutItem: Layout) => {
      if (!edit) return
      if (!isValidLayout(layout)) return
      const res = {
        key: 'drop' + index, //@todo 이후 삭제
        grid: {
          ...layoutItem,
          i: index.toString(),
        },
        type,
        size,
        createdAt: new Date(),
        updatedAt: new Date(),
        data: null,
      }

      setLayouts(layouts ? [...layouts, res] : [res])
      setIndex(index + 1)
    },
    [edit, isValidLayout, index, type, size, layouts],
  )

  /* 레이아웃이 변경될때마다 호출 */
  const onLayoutChange = useCallback(
    (currentLayout: Layout[]) => {
      //드롭중일 경우 이미 onDrop에서 처리하고 있으므로 처리x
      if (isDropping) return
      //레이아웃 범위를 넘어갈 시 처리
      if (!isValidLayout(currentLayout)) {
        setPrevLayouts(layouts)
      }
      const updatedCurrentWidget: IWidget[] = currentLayout.map(
        (grid: Layout, i: number) => ({
          ...layouts[i],
          grid,
          updatedAt: new Date(),
        }),
      )
      setLayouts(updatedCurrentWidget)
    },
    [isDropping, isValidLayout, layouts],
  )

  const removeWidget = useCallback(
    (idx: string) => {
      const newLayouts = layouts.filter((widget) => widget?.grid?.i !== idx)
      setLayouts(newLayouts)
    },
    [layouts],
  )

  /* 위젯 너비 계산 */
  const widgetWidth = useMemo(() => {
    const width = layoutRef?.current?.clientWidth
    if (!width) return 0
    return isFourRow ? width / 4 : width / 2
  }, [isFourRow, layoutRef?.current?.clientWidth])

  return (
    <Box>
      <WidgetUpdate
        layouts={layouts}
        setEdit={setEdit}
        edit={edit}
        isCreate={!data}
        cancelAction={() => setLayouts(setInitLayouts)}
        teamId={id}
      />
      {/*toolbox 영역*/}
      {children}
      {/* react-grid-layout 영역 */}
      <Box bgcolor="background.secondary" ref={layoutRef} width={'100%'}>
        <GridLayout
          width={isFourRow ? widgetWidth * 4 : widgetWidth * 2}
          className="layout"
          margin={[12, 12]}
          cols={isFourRow ? 4 : 2} //그리드의 열 수. pc면 4, 모바일이면 2
          rowHeight={widgetWidth} //그리드 항목의 높이
          onDrop={onDrop}
          isDroppable={true} //true면 draggable={true}인 요소를 드래그 가능
          onLayoutChange={onLayoutChange}
          isResizable={false}
          droppingItem={droppingItem}
          style={{
            height: edit
              ? isFourRow
                ? 4 * widgetWidth + 100
                : 8 * widgetWidth + 100
              : undefined,
            borderRadius: '5px',
          }}
          draggableCancel=".MuiButtonBase-root, .MuiModal-root"
        >
          {/*dnd 편집시 layouts, 위젯편집시 dndData*/}
          {layouts?.map(({ grid, type, size: wgSize, data: wgData, key }) => {
            return (
              <Box
                className={'layout-element'}
                key={grid?.i}
                data-grid={{ ...grid, isDraggable: edit }} //isDraggable 전체로 하는 방식있는데 안먹혀서 하나씩...
                width={'100%'}
                height={'100%'}
                onClick={() =>
                  !edit && router.replace(`/teams/${id}?key=${key}`)
                }
              >
                {/*위젯 삭제 버튼*/}
                {edit ? (
                  <IconButton
                    onClick={() => removeWidget(grid?.i)}
                    aria-label="delete"
                    color="primary"
                    sx={{
                      position: 'absolute',
                      top: -12,
                      right: -12,
                      zIndex: 9999,
                      color: 'white',
                      ':hover': {},
                    }}
                    size={'small'}
                  >
                    <RemoveCircleIcon />
                  </IconButton>
                ) : (
                  <></>
                )}
                {/*위젯 type에 따라 렌더링*/}
                {getWidget(type, wgData, wgSize)}
              </Box>
            )
          })}
        </GridLayout>
      </Box>
    </Box>
  )
}

export default WidgetsRender
