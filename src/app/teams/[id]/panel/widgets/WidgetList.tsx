import { Box, Button, Stack, Typography } from '@mui/material'
import { SizeType, WidgetType } from '@/types/ITeamDnDLayout'
import TmpTextWidget from '@/app/teams/[id]/panel/widgets/TmpTextWidget'
import { useCallback, useState } from 'react'
import { sizeRatio } from '@/app/teams/[id]/panel/TeamDnD'
import TmpNoticeWidget from '@/app/teams/[id]/panel/widgets/TmpNoticeWidget'
import TmpBoardWidget from '@/app/teams/[id]/panel/widgets/TmpBoardWidget'
import TmpCalenderWidget from '@/app/teams/[id]/panel/widgets/TmpCalenderWidget'
import TmpAttendWidget from '@/app/teams/[id]/panel/widgets/TmpAttendWidget'
import TmpImageWidget from '@/app/teams/[id]/panel/widgets/TmpImageWidget'
import TmpLinkWidget from '@/app/teams/[id]/panel/widgets/TmpLinkWidget'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

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
            <TmpCalenderWidget data={null} size={toolSize[typeValue] ?? 'S'} />
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  }

  return (
    <Box
      width={'100%'}
      // maxWidth={'908px'}
      sx={{
        backgroundColor: 'background.secondary',
      }}
    >
      <Stack padding={2} gap={2}>
        <Typography>
          원하는 위젯과 사이즈를 선택해서 원하는 위치에 드래그하세요.
        </Typography>
        <Slider {...settings}>
          {/*툴 박스 렌더링*/}
          {typeList?.map((typeValue: WidgetType) => (
            <Stack key={typeValue}>
              {/*사이즈 버튼 렌더링*/}
              <Stack flexDirection={'row'} justifyContent={'space-around'}>
                <Typography>{typeValue}</Typography>
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
                        setToolSize({
                          ...toolSize,
                          [typeValue]: size as SizeType,
                        })
                      }}
                    >
                      {size}
                    </Button>
                  ))}
                </Stack>
              </Stack>
              <Stack alignItems={'center'} justifyContent={'center'}>
                {/*react grid layout에서 drop 가능한 아이템으로 만들기*/}
                <Stack
                  key={typeValue}
                  margin={1}
                  flexDirection={'row'}
                  height={200 * 0.3 * sizeRatio[toolSize[typeValue] ?? 'S'].h}
                  width={200 * 0.3 * sizeRatio[toolSize[typeValue] ?? 'S'].w}
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
            </Stack>
          ))}
        </Slider>
      </Stack>
    </Box>
  )
}

export default WidgetList
