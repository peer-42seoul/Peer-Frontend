declare module '@toast-ui/editor/dist/toastui-editor-viewer' {
  /**
   * @description viewer에 필요한 옵션들을 추가해주세요.
   * @see https://nhn.github.io/tui.editor/latest/ToastUIEditorViewer
   */
  export interface IViewerOptions {
    el?: HTMLElement
    initialValue?: string
    height?: string
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
