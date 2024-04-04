'use client'

import { Box, IconButton, Stack, Typography } from '@mui/material'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Layout, Responsive, WidthProvider } from 'react-grid-layout'
import {
  ITeamDnDLayout,
  IWidget,
  SizeType,
  WidgetType,
} from '@/types/ITeamDnDLayout'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import WidgetUpdate from '@/app/teams/[id]/panel/WidgetUpdate'
import SelectedWidget from './SelectedWidget'
import useMedia from '@/hook/useMedia'

const ResponsiveGridLayout = WidthProvider(Responsive)

interface IWidgetsRenderProps {
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
  data,
  type,
  size,
  isDropping,
  droppingItem,
  edit,
  setEdit,
  children,
}: IWidgetsRenderProps) => {
  const [index, setIndex] = useState(0)
  const layoutRef = useRef<HTMLInputElement | null>(null)

  /* 초기 layout값을 만드는 함수 */
  const initLayouts: IWidget[] = useMemo(() => {
    if (!data) return []
    return data?.widgets?.map((widget, index) => {
      const res = {
        ...widget,
        key: index,
        grid: {
          ...widget.grid,
          i: index.toString(),
        },
      }
      if (index === data?.widgets?.length - 1) setIndex(index + 1)
      return res
    })
  }, [data])

  const cols = edit ? { xs: 4, xxs: 4 } : { xs: 4, xxs: 2 }
  const { isOverTablet } = useMedia()
  const colNum = isOverTablet ? 4 : 2
  const prevLayoutsRef = useRef<IWidget[]>([])
  const currentLayoutRef = useRef<IWidget[]>(initLayouts)
  const [renderLayouts, setRenderLayouts] = useState<IWidget[]>([])

  const noEdit = edit && colNum === 2
  /* 지정된 레이아웃에서 벗어나지 않았는지 확인 */
  const isValidLayout = useCallback((newLayout: Layout[] | IWidget[]) => {
    const checkY = newLayout.some(
      (item) =>
        ('grid' in item ? item?.grid?.y + item?.grid?.h : item?.y + item?.h) >
        4,
    )
    return !checkY
  }, [])

  /*
   * 현재 react-grid-layout에서 전체 height를 제한하는 코드가 없음
   * onDrop시에는 우리가 직접 해당 아이템을 넣는 방식이기 때문에 widgets 배열에 넣지 않는 방식으로 제한 가능
   * 그러나 onLayoutChange시에는 react-grid-layout에서 자동으로 아이템을 넣는 방식이기 때문에 제한 불가능
   * 따라서 최대 높이를 제한하기 위해 위젯이 추가될 때마다 height를 계산하여 height가 제한 값을 넘은 경우 다시 재조정해줘야함
   */
  //
  // useEffect(() => {
  //   console.log('layouts1', layouts)
  //   if (layouts && edit && !isDropping && !isValidLayout(layouts)) {
  //     console.log('!isValidLayout')
  //     setTimeout(() => {
  //       setLayouts(prevLayoutsRef.current)
  //     }, 50)
  //   }
  // }, [layouts])

  // useEffect(() => {
  //   if (colNum == 4) setLayouts((prev) => [...prev])
  // }, [colNum])

  useEffect(() => {
    //colNum이 4면 그대로 렌더링
    if (colNum == 4) setRenderLayouts(currentLayoutRef.current)
    else setRenderLayouts(mLayouts)
  }, [colNum])

  /* 드롭 시 호출 */
  const onDrop = useCallback(
    (layout: Layout[], layoutItem: Layout) => {
      if (!edit) return
      if (!isValidLayout(layout)) {
        return
      }
      const res = {
        key: index,
        grid: {
          ...layoutItem,
          i: index.toString(),
        },
        type,
        size,
        createdAt: new Date(),
        updatedAt: new Date(),
        data: undefined,
      }
      currentLayoutRef.current = [...currentLayoutRef.current, res]
      setIndex(index + 1)
    },
    [edit, isValidLayout, index, type, size],
  )

  // /* 레이아웃이 변경될때마다 호출 */
  const onLayoutChange = useCallback(
    (currentLayout: Layout[]) => {
      //드롭중일 경우 이미 onDrop에서 처리하고 있으므로 처리x
      if (isDropping) return

      const updatedCurrentWidget: IWidget[] = currentLayout.map(
        (grid: Layout, i: number) => ({
          ...currentLayoutRef.current[i],
          grid,
          updatedAt: new Date(),
        }),
      )

      // ref 안의 값을 확인했을때 mLayout 값이면 set 안함
      if ((layoutRef.current?.clientWidth ?? 0) > 492) {
        prevLayoutsRef.current = [...currentLayoutRef.current]
        currentLayoutRef.current = updatedCurrentWidget
      }
    },
    [isDropping],
  )

  const removeWidget = useCallback(
    (idx: string) => {
      currentLayoutRef.current = currentLayoutRef.current.filter(
        (widget) => widget?.grid?.i !== idx,
      )
    },
    [currentLayoutRef.current],
  )

  /* 위젯 너비 계산 */
  const widgetWidth = useMemo(() => {
    const width = layoutRef?.current?.clientWidth
    if (!width) return 0
    return width / colNum
  }, [colNum, layoutRef?.current?.clientWidth])

  const widgetHeight = useMemo(() => {
    const width = layoutRef?.current?.clientWidth
    if (!width) return 0
    return colNum == 4 ? width / 4 : width / 2
  }, [colNum, layoutRef?.current?.clientWidth])

  //좌표를 오름차순으로 정렬
  //x좌표가 1을 초과하는 경우 (4x4 그리드에서 2x2로 변경할 때) x좌표를 0으로 변경하고 y좌표를 +1 변경)
  const mLayouts = useMemo(() => {
    return currentLayoutRef.current?.map((layout) => {
      if (layout.grid.x > 1) {
        return {
          ...layout,
          grid: {
            ...layout.grid,
            x: layout.grid.x > 2 ? 0 : 1,
            y: layout.grid.y + 1,
          },
        }
      }
      return layout
    })
  }, [])

  return (
    <Box>
      <WidgetUpdate
        layouts={renderLayouts}
        setEdit={setEdit}
        edit={edit}
        isCreate={!data}
        cancelAction={() => {
          currentLayoutRef.current = initLayouts
        }}
      />
      {/*toolbox 영역*/}
      {children}
      {/* react-grid-layout 영역 */}
      <Box bgcolor="background.secondary" ref={layoutRef} width={'100%'}>
        {noEdit ? (
          <Stack
            width={'100%'}
            height={400}
            alignItems={'center'}
            justifyContent={'center'}
          >
            <Typography>
              해당 크기에서는 팀 페이지 수정이 불가능합니다.
            </Typography>
          </Stack>
        ) : (
          <ResponsiveGridLayout
            breakpoints={{ xs: 492, xxs: 0 }}
            layouts={{
              xs: currentLayoutRef.current?.map((l) => ({ ...l.grid })),
              xxs: mLayouts.map((l) => ({ ...l.grid })),
            }}
            maxRows={colNum === 4 ? 4 : 8}
            className="layout"
            margin={[12, 12]}
            cols={cols}
            rowHeight={widgetHeight} //그리드 항목의 높이
            onDrop={onDrop}
            isDroppable={true} //true면 draggable={true}인 요소를 드래그 가능
            onLayoutChange={onLayoutChange}
            isResizable={false}
            droppingItem={droppingItem}
            style={{
              height: (16 / colNum) * widgetWidth + 100,
              borderRadius: '5px',
              minWidth: '20rem',
            }}
            draggableCancel=".MuiButtonBase-root, .MuiModal-root"
          >
            {renderLayouts?.map(
              ({ grid, type, size: wgSize, data: wgData, key }) => {
                return (
                  <Box
                    className={'layout-element'}
                    key={key}
                    data-grid={{ ...grid, isDraggable: edit }} //isDraggable 전체로 하는 방식있는데 안먹혀서 하나씩...
                    width={'100%'}
                    height={'100%'}
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
                    <SelectedWidget
                      type={type}
                      wgData={wgData}
                      wgSize={wgSize}
                      wgKey={key}
                    />
                  </Box>
                )
              },
            )}
          </ResponsiveGridLayout>
        )}
      </Box>
    </Box>
  )
}

export default WidgetsRender
