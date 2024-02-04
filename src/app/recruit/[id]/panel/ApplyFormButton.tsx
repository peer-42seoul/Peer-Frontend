import ApplyMenuButton from '@/app/recruit/[id]/panel/ApplyMenuButton'
import ApplyDefaultButton from '@/app/recruit/[id]/panel/ApplyDefaultButton'
import React, { useMemo } from 'react'
import RecruitFormModal from '@/app/recruit/[id]/panel/form/RecruitFormModal'
import useAuthStore from '@/states/useAuthStore'
import { useRouter } from 'next/navigation'
import { IRole, ProjectType } from '@/types/IPostDetail'
import ApplyDrawerButton from '@/app/recruit/[id]/panel/ApplyDrawerButton'

const ApplyFormButton = ({
  id,
  type,
  roleList,
  pc,
}: {
  id: string
  type: ProjectType
  roleList: IRole[]
  pc?: boolean
}) => {
  const { isLogin } = useAuthStore()
  const currentUrl = '/login?redirect=/recruit/1?type=' + type
  const router = useRouter()
  const [role, setRole] = React.useState<string | null>(null)
  const [open, setOpen] = React.useState(false)

  const checkIsFull = useMemo(
    () => roleList?.every((role: IRole) => role?.current >= role?.number),
    [roleList],
  )

  const handleApply = (selectedRole: string | null) => {
    if (!isLogin) router.push(currentUrl)
    else {
      setRole(selectedRole)
      setOpen(true)
    }
  }

  if (pc)
    return (
      <>
        <RecruitFormModal
          open={open}
          setOpen={setOpen}
          recruit_id={id}
          role={role}
        />
        {type === 'PROJECT' && roleList?.length ? (
          <ApplyMenuButton
            roleList={roleList}
            onApply={handleApply}
            disabled={checkIsFull}
            sx={{ width: '8.25rem', marginTop: '2rem' }}
          />
        ) : (
          <ApplyDefaultButton
            handleApply={handleApply}
            disabled={checkIsFull}
            sx={{ width: '6.785rem', marginTop: '2rem' }}
          />
        )}
      </>
    )

  return (
    <>
      <RecruitFormModal
        open={open}
        setOpen={setOpen}
        recruit_id={id}
        role={role}
      />
      {type === 'PROJECT' && roleList?.length ? (
        <ApplyDrawerButton
          handleApply={handleApply}
          roleList={roleList}
          disabled={checkIsFull}
        />
      ) : (
        <ApplyDefaultButton handleApply={handleApply} disabled={checkIsFull} />
      )}
    </>
  )
}

export default ApplyFormButton
