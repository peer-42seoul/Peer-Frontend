import { Box, Input } from '@mui/material'

interface TeamDnDWidgetListProps {
  widgetSize: number
  setIsDropping: (isDropping: boolean) => void
  setType: (type: 'input' | 'image') => void
}
const TeamDnDWidgetList = ({
  widgetSize,
  setIsDropping,
  setType,
}: TeamDnDWidgetListProps) => {
  return (
    <Box
      marginBottom={2}
      style={{
        backgroundColor: 'skyblue',
        padding: 10,
        display: 'flex',
        maxHeight: 600,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: widgetSize,
          height: widgetSize,
          display: 'flex',
          alignItems: 'center',
          margin: 10,
        }}
        className="droppable-element"
        draggable={true} //true면 드래그 가능
        unselectable="on"
        onDragStart={(e) => {
          console.log('onDragStart!!!!!!!')
          setIsDropping(true)
          e.dataTransfer.setData('text/plain', '')
          setType('input')
        }}
      >
        <Input fullWidth sx={{ height: '100%' }} />
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          margin: 10,
        }}
        className="droppable-element"
        draggable={true}
        unselectable="on"
        onDragStart={(e) => {
          setIsDropping(true)
          console.log('onDragStart!!!!!!!')
          e.dataTransfer.setData('text/plain', '')
          setType('image')
        }}
        onDragEnd={(e) => {
          console.log('onDragEnd!!!!!!!')
          setIsDropping(false)
        }}
      >
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDq_on3TrwHVzian3yE6f4SENJOCgz45oaHw&usqp=CAU"
          alt="beluga"
          width={widgetSize}
          height={widgetSize}
        />
      </div>
    </Box>
  )
}

export default TeamDnDWidgetList
