import React from 'react'
import NotifSetting from './panel/NotifSetting'
import DisplaySetting from './panel/DisplaySetting'
import KeywordSetting from './panel/KeywordSetting'

const HomepageSetting = () => {
  return (
    <div>
      <NotifSetting />
      <KeywordSetting />
      <DisplaySetting />
    </div>
  )
}

export default HomepageSetting
