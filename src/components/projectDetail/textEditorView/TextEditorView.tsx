import dynamic from 'next/dynamic'
import styles from './textEditorView.module.css'

const TextEditorDisplay = dynamic(() => import('react-quill'), {
  ssr: false,
})

const TextEditorView = ({ content }: { content: string }) => {
  const modules = {
    toolbar: false,
  }

  return (
    <div className={styles.container}>
      <TextEditorDisplay
        className={styles.quill}
        value={content}
        readOnly
        modules={modules}
      />
    </div>
  )
}

export default TextEditorView
