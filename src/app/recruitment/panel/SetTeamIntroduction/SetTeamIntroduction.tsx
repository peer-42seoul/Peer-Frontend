import React, { SetStateAction } from 'react'
import MDEditor from '@uiw/react-md-editor'

const SetTeamIntroduction = ({
  value,
  setValue,
}: {
  value: string
  setValue: React.Dispatch<SetStateAction<string>>
}) => {
  return (
    <div className="container">
      <MDEditor
        height={200}
        value={value}
        onChange={(newValue) => setValue(newValue || '')}
      />
    </div>
  )
}

export default SetTeamIntroduction
