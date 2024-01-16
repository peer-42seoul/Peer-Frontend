import { create } from 'zustand'
import { Editor, IEditorOptions } from '@toast-ui/editor'

interface IEditorState {
  editor: Editor | null
  setEditor: (props: IEditorOptions) => void
  resetEditor: () => void
}

const useEditorState = create<IEditorState>((set) => ({
  editor: null,
  setEditor: (props) => {
    set({
      editor: new Editor({
        ...props,
      }),
    })
  },
  resetEditor: () => set({ editor: null }),
}))

export default useEditorState
