import { ISkill } from '@/types/IUserProfile'
import { Octokit } from 'octokit'

const BASE_URL = 'https://www.peer-study.co.kr'

/**
 * TS, Octokit 버전에 따라 타입 에러가 발생하는 경우가 있음
 * 직접적으로 사용하는 기능에서 발생한 사례는 없지만 참고하면 좋을 것 같아서 남깁니다.
 * octokit/octokit.js#2439 : string 타입 오류
 * octokit/octokit.js#1624 : v17 오류
 * octokit/octokit.js#2598 : import 에러
 */
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
  // FIXME : 테스트용
  console.log(process.env.NEXT_PUBLIC_GITHUB_TOKEN)
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
