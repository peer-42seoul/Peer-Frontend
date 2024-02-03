import { Button } from '@mui/material'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'
import { Dispatch, MutableRefObject, SetStateAction } from 'react'

interface Props {
  page: number
  setPage: Dispatch<SetStateAction<number>>
  // pageFourth: MutableRefObject<boolean>
  // pageFifth: MutableRefObject<boolean>
  pageFourth: boolean
  pageFifth: boolean
  totalPage: number
}

const PageButton = ({ page, setPage, pageFourth, pageFifth, totalPage }: Props) => {
  const onSelectingPage = (currentPage: number) => {
    setPage(currentPage)
  }

  return (
    <>
      <Button onClick={() => onSelectingPage(1)}>
        <KeyboardDoubleArrowLeftIcon />
      </Button>
      {page >= 3 ? (
        <Button onClick={() => onSelectingPage(page - 2)}>{page - 2}</Button>
      ) : null}
      {page >= 2 ? (
        <Button onClick={() => onSelectingPage(page - 1)}>{page - 1}</Button>
      ) : null}
      <Button disabled={true}>{page}</Button>
      {pageFourth === true ? (
        <Button onClick={() => onSelectingPage(page + 1)}>{page + 1}</Button>
      ) : null}
      {pageFifth === true ? (
        <Button onClick={() => onSelectingPage(page + 2)}>{page + 2}</Button>
      ) : null}
      <Button onClick={() => onSelectingPage(totalPage)}>
        <KeyboardDoubleArrowRightIcon />
      </Button>
    </>
  )
}

export default PageButton
