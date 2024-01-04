import dynamic from 'next/dynamic'
import { IViewerOptions } from '@toast-ui/editor/dist/toastui-editor-viewer'

const ToastViewer = dynamic(
  () => import('./ToastUIViewer'), // ToastViewer 컴포넌트의 경로
  { ssr: false }, // 서버 사이드 렌더링 비활성화
)

/**
 * SSR 환경에서 발생하는 충돌을 막기 위해서 dynamic import로 ToastViewer를 불러오는 컴포넌트
 */
const DynamicToastViewer = (props: IViewerOptions) => {
  return <ToastViewer {...props} />
}

export default DynamicToastViewer
