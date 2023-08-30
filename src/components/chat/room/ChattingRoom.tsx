import { useState } from 'react'
import styles from './chattingRoom.module.css'
import { BsFillChatDotsFill } from 'react-icons/bs'
import SpeechBubble from '../speechBubble/SpeechBubble'
import { useForm } from 'react-hook-form'
import Button from '@/components/common/button/Button'

interface chatData {
  message: string
}

const ChattingRoom = () => {
  const [isChat, setIsChat] = useState(false)
  const [selectedChat, setSelectedChat] = useState(true)
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<chatData>({ mode: 'onChange' })

  const onSubmit = (data: chatData) => {
    if (!watch('message')) {
      return
    } else {
      console.log(data)
      reset()
    }
  }

  return selectedChat ? (
    <div className={styles.roomContainer}>
      <p className={styles.date}>2023년 8월 11일 금요일</p>
      <div className={styles.chat}>
        <SpeechBubble
          time="12:34"
          checkStatus={3}
          received={true}
          nickname="닉네임"
          profileImg={null}
          message="채팅"
        />
        <SpeechBubble
          time="12:34"
          checkStatus={3}
          received={true}
          nickname="닉네임"
          profileImg={null}
          message="채채채챛채ㅐㅊ채채채채채채채채채채채채채팅"
        />
        <SpeechBubble
          time="12:34"
          checkStatus={3}
          received={false}
          nickname="닉네임"
          profileImg={null}
          message="채티이이이이이잉이이이이"
        />
      </div>
      <form
        className={styles.messageform}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSubmit(onSubmit)()
          }
        }}
      >
        <textarea
          className={`${styles.messageInput}`}
          placeholder="메세지를 입력해주세요."
          {...register('message')}
        />
        <Button fill type="submit">
          전송
        </Button>
      </form>
    </div>
  ) : !isChat ? (
    <div className={styles.container}>
      <BsFillChatDotsFill />
      <p>아직 생성된 채팅방이 없어요.</p>
    </div>
  ) : (
    <div className={styles.container}>
      <BsFillChatDotsFill />
      <p>채팅방을 선택해주세요.</p>
    </div>
  )
}

export default ChattingRoom
