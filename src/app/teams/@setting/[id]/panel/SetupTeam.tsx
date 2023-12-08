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
