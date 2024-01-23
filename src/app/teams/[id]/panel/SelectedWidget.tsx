import { SizeType, WidgetType } from '@/types/ITeamDnDLayout'
import TmpNoticeWidget from '@/app/teams/[id]/panel/widgets/TmpNoticeWidget'
import TmpBoardWidget from '@/app/teams/[id]/panel/widgets/TmpBoardWidget'
import CalenderWidget from '@/app/teams/[id]/panel/widgets/CalenderWidget'
import TmpAttendWidget from '@/app/teams/[id]/panel/widgets/TmpAttendWidget'
import TextWidget from '@/app/teams/[id]/panel/widgets/TextWidget'
import ImageWidget from '@/app/teams/[id]/panel/widgets/ImageWidget'
import TmpLinkWidget from '@/app/teams/[id]/panel/widgets/TmpLinkWidget'
import React from 'react'

/* widget 가져오기 */
const SelectedWidget = ({
  type,
  wgData,
  wgSize,
  wgKey,
}: {
  type: WidgetType
  wgData: any
  wgSize: SizeType
  wgKey: number
}) => {
  switch (type) {
    case 'notice':
      return <TmpNoticeWidget data={wgData} size={wgSize} wgKey={wgKey} />
    case 'board':
      return <TmpBoardWidget data={wgData} size={wgSize} wgKey={wgKey} />
    case 'calender':
      return <CalenderWidget data={wgData} size={wgSize} />
    case 'attendance':
      return <TmpAttendWidget data={wgData} size={wgSize} wgKey={wgKey} />
    case 'text':
      return <TextWidget data={wgData} size={wgSize} wgKey={wgKey} />
    case 'image':
      return <ImageWidget data={wgData} size={wgSize} wgKey={wgKey} />
    case 'linkTable':
      return <TmpLinkWidget data={wgData} size={wgSize} wgKey={wgKey} />
    default:
      return <></>
  }
}

export default SelectedWidget
