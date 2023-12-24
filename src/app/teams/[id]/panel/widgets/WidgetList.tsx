import { Box, Button, Stack } from '@mui/material'
import { SizeType, WidgetType } from '@/types/ITeamDnDLayout'
import TmpTextWidget from '@/app/teams/[id]/panel/widgets/TmpTextWidget'
import { useCallback, useState } from 'react'
import { sizeRatio } from '@/app/teams/[id]/panel/TeamDnD'
import TmpNoticeWidget from '@/app/teams/[id]/panel/widgets/TmpNoticeWidget'
import TmpBoardWidget from '@/app/teams/[id]/panel/widgets/TmpBoardWidget'
import CalenderWidget from '@/app/teams/[id]/panel/widgets/Calendar/CalenderWidget'
import TmpAttendWidget from '@/app/teams/[id]/panel/widgets/TmpAttendWidget'
import TmpImageWidget from '@/app/teams/[id]/panel/widgets/TmpImageWidget'
import TmpLinkWidget from '@/app/teams/[id]/panel/widgets/TmpLinkWidget'

interface ITeamDnDWidgetListProps {
  setIsDropping: (isDropping: boolean) => void
  setType: (type: WidgetType) => void
  setSize: (size: SizeType) => void
  setDroppingItem: any
}

interface IToolSizeType {
  notice: SizeType
  board: SizeType
  calender: SizeType
  attendance: SizeType
  text: SizeType
  image: SizeType
  linkTable: SizeType
}

/* 툴 박스 */
const WidgetList = ({
  setIsDropping,
  setType,
  setSize,
  setDroppingItem,
}: ITeamDnDWidgetListProps) => {
  /* 툴 박스의 사이즈 관리 */
  const [toolSize, setToolSize] = useState<IToolSizeType>({
    notice: 'S',
    board: 'S',
    calender: 'S',
    attendance: 'S',
    text: 'S',
    image: 'S',
    linkTable: 'S',
  })

  const typeList: WidgetType[] = [
    'notice',
    'board',
    'calender',
    'attendance',
    'text',
    'image',
    'linkTable',
  ]

  /* drag 시작 시 호출 */
  const onDragStart = useCallback(
    (e: any, wgType: WidgetType) => {
      setIsDropping(true)
      setType(wgType)
      setSize(toolSize[wgType] ?? 'S')
      /* dropping Item의 w, h 값 설정 */
      if (toolSize[wgType] === 'L')
        setDroppingItem({ i: '__dropping-elem__', w: 2, h: 2 })
      else if (toolSize[wgType] === 'M')
        setDroppingItem({ i: '__dropping-elem__', w: 2, h: 1 })
      else setDroppingItem({ i: '__dropping-elem__', w: 1, h: 1 })
      e.dataTransfer.setData('text/plain', '')
    },
    [setDroppingItem, setIsDropping, setType, toolSize, setSize],
  )

  const getWidget = useCallback(
    (typeValue: WidgetType) => {
      switch (typeValue) {
        case 'notice':
          return (
            <TmpNoticeWidget data={null} size={toolSize[typeValue] ?? 'S'} />
          )
        case 'board':
          return (
            <TmpBoardWidget data={null} size={toolSize[typeValue] ?? 'S'} />
          )
        case 'calender':
          return (
            <CalenderWidget
              data={undefined}
              size={toolSize[typeValue] ?? 'S'}
            />
          )
        case 'attendance':
          return (
            <TmpAttendWidget data={null} size={toolSize[typeValue] ?? 'S'} />
          )
        case 'text':
          return <TmpTextWidget data={null} size={toolSize[typeValue] ?? 'S'} />
        case 'image':
          return (
            <TmpImageWidget data={null} size={toolSize[typeValue] ?? 'S'} />
          )
        case 'linkTable':
          return <TmpLinkWidget data={null} size={toolSize[typeValue] ?? 'S'} />
        default:
          return null
      }
    },
    [toolSize],
  )

  return (
    <Box
      bgcolor={'skyblue'}
      padding={1}
      width={'100%'}
      sx={{
        overflowX: 'auto',
      }}
    >
      <Stack direction={'row'} gap={1}>
        {/*툴 박스 렌더링*/}
        {typeList?.map((typeValue: WidgetType) => (
          <Box key={typeValue} bgcolor={'lightgray'}>
            {/*사이즈 버튼 렌더링*/}
            <Stack direction={'row'} gap={1}>
              {['S', 'M', 'L'].map((size) => (
                <Button
                  sx={{
                    minWidth: '30px',
                    width: '30px',
                    height: '30px',
                  }}
                  size={'small'}
                  key={size}
                  variant="outlined"
                  onClick={() => {
                    setToolSize({ ...toolSize, [typeValue]: size as SizeType })
                  }}
                >
                  {size}
                </Button>
              ))}
            </Stack>
            <Stack
              alignItems={'center'}
              justifyContent={'center'}
              flexDirection={'row'}
            >
              {/*react grid layout에서 drop 가능한 아이템으로 만들기*/}
              <Stack
                key={typeValue}
                margin={1}
                flexDirection={'row'}
                height={200 * 0.38 * sizeRatio[toolSize[typeValue] ?? 'S'].w}
                width={200 * 0.38 * sizeRatio[toolSize[typeValue] ?? 'S'].h}
                className="droppable-element"
                draggable={true}
                unselectable="on"
                onDragStart={(e) => onDragStart(e, typeValue)}
                onDragEnd={() => {
                  setIsDropping(false)
                }}
              >
                {getWidget(typeValue)}
              </Stack>
            </Stack>
          </Box>
        ))}
      </Stack>
    </Box>
  )
}

export default WidgetList
