import Skills from './Skills'
import ProfileLinksSection from './ProfileLinksSection'
import CuButton from '@/components/CuButton'
import { IUserProfileLink } from '@/types/IUserProfile'
import TitleBox from '@/components/TitleBox'

const MyInfoCard = ({
  linkList,
  setModalType,
  handleLogout,
  isEditable,
}: {
  linkList: Array<IUserProfileLink>
  setModalType: (type: string) => void | null
  handleLogout: () => void
  isEditable: boolean
}) => {
  return (
    <TitleBox title={isEditable ? '내 정보' : '정보'}>
      <Skills setModalType={setModalType} isEditable={isEditable} />
      <ProfileLinksSection
        linkList={linkList}
        setModalType={setModalType}
        isEditable={isEditable}
      />
      {isEditable && (
        <CuButton variant="text" action={handleLogout} message="로그아웃" />
      )}
    </TitleBox>
  )
}

export default MyInfoCard
