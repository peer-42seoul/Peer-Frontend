import {
  Button,
  Container,
  Modal,
  Stack,
  TextField,
  Typography,
} from '@mui/material'

interface props {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  writeMode: React.MutableRefObject<string>,
  tagName: string,
  setTagName: React.Dispatch<React.SetStateAction<string>>,
  tagColor: string,
  setTagColor: React.Dispatch<React.SetStateAction<string>>,
  onHandleSubmit: () => void,
  style: any,
}

const NewTag = ({
  open,
  setOpen,
  writeMode,
  tagName,
  setTagName,
  tagColor,
  setTagColor,
  onHandleSubmit,
  style,
}: props) => {
    return (
      <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="새 태그 작성"
      aria-describedby="새 태그를 작성할 수 있는 모달입니다."
    >
      <Container sx={style}>
        <Typography variant={'h4'} align="center">
          {writeMode.current === 'write'
            ? '새 태그 추가하기'
            : '태그 수정하기'}
        </Typography>
        <Typography variant={'Body1'} align="center">
          태그 이름
        </Typography>
        <TextField
          value={tagName}
          sx={{ display: 'flex', justifyContent: 'center' }}
          onChange={(e) => setTagName(e.target.value)}
        />
        <Typography variant={'Body1'} align="center">
          태그 색상
        </Typography>
        <TextField
          value={tagColor}
          sx={{ display: 'flex', justifyContent: 'center' }}
          onChange={(e) => setTagColor(e.target.value)}
        />
        <Stack direction={'row'} justifyContent={'flex-end'}>
          <Button variant={'contained'} onClick={() => setOpen(false)}>
            취소
          </Button>
          <Button variant={'contained'} onClick={() => onHandleSubmit()}>
            등록
          </Button>
        </Stack>
      </Container>
    </Modal>
    )
}

export default NewTag