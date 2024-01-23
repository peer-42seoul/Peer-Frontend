'use client'

import useModal from '@/hook/useModal'
import { SizeType } from '@/types/ITeamDnDLayout'
import WidgetCard from '../WidgetCard'
import * as style from './index.style'

const BoardWidget = ({ size }: { size: SizeType }) => {
  const { isOpen, openModal, closeModal } = useModal()

  return (
    <>
      <WidgetCard contentSx={style.widgetContent} onClick={openModal}>
        <BoardWidgetRender size={size} />
      </WidgetCard>
      {/* 모달 */}
      {isOpen && <div onClick={closeModal}>Modal</div>}
    </>
  )
}

const BoardWidgetRender = ({ size }: { size: SizeType }) => {
  if (size === 'L') return <div>large widget</div>
  return <div>small widget</div>
}

export default BoardWidget
