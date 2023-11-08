import InfoModal from '@/components/common/modal/InfoModal'
import useModal from '@/hooks/useModal'
import { useRouter } from 'next/navigation'

const NicknameChangeInfoModal = () => {
  const { handleCloseModal } = useModal()
  const router = useRouter()
  const handleModalButton = () => {
    handleCloseModal()
    router.push('/mypage/myprofile')
  }

  return (
    <InfoModal buttonText="변경하러가기" onClick={handleModalButton}>
      원활한 서비스 이용을 위해
      <br /> 닉네임 변경이 필요해요.
    </InfoModal>
  )
}

export default NicknameChangeInfoModal
