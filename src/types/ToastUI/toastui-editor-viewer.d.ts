declare module '@toast-ui/editor/dist/toastui-editor-viewer' {
  import { SxProps } from '@mui/material'
  /**
   * @description viewer에 필요한 옵션들을 추가해주세요.
   * @see https://nhn.github.io/tui.editor/latest/ToastUIEditorViewer
   * @property sx - viewer 컴포넌트(box)에 적용할 수 있는 스타일 속성
   * @property typographySx - viewer 컴포넌트 내부의 글자에 적용할 수 있는 스타일 속성
   */
  export interface IViewerOptions {
    el?: HTMLElement
    initialValue?: string
    height?: string
    sx?: SxProps
    typographySx?: SxProps
  }
  /**
   * @description viewer에 필요한 메소드나 속성을 추가해주세요.
   * @see https://nhn.github.io/tui.editor/latest/ToastUIEditorViewer
   */
  export default class Viewer {
    constructor(options: IViewerOptions)
    destroy(): void
  }
}
