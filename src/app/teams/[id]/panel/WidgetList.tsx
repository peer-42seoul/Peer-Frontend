import { Box, Button, Stack, Typography } from '@mui/material'
import { SizeType, WidgetType } from '@/types/ITeamDnDLayout'
import { useCallback, useState } from 'react'
import { sizeRatio } from '@/app/teams/[id]/panel/TeamDnD'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import useMedia from '@/hook/useMedia'
import { SizeButton } from '@/app/teams/[id]/panel/TeamDnD.style'
import SelectedWidget from '@/app/teams/[id]/panel/SelectedWidget'

interface IToolSizeType {
  notice: SizeType
  board: SizeType
  calender: SizeType
  attendance: SizeType
  text: SizeType
  image: SizeType
  linkTable: SizeType
}

interface ITeamDnDWidgetListProps {
  setIsDropping: (isDropping: boolean) => void
  setType: (type: WidgetType) => void
  setSize: (size: SizeType) => void
  setDroppingItem: any
}

/* 툴 박스 */
const WidgetList = ({
  setIsDropping,
  setType,
  setSize,
  setDroppingItem,
}: ITeamDnDWidgetListProps) => {
  const { isPc, isOverTablet } = useMedia()
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
    // 'board',
    // 'calender',
    // 'attendance',
    'text',
    'image',
    // 'linkTable',
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: isPc ? 3 : isOverTablet ? 2 : 1,
    slidesToScroll: 1,
  }

  return (
    <Box
      width={'100%'}
      sx={{
        backgroundColor: 'background.secondary',
      }}
    >
      <Stack padding={'1rem'}>
        <Typography variant={'Body2Emphasis'}>
          원하는 위젯과 사이즈를 선택해서 원하는 위치에 드래그하세요.
        </Typography>
        <Slider {...settings}>
          {/*툴 박스 렌더링*/}
          {typeList?.map((typeValue: WidgetType) => (
            <div key={typeValue}>
              <Stack
                maxWidth={'15.25rem'}
                maxHeight={'15.25rem'}
                padding={'1rem'}
                spacing={'1rem'}
                justifyContent={'center'}
              >
                {/*사이즈 버튼 렌더링*/}
                <Stack flexDirection={'row'} justifyContent={'space-between'}>
                  <Typography variant={'Body2Emphasis'}>{typeValue}</Typography>
                  <Stack direction={'row'} spacing={'0.38rem'}>
                    {['S', 'M', 'L'].map((size) => (
                      <Button
                        sx={{
                          ...SizeButton,
                          backgroundColor:
                            toolSize[typeValue] === size
                              ? 'line.base'
                              : undefined,
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
                        <Typography
                          variant={'Body2'}
                          color={'text.alternative'}
                        >
                          {size}
                        </Typography>
                      </Button>
                    ))}
                  </Stack>
                </Stack>
                <Stack alignItems={'center'}>
                  <Stack
                    bgcolor={'background.primary'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    width={'10rem'}
                    height={'10rem'}
                    borderRadius={'0.44rem'}
                  >
                    {/*react grid layout에서 drop 가능한 아이템으로 만들기*/}
                    <Stack
                      key={typeValue}
                      margin={1}
                      flexDirection={'row'}
                      height={`calc(4rem * ${
                        sizeRatio[toolSize[typeValue] || 'S'].h
                      })`}
                      width={`calc(4rem * ${
                        sizeRatio[toolSize[typeValue] ?? 'S'].w
                      })`}
                      className="droppable-element"
                      draggable={true}
                      unselectable="on"
                      onDragStart={(e) => onDragStart(e, typeValue)}
                      onDragEnd={() => {
                        setIsDropping(false)
                      }}
                    >
                      <SelectedWidget
                        type={typeValue}
                        wgData={null}
                        wgSize={toolSize[typeValue] ?? 'S'}
                        wgKey={-1}
                      />
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </div>
          ))}
        </Slider>
      </Stack>
    </Box>
  )
}

export default WidgetList
