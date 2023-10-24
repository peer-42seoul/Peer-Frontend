import "@toast-ui/editor/dist/toastui-editor.css";
import { Viewer } from '@toast-ui/react-editor';

const ToastViewer = ({ initialValue }: { initialValue: string }) => {
    return <Viewer initialValue={initialValue} />;
};

export default ToastViewer;