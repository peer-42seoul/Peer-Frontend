declare module '@toast-ui/editor' {
  export class Editor {
    constructor(options: any)
    // 필요한 메소드나 속성을 추가하세요.
    getHtml(): string
    getMarkdown(): string
    setMarkdown(markdown: string): void
    setHtml(html: string): void
    on(event: string, callback: Function): void
    destroy(): void
  }
}
