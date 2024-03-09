import { useEffect, useState } from 'react'
import styles from './chattingRoom.module.css'
import { BsFillChatDotsFill } from 'react-icons/bs'
import SpeechBubble from '../speechBubble/SpeechBubble'
import { useForm } from 'react-hook-form'
import Button from '@/components/common/button/Button'
import { Client } from '@stomp/stompjs'
import { useCookies } from 'react-cookie'
import SockJS from 'sockjs-client'
import { ChatDataType } from '@/types/chat/chatDataType'
import { useRecoilValue } from 'recoil'
import { loginUserInfo } from '@/recoil/loginUserInfo'
import { useSearchParams } from 'next/navigation'
import { formatServerSendDate, formatDatetoHHMM } from '@/utils/formatDate'

interface chatData {
  message: string
}
interface ChattingRoomProps {
  selectedChat: boolean
}

const ChattingRoom = ({ selectedChat }: ChattingRoomProps) => {
  const [cookies] = useCookies()
  const [message, setMessage] = useState<ChatDataType>()
  const [enterMsg, setEnterMsg] = useState(false)
  const loginUser = useRecoilValue(loginUserInfo)
  const loginUserId = loginUser.userId
  const searchParmas = useSearchParams()
  const roomId = searchParmas.get('room')

  const client = new Client({
    brokerURL: 'ws://52.79.90.0:8080/chat',
    webSocketFactory: () => new SockJS('http://52.79.90.0:8080/chat'),
    connectHeaders: {
      Authorization: `${cookies.accessToken}`,
    },
    debug: (str) => {
      console.log(str)
    },
    reconnectDelay: 1000 * 30,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
  })

  const sendEnterMessage = () => {
    client.onConnect = () => {
      client.subscribe(`/sub/chat/${roomId}`, (message) => {
        const jsonString = message.body
        const chatMessage: ChatDataType = JSON.parse(jsonString)
        setMessage(chatMessage)
      })

      if (!enterMsg) {
        client.publish({
          destination: `/pub/message/enter/${roomId}/${loginUserId}`,
        })
        setEnterMsg(true)
      }
    }
  }

  sendEnterMessage()

  useEffect(() => {
    client.activate()
    client.onConnect = () => {
      client.subscribe(`/sub/chat/${roomId}`, (message) => {
        const jsonString = message.body
        const chatMessage: ChatDataType = JSON.parse(jsonString)
        setMessage(chatMessage)
      })
    }
    client.onStompError = (message) => {
      console.log('Broker reported error: ' + message)
      console.log('Additional details: ' + message.body)
    }

    return () => {
      client.deactivate()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setMessage])

  const { register, handleSubmit, watch, reset } = useForm<chatData>({
    mode: 'onChange',
  })

  const onSubmit = (data: chatData) => {
    if (!watch('message')) {
      return
    } else {
      client.onConnect = () => {
        const messageToSend = {
          text: data.message,
          sendTime: formatServerSendDate(new Date()),
          userDto: {
            userId: loginUser.userId,
            nickName: loginUser.nickName,
            profileImage: loginUser.profileImage,
          },
        }
        client.publish({
          destination: `/pub/message/${roomId}`,
          body: JSON.stringify(messageToSend),
        })
        reset()
      }
      client.activate()
    }
  }

  const formatDate = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const dayOfWeek = date.toLocaleDateString('ko-KR', { weekday: 'long' })

    return `${year}년 ${month}월 ${day}일 ${dayOfWeek}`
  }

  return selectedChat ? (
    <div className={styles.roomContainer}>
      <p className={styles.date}>{formatDate(new Date())}</p>
      <div className={styles.chat}>
        {message &&
          (message.userDto.userId === loginUserId ? (
            <SpeechBubble
              time={formatDatetoHHMM(message.sendTime)}
              received={false}
              nickname={message.userDto.nickName}
              profileImg={message.userDto.profileImage}
              message={message.text}
            />
          ) : (
            <SpeechBubble
              time={formatDatetoHHMM(message.sendTime)}
              received={true}
              nickname={message.userDto.nickName}
              profileImg={message.userDto.profileImage}
              message={message.text}
            />
          ))}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
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
  ) : (
    <div className={styles.container}>
      <BsFillChatDotsFill />
      <p>채팅방을 선택해주세요.</p>
    </div>
  )
}

export default ChattingRoom
