import { Box, Button, Stack } from '@mui/material'
import { SizeType, WidgetType } from '@/types/ITeamDnDLayout'
import TmpTextWidget from '@/app/teams/@main/[id]/panel/widgets/TmpTextWidget'
import { useCallback, useState } from 'react'
import { sizeRatio } from '@/app/teams/@main/[id]/panel/TeamDnD'
import TmpNoticeWidget from '@/app/teams/@main/[id]/panel/widgets/TmpNoticeWidget'
import TmpBoardWidget from '@/app/teams/@main/[id]/panel/widgets/TmpBoardWidget'
import TmpCalenderWidget from '@/app/teams/@main/[id]/panel/widgets/TmpCalenderWidget'
import TmpAttendWidget from '@/app/teams/@main/[id]/panel/widgets/TmpAttendWidget'
import TmpImageWidget from '@/app/teams/@main/[id]/panel/widgets/TmpImageWidget'
import TmpLinkWidget from '@/app/teams/@main/[id]/panel/widgets/TmpLinkWidget'

interface ITeamDnDWidgetListProps {
  setIsDropping: (isDropping: boolean) => void
  type: WidgetType
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
  type,
  setType,
  setSize,
  setDroppingItem,
}: ITeamDnDWidgetListProps) => {
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

  const onDragStart = useCallback(
    (e: any, wgType: WidgetType) => {
      setIsDropping(true)
      setType(wgType)
      setSize(toolSize[wgType] ?? 'S')
      if (toolSize[wgType] === 'L')
        setDroppingItem({ i: '__dropping-elem__', w: 2, h: 2 })
      else if (toolSize[wgType] === 'M')
        setDroppingItem({ i: '__dropping-elem__', w: 2, h: 1 })
      else setDroppingItem({ i: '__dropping-elem__', w: 1, h: 1 })
      e.dataTransfer.setData('text/plain', '')
    },
    [setDroppingItem, setIsDropping, setType, toolSize, setSize],
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
        {typeList?.map((typeValue: WidgetType) => (
          <Box key={typeValue} bgcolor={'lightgray'}>
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
                {typeValue === 'notice' && (
                  <TmpNoticeWidget
                    data={null}
                    size={toolSize[typeValue] ?? 'S'}
                  />
                )}
                {typeValue === 'board' && (
                  <TmpBoardWidget
                    data={null}
                    size={toolSize[typeValue] ?? 'S'}
                  />
                )}
                {typeValue === 'calender' && (
                  <TmpCalenderWidget
                    data={null}
                    size={toolSize[typeValue] ?? 'S'}
                  />
                )}
                {typeValue === 'attendance' && (
                  <TmpAttendWidget
                    data={null}
                    size={toolSize[typeValue] ?? 'S'}
                  />
                )}
                {typeValue === 'text' && (
                  <TmpTextWidget
                    data={null}
                    size={toolSize[typeValue] ?? 'S'}
                  />
                )}
                {typeValue === 'image' && (
                  <TmpImageWidget
                    data={null}
                    size={toolSize[typeValue] ?? 'S'}
                  />
                )}
                {typeValue === 'linkTable' && (
                  <TmpLinkWidget
                    data={null}
                    size={toolSize[typeValue] ?? 'S'}
                  />
                )}
              </Stack>
            </Stack>
          </Box>
        ))}
      </Stack>
    </Box>
  )
}

export default WidgetList
