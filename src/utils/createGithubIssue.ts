import { Octokit } from 'octokit'

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
  const sliceContent = content.slice(0, 20) + '...'
  return `## ${title}

  작성자: ${userName}

  ${sliceContent}

  🔗 [모집글 바로가기](${link})
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
    console.info('GitHub 이슈를 성공적으로 생성했습니다.')
  } catch (error) {
    console.error(error)
  }
}
