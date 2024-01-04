declare module '@toast-ui/editor' {
  /**
   * @property el 에디터를 렌더링할 DOM 요소
   * @property initialValue 초기값
   * @property initialEditType 에디터 모드 (markdown, wysiwyg)
   * @property previewStyle (markdown 모드의 경우) 미리보기 스타일
   * @property height 에디터 높이 (기본값: '30rem')
   */
  export interface IEditorOptions {
    el?: HTMLElement
    initialValue?: string
    initialEditType?: 'markdown' | 'wysiwyg'
    previewStyle?: 'tab' | 'vertical'
    height?: string
  }

  export class Editor {
    constructor(options: IEditorOptions)
    // 필요한 메소드나 속성을 추가하세요.
    getHtml(): string
    getMarkdown(): string
    setMarkdown(markdown: string): void
    setHtml(html: string): void
    on(event: string, callback: Function): void
    destroy(): void
  }
}
