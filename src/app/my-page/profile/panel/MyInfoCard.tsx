import Skills from './Skills'
import ProfileLinksSection from './ProfileLinksSection'
import CuButton from '@/components/CuButton'
import { IUserProfileLink } from '@/types/IUserProfile'
import TitleBox from '@/components/TitleBox'

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
    <TitleBox title="내 정보">
      <Skills setModalType={setModalType} />
      <ProfileLinksSection linkList={linkList} setModalType={setModalType} />
      <CuButton variant="text" action={handleLogout} message="로그아웃" />
    </TitleBox>
  )
}

export default MyInfoCard
