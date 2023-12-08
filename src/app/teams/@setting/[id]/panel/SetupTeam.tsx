'use client'

import { TeamOperationForm, TeamStatus, TeamType } from '../../../types/types'
import SetupStudy from './SetupStudy'
import SetupProject from './SetupProject'

export interface ISetupTeam {
  id: string
  type: TeamType
  name: string
  maxMember: String
  status: TeamStatus
  dueTo: string
  operationForm: TeamOperationForm
  region: string[]
  teamImage: string | null
}

const SetupTeam = ({ team }: { team: ISetupTeam }) => {
  // useEffect(() => {
  //   window.history.pushState(null, '', location.href)

  //   window.onpopstate = () => {
  //     if (isEdit) {
  //       console.log("You can't go back")
  //       history.go(1)

  //       alert('팀 정보 수정을 완료해주세요.')
  //     }
  //   }
  // }, [isEdit])

  return (
    <>
      {team.type === TeamType.STUDY ? (
        <SetupStudy team={team} />
      ) : (
        <SetupProject team={team} />
      )}
    </>
  )
}

export default SetupTeam
