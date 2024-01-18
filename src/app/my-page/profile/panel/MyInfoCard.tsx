import Skills from './Skills'
import ProfileLinksSection from './ProfileLinksSection'
import CuButton from '@/components/CuButton'
import { IUserProfileLink } from '@/types/IUserProfile'
import TitleBox from '@/components/TitleBox'
import { ITag } from '@/types/IPostDetail'

const MyInfoCard = ({
  linkList,
  skillList,
  setModalType,
  handleLogout,
}: {
  linkList: Array<IUserProfileLink>
  skillList: Array<ITag>
  setModalType: (type: string) => void
  handleLogout: () => void
}) => {
  return (
    <TitleBox title="내 정보">
      <Skills setModalType={setModalType} skillList={skillList} />
      <ProfileLinksSection linkList={linkList} setModalType={setModalType} />
      <CuButton variant="text" action={handleLogout} message="로그아웃" />
    </TitleBox>
  )
}

export default MyInfoCard
