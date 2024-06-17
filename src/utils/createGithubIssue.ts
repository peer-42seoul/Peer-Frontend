import { ISkill } from '@/types/IUserProfile'
import { Octokit } from 'octokit'

const BASE_URL = 'http://127.0.0.1:3000' // 배포 시에는 실제 URL로 변경

const octokit = new Octokit({
  auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN,
})

type githubIssueData = {
  title: string
  userName: string
  content: string
  link: string
  type: string
  tagList: Array<ISkill>
}

type githubIssueBodyProps = Omit<githubIssueData, 'title'>

const generateIssueBody = ({
  userName,
  content,
  link,
  type,
  tagList,
}: githubIssueBodyProps) => {
  const imageRegex = /!\[.*?\]\(.*?\)/g
  const removedImageContent = content.replaceAll(imageRegex, '')
  return ` # 새 ${
    type === 'STUDY' ? '스터디' : '프로젝트'
  } 모집글이 올라왔어요 😊

  🔗 [자세한 내용은 peer에서!](${BASE_URL}${link})
  
  👤 ${userName}

  ${tagList.length > 0 ? '🏷️ ' + tagList.map((tag) => tag.name).join(', ') : ''}

  ---

  ${removedImageContent}

  `
}

export const createGithubIssue = async ({
  title,
  userName,
  content,
  link,
  type,
  tagList,
}: githubIssueData) => {
  const body = generateIssueBody({
    userName,
    content,
    link,
    type,
    tagList,
  })
  try {
    await octokit.rest.issues.create({
      owner: 'peer-42seoul',
      repo: 'issue-noti',
      title,
      body,
    })
  } catch (error) {
    // 이슈 생성에 실패했을 때 에러 처리 논의 필요함.
    console.error(error)
  }
}
