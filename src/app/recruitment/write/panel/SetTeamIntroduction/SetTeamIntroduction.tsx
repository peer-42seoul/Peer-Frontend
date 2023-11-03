// import React, { SetStateAction } from 'react'
// import { useRef } from 'react';
// import '@toast-ui/editor/dist/toastui-editor.css';
// // import { Editor } from '@toast-ui/react-editor';

// const SetTeamIntroduction = ({
//   setValue,
// }: {
//   setValue: React.Dispatch<SetStateAction<string>>
// }) => {
//   const editorRef = useRef<Editor>(null);

//   const handleChange = () => {
//     if (editorRef.current) {
//       const editorInstance = editorRef.current.getInstance();
//       const newContent = editorInstance.getMarkdown();
//       setValue(newContent);
//     }
//   };

//   return (
//     <>
//       <Editor
//         previewStyle="vertical"
//         height="600px"
//         initialEditType="markdown"
//         placeholder="Write here..."
//         ref={editorRef}
//         hooks={{
//           change: handleChange,
//         }}
//       />
//     </>
//   );
// }

// export default SetTeamIntroduction
