import { Octokit } from 'octokit'

const BASE_URL = 'http://127.0.0.1' // 배포 시에는 실제 URL로 변경

const octokit = new Octokit({
  auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN,
})

type githubIssueData = {
  title: string
  userName: string
  content: string
  link: string
}

const generateIssueBody = ({
  title,
  userName,
  content,
  link,
}: githubIssueData) => {
  const sliceContent = content.slice(0, 20)
  return ` # 새 글이 올라왔어요😊
  
  ## ${title}

  작성자: ${userName}

  ---

  ${sliceContent}

  ---

  🔗 [모집글 바로가기](${BASE_URL}${link})
  `
}

export const createGithubIssue = async ({
  title,
  userName,
  content,
  link,
}: githubIssueData) => {
  const body = generateIssueBody({ title, userName, content, link })
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
