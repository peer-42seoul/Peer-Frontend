import { Box, IconButton, Portal, Stack, Typography } from '@mui/material'
import TmpNoticeWidget from '@/app/teams/[id]/panel/widgets/TmpNoticeWidget'
import TmpBoardWidget from '@/app/teams/[id]/panel/widgets/TmpBoardWidget'
import TmpCalenderWidget from '@/app/teams/[id]/panel/widgets/TmpCalenderWidget'
import TmpAttendWidget from '@/app/teams/[id]/panel/widgets/TmpAttendWidget'
import TextWidget from '@/app/teams/[id]/panel/widgets/TextWidget'
import TmpImageWidget from '@/app/teams/[id]/panel/widgets/TmpImageWidget'
import TmpLinkWidget from '@/app/teams/[id]/panel/widgets/TmpLinkWidget'
import React, { useCallback, useMemo, useState } from 'react'
import ReactGridLayout, {
  Layout,
  Responsive,
  WidthProvider,
} from 'react-grid-layout'
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

const ResponsiveGridLayout = WidthProvider(Responsive)

interface IWidgetsRenderProps {
  id: number | string
  data: ITeamDnDLayout | undefined
  type: WidgetType
  size: SizeType
  isDropping: boolean
  droppingItem: ReactGridLayout.CoreProps['droppingItem']
  edit: boolean
  setEdit: (edit: boolean) => void
}
const WidgetsRender = ({
  id,
  data,
  type,
  size,
  isDropping,
  droppingItem,
  edit,
  setEdit,
}: IWidgetsRenderProps) => {
  const [index, setIndex] = useState(0)

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

  const [isOpen, setOpen] = useState(false)
  const axiosInstance = useAxiosWithAuth()
  const {
    CuToast: CuSuccessToast,
    isOpen: isSuccessOpen,
    openToast: openSuccessToast,
    closeToast: closeSuccessToast,
  } = useToast()
  const {
    CuToast: CuFailedToast,
    isOpen: isFailedOpen,
    openToast: openFailedToast,
    closeToast: closeFailedToast,
  } = useToast()

  /* 드롭 시 호출 */
  const onDrop = useCallback(
    (layout: Layout[], layoutItem: Layout) => {
      if (!edit) return
      setWidgets([
        ...widgets,
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
      ])
      setIndex(index + 1)
    },
    [widgets, index, type, size, edit],
  )

  /* 레이아웃이 변경될때마다 호출 */
  const onLayoutChange = useCallback(
    (currentLayout: Layout[]) => {
      //레이아웃 범위를 넘어갈 시 처리 필요

      //드롭중일 경우 이미 onDrop에서 처리하고 있으므로 처리x
      if (!isDropping) {
        const updatedCurrentWidget: IWidget[] = currentLayout.map(
          (grid: Layout, i: number) => ({
            ...widgets[i],
            grid,
            updatedAt: new Date(),
          }),
        )
        setWidgets(updatedCurrentWidget)
      }
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
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/temp/dnd/create`,
          teamWidgetInfo,
        )
      } else
        await axiosInstance.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/temp/dnd/update`,
          teamWidgetInfo,
        )
      openSuccessToast()
      setOpen(false)
    } catch (e) {
      console.log('e', e)
      openFailedToast()
    }
  }, [axiosInstance, data, id, openFailedToast, openSuccessToast, widgets])

  const getWidget = useCallback(
    (type: WidgetType, wgData: any, wgSize: SizeType) => {
      switch (type) {
        case 'notice':
          return <TmpNoticeWidget data={wgData} size={wgSize} />
        case 'board':
          return <TmpBoardWidget data={wgData} size={wgSize} />
        case 'calender':
          return <TmpCalenderWidget data={wgData} size={wgSize} />
        case 'attendance':
          return <TmpAttendWidget data={wgData} size={wgSize} />
        case 'text':
          return <TextWidget data={wgData} size={wgSize} />
        case 'image':
          return <TmpImageWidget data={wgData} size={wgSize} />
        case 'linkTable':
          return <TmpLinkWidget data={wgData} size={wgSize} />
        default:
          return null
      }
    },
    [],
  )

  return (
    <Box>
      {/*request와 관련된 toast*/}
      <Portal>
        <CuSuccessToast
          open={isSuccessOpen}
          onClose={closeSuccessToast}
          severity="success"
        >
          <Typography>수정에 성공하였습니다.</Typography>
        </CuSuccessToast>
        <CuFailedToast
          open={isFailedOpen}
          onClose={closeFailedToast}
          severity="error"
        >
          <Typography>수정에 실패하였습니다.</Typography>
        </CuFailedToast>
      </Portal>
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
      {/* react-grid-layout 영역 */}
      <ResponsiveGridLayout
        className="layout"
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
        droppingItem={droppingItem}
        style={{
          minHeight: edit ? '900px' : undefined,
          maxHeight: edit ? '900px' : undefined,
          borderRadius: '5px',
          backgroundColor: 'yellow',
        }}
      >
        {widgets?.map(({ grid, type, size: wgSize, data: wgData }) => {
          return (
            <Box
              key={grid.i}
              data-grid={{ ...grid, isDraggable: edit }} //isDraggable 전체로 하는 방식있는데 안먹혀서 하나씩...
              width={'100%'}
              height={'100%'}
            >
              {/*위젯 삭제 버튼*/}
              {edit && (
                <IconButton
                  onClick={() => {
                    const newWidgets = widgets.filter(
                      (widget) => widget.grid.i !== grid.i,
                    )
                    setWidgets(newWidgets)
                  }}
                  aria-label="delete"
                  color="primary"
                  sx={{
                    position: 'absolute',
                    top: -12,
                    right: -12,
                    zIndex: 999,
                    color: 'black',
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
      </ResponsiveGridLayout>
      {/* 팀페이지 수정 버튼 */}
      <Stack
        alignItems={'center'}
        marginY={2}
        direction={'row'}
        gap={1}
        justifyContent={'center'}
      >
        {edit && (
          <CuButton
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
          message={edit ? '팀페이지 저장' : '팀페이지 수정'}
          action={() => {
            if (edit) return setOpen(true)
            setEdit(!edit)
          }}
          variant={edit ? 'contained' : 'outlined'}
        />
      </Stack>
    </Box>
  )
}

export default WidgetsRender
