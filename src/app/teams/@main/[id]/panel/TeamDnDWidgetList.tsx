import { Box, Button, Stack } from '@mui/material'
import { SizeType, WidgetType } from '@/types/ITeamDnDLayout'
import TmpWidget from '@/app/teams/@main/[id]/panel/TmpWidget'
import { useCallback, useState } from 'react'
import { sizeRatio } from '@/app/teams/@main/[id]/panel/TeamDnD'

interface ITeamDnDWidgetListProps {
  widgetSize: number
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
const TeamDnDWidgetList = ({
  widgetSize,
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
  console.log('toolSize', toolSize)

  const onDragStart = useCallback(
    (e: any) => {
      setIsDropping(true)
      setType('text')
      console.log('type', type)
      console.log('tool!?!?', toolSize['text'])
      setSize(toolSize[type] ?? 'S')
      console.log('size!!!', toolSize[type])
      if (toolSize[type] === 'L')
        setDroppingItem({ i: '__dropping-elem__', w: 2, h: 2 })
      else if (toolSize[type] === 'M')
        setDroppingItem({ i: '__dropping-elem__', w: 2, h: 1 })
      else setDroppingItem({ i: '__dropping-elem__', w: 1, h: 1 })
      e.dataTransfer.setData('text/plain', '')
    },
    [setIsDropping, setType, type, toolSize, setSize, setDroppingItem],
  )

  return (
    <Box bgcolor={'skyblue'} padding={1}>
      <Stack
        height={widgetSize}
        width={widgetSize}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Stack direction={'row'} gap={1}>
          {['S', 'M', 'L'].map((size) => (
            <Button
              key={size}
              variant="outlined"
              onClick={() => {
                setToolSize({ ...toolSize, text: size as SizeType })
              }}
            >
              {size}
            </Button>
          ))}
        </Stack>
        <Stack flex={1} alignItems={'center'} justifyContent={'center'}>
          <Stack
            margin={1}
            flexDirection={'row'}
            bgcolor={'white'}
            height={widgetSize * 0.38 * sizeRatio[toolSize[type] ?? 'S'].w}
            width={widgetSize * 0.38 * sizeRatio[toolSize[type] ?? 'S'].h}
            className="droppable-element"
            draggable={true}
            unselectable="on"
            onDragStart={onDragStart}
            onDragEnd={() => {
              setIsDropping(false)
            }}
          >
            <TmpWidget data={null} size={toolSize[type] ?? 'S'} />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  )
}

export default TeamDnDWidgetList
