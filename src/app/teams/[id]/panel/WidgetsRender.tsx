import { Box, IconButton, Stack, useMediaQuery } from '@mui/material'
import TmpNoticeWidget from '@/app/teams/[id]/panel/widgets/TmpNoticeWidget'
import TmpBoardWidget from '@/app/teams/[id]/panel/widgets/TmpBoardWidget'
import CalenderWidget from '@/app/teams/[id]/panel/widgets/CalenderWidget'
import TmpAttendWidget from '@/app/teams/[id]/panel/widgets/TmpAttendWidget'
import TextWidget from '@/app/teams/[id]/panel/widgets/TextWidget'
import ImageWidget from '@/app/teams/[id]/panel/widgets/ImageWidget'
import TmpLinkWidget from '@/app/teams/[id]/panel/widgets/TmpLinkWidget'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import GridLayout, { Layout } from 'react-grid-layout'
import {
  ITeamDnDLayout,
  IWidget,
  SizeType,
  WidgetType,
} from '@/types/ITeamDnDLayout'
import CuButton from '@/components/CuButton'
import useToast from '@/hook/useToast'
import useAxiosWithAuth from '@/api/config'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import CuTextModal from '@/components/CuTextModal'
import IToastProps from '@/types/IToastProps'
import { BrowserView } from 'react-device-detect'

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
  const [index, setIndex] = useState(0)
  const layoutRef = useRef<HTMLInputElement | null>(null)

  /* 초기 widget값을 만드는 함수 */
  const setInitWidgets: IWidget[] = useMemo(() => {
    if (!data) return []
    return data?.widgets?.map((widget, index) => {
      if (index === data?.widgets?.length - 1) setIndex(index)

      return {
        ...widget,
        grid: {
          ...widget.grid,
          i: index.toString(),
        },
      }
    })
  }, [data])

  const [widgets, setWidgets] = useState<IWidget[]>(setInitWidgets)
  const [prevWidgets, setPrevWidgets] = useState<IWidget[] | null>(null)
  const [isOpen, setOpen] = useState(false)
  const axiosInstance = useAxiosWithAuth()
  const { CuToast, isOpen: toastOpen, openToast, closeToast } = useToast()
  const [toastMessage, setToastMessage] = useState<IToastProps>(
    {} as IToastProps,
  )
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
    if (prevWidgets) {
      setWidgets(prevWidgets)
    }
  }, [prevWidgets])

  /* 윈도우 resize시 위젯 다시 렌더링 */
  useEffect(() => {
    const handleResize = () => {
      setWidgets((prev) => [...prev])
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
      setWidgets([
        {
          key: index,
          grid: {
            ...layoutItem,
            i: index.toString(),
          },
          type,
          size,
          createdAt: new Date(),
          updatedAt: new Date(),
          data: null,
        },
        ...widgets,
      ])
      setIndex(index + 1)
    },
    [edit, isValidLayout, index, type, size, widgets],
  )

  /* 레이아웃이 변경될때마다 호출 */
  const onLayoutChange = useCallback(
    (currentLayout: Layout[]) => {
      //드롭중일 경우 이미 onDrop에서 처리하고 있으므로 처리x
      if (isDropping) return
      //레이아웃 범위를 넘어갈 시 처리
      if (!isValidLayout(currentLayout)) {
        setPrevWidgets(widgets)
      }
      const updatedCurrentWidget: IWidget[] = currentLayout.map(
        (grid: Layout, i: number) => ({
          ...widgets[i],
          grid,
          updatedAt: new Date(),
        }),
      )
      setWidgets(updatedCurrentWidget)
    },
    [isDropping, widgets],
  )

  /* 변경된 팀페이지 위젯 request */
  const handleSave = useCallback(async () => {
    try {
      const teamWidgetInfo = {
        teamId: id,
        type: 'team',
        widgets: widgets,
      }
      if (!data) {
        await axiosInstance.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/dnd-main/create`,
          teamWidgetInfo,
        )
      } else
        await axiosInstance.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/dnd-main/update`,
          teamWidgetInfo,
        )
      setToastMessage({
        severity: 'success',
        message: '수정에 성공하였습니다.',
      })
      openToast()
      setOpen(false)
      setEdit(false)
    } catch (e) {
      console.log('e', e)
      setToastMessage({
        severity: 'error',
        message: '수정에 실패하였습니다.',
      })
      openToast()
    }
  }, [axiosInstance, data, id, openToast, setEdit, widgets])

  const removeWidget = useCallback(
    (idx: string) => {
      const newWidgets = widgets.filter((widget) => widget.grid.i !== idx)
      setWidgets(newWidgets)
    },
    [widgets],
  )

  /* 위젯 너비 계산 */
  const widgetWidth = useMemo(() => {
    const width = layoutRef?.current?.clientWidth
    if (!width) return 0
    return isFourRow ? width / 4 : width / 2
  }, [isFourRow, layoutRef?.current?.clientWidth])

  return (
    <Box>
      {/*request와 관련된 toast*/}
      <CuToast
        severity={toastMessage?.severity}
        open={toastOpen}
        onClose={closeToast}
      >
        {toastMessage?.message}
      </CuToast>
      {/*확인 모달*/}
      <CuTextModal
        open={isOpen}
        onClose={() => setOpen(false)}
        title={'팀페이지 저장'}
        containedButton={{
          text: '확인',
          onClick: handleSave,
        }}
        textButton={{
          text: '취소',
          onClick: () => setOpen(false),
        }}
        content={'팀 페이지를 저장하시겠습니까?'}
      />
      <Stack spacing={2}>
        <BrowserView>
          {/* 팀페이지 수정 버튼 */}
          <Stack
            alignItems={'center'}
            direction={'row'}
            spacing={1}
            justifyContent={'flex-end'}
          >
            {edit && (
              <CuButton
                TypographyProps={{
                  variant: 'Body2Emphasis',
                }}
                message={'취소'}
                action={() => {
                  // 취소 시 최초의 widget 상태로 되돌림
                  setWidgets(setInitWidgets)
                  setEdit(!edit)
                }}
                variant={'outlined'}
              />
            )}
            <CuButton
              message={edit ? '저장' : '팀페이지 수정'}
              TypographyProps={{
                variant: 'Body2Emphasis',
              }}
              action={() => {
                if (edit) return setOpen(true)
                setEdit(!edit)
              }}
              variant={edit ? 'contained' : 'text'}
            />
          </Stack>
        </BrowserView>
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
            {widgets?.map(({ grid, type, size: wgSize, data: wgData }) => {
              return (
                <Box
                  className={'layout-element'}
                  key={grid.i}
                  data-grid={{ ...grid, isDraggable: edit }} //isDraggable 전체로 하는 방식있는데 안먹혀서 하나씩...
                  width={'100%'}
                  height={'100%'}
                >
                  {/*위젯 삭제 버튼*/}
                  {edit && (
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
                  )}
                  {/*위젯 type에 따라 렌더링*/}
                  {getWidget(type, wgData, wgSize)}
                </Box>
              )
            })}
          </GridLayout>
        </Box>
      </Stack>
    </Box>
  )
}

export default WidgetsRender
