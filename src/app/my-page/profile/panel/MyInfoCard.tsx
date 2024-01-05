import Skills from './Skills'
import ProfileLinksSection from './ProfileLinksSection'
import CuButton from '@/components/CuButton'
import { IUserProfileLink } from '@/types/IUserProfile'
import MessageWidget from '@/components/MessageWidget'

const MyInfoCard = ({
  linkList,
  setModalType,
  handleLogout,
}: {
  linkList: Array<IUserProfileLink>
  setModalType: (type: string) => void
  handleLogout: () => void
}) => {
  return (
    <MessageWidget title="내 정보">
      <Skills setModalType={setModalType} />
      <ProfileLinksSection linkList={linkList} setModalType={setModalType} />
      <CuButton variant="text" action={handleLogout} message="로그아웃" />
    </MessageWidget>
  )
}

export default MyInfoCard
