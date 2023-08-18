import LinkButton from '@/components/common/button/LinkButton'
import { BiSolidMessageAltError } from 'react-icons/bi'

const notFound = () => {
  return (
    <div className="container404">
      <BiSolidMessageAltError />
      <p>404</p>
      <LinkButton href="/" fill>
        메인페이지로
      </LinkButton>
    </div>
  )
}

export default notFound
