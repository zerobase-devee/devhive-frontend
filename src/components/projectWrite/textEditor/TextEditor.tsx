import { useMemo, useRef, useState } from 'react'
import styles from './textEditor.module.css'
import Quill from 'react-quill'
import axios, { AxiosError } from 'axios'
import InfoModal from '@/components/common/modal/InfoModal'
import useModal from '@/hooks/useModal'
import { MAX_SIZE_IN_BYTES } from '@/constants/maxSizeInBytes'

interface TextEditorProps {
  value: string
  onChange: () => void
  errors: boolean
}

const TextEditor = ({ value, onChange, errors }: TextEditorProps) => {
  const quillRef = useRef<any>(null)
  const [uploaded, setUploaded] = useState(false)
  const { handleCloseModals, openModals, handleOpenModals } = useModal()

  const imageHandler = async () => {
    let quill = quillRef.current?.getEditor()
    const editorHtml = quill?.root.innerHTML
    if (editorHtml.includes('<img')) {
      setUploaded(true)
      handleOpenModals('개수제한')
      return
    }

    if (uploaded) {
      handleOpenModals('개수제한')
      return
    }

    const input = document.createElement('input')
    const formData = new FormData()
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()

    input.onchange = async () => {
      const file = input.files
      if (file !== null) {
        const selectedFile = file[0]
        if (selectedFile.size > MAX_SIZE_IN_BYTES) {
          handleOpenModals('용량제한')
          return
        }

        formData.append('image', selectedFile)
      }
      try {
        const res = await axios.post('/api/projects/image', formData)
        let url = res.data.url
        const range = quillRef.current?.getEditor().getSelection()?.index
        if (range !== null && range !== undefined) {
          quill?.setSelection(range, 1)
          quill?.clipboard.dangerouslyPasteHTML(
            range,
            `<img src=${url} alt="게시글이미지" />`,
          )
        }

        return { ...res, success: true }
      } catch (error) {
        const err = error as AxiosError
        return { ...err.response, success: false }
      }
    }
  }

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: '1' }, { header: '2' }],
          [{ size: [] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
          ],
          ['link', 'image'],
          ['clean'],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }
  }, [])

  const formats = [
    'header',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
  ]
  return (
    <>
      {openModals['개수제한'] && (
        <InfoModal
          onClick={() => handleCloseModals('개수제한')}
          buttonText="확인"
        >
          이미지는 1개까지만 <br /> 업로드할 수 있어요.
        </InfoModal>
      )}
      {openModals['용량제한'] && (
        <InfoModal
          onClick={() => handleCloseModals('용량제한')}
          buttonText="확인"
        >
          이미지는 최대 5MB까지 <br /> 업로드할 수 있어요.
        </InfoModal>
      )}
      <Quill
        ref={quillRef}
        className={`${styles.editor} ${errors && styles.error}`}
        placeholder="프로젝트에 대해 설명해주세요."
        modules={modules}
        formats={formats}
        value={value}
        onChange={onChange}
        theme="snow"
      />
    </>
  )
}

export default TextEditor
