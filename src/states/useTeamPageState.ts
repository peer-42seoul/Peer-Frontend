import { create } from 'zustand'

type TTeamPageLayout = 'SIDEBAR' | 'FULLPAGE'
type TboardType = 'LIST' | 'DETAIL' | 'EDIT'

/**
 * Team page state
 * @property layout - 팀 페이지 레이아웃 : 사이드바, 풀페이지
 * @property boardType - (게시판과 공지사항에서) 현재 선택된 게시판 타입
 * @property boardId - (게시판에서) 현재 선택된 게시판 아이디
 * @property postId - (게시판과 공지사항에서) 현재 선택된 게시글 아이디
 * @function resetState - 초기화
 * @function setNotice - 공지사항 레이아웃으로 변경 (공지사항 상세글 보기, 공지사항 작성, 공지사항 수정)
 * @function setBoard - 게시판 레이아웃으로 변경 (게시판 상세글 보기, 게시판 작성, 게시판 수정)
 */
interface ITeamPageState {
  layout: TTeamPageLayout
  // boardType: 'BOARD' | 'NOTICE'
  boardType: TboardType
  boardId: number | undefined
  postId: number | undefined
  resetState: () => void
  setNotice: (boardType: TboardType, postId?: number) => void
  setBoard: (boardType: TboardType, boardId: number, postId?: number) => void
}

const useTeamPageState = create<ITeamPageState>((set) => ({
  layout: 'SIDEBAR',
  // boardType: 'NOTICE',
  boardType: 'LIST',
  // boardId: undefined,
  boardId: 1,
  postId: undefined,
  resetState: () =>
    set({
      layout: 'SIDEBAR',
      boardType: 'LIST',
      boardId: undefined,
      postId: undefined,
    }),
  setNotice: (boardType, postId) =>
    set({
      layout: boardType === 'LIST' ? 'SIDEBAR' : 'FULLPAGE',
      boardType,
      boardId: undefined,
      postId,
    }),
  setBoard: (boardType, boardId, postId) =>
    set({
      layout: boardType === 'LIST' ? 'SIDEBAR' : 'FULLPAGE',
      boardType: 'LIST',
      boardId,
      postId,
    }),
}))

export default useTeamPageState
