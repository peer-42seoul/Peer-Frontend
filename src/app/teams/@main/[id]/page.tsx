'use client'

import TeamInfoContainer from './panel/TeamInfoContainer'

const TeamsPage = ({ params }: { params: { id: string } }) => {
  const { id } = params

  return (
    <>
      {/* <Typography>팀 페이지</Typography> */}
      {/* <Typography>{id}</Typography> */}
      <TeamInfoContainer id={Number(id)} />
    </>
  )
}

export default TeamsPage
