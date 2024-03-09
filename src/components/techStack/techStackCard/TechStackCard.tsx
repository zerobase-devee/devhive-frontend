import Image, { StaticImageData } from 'next/image'
import styles from './techStackCard.module.css'

interface TechStackCardProps {
  name: string
  imageUrl: string | StaticImageData
}

const TechStackCard = ({ name, imageUrl }: TechStackCardProps) => {
  return (
    <div className={styles.techStack}>
      <Image src={imageUrl} alt={name} width={20} height={20} />
      {name}
    </div>
  )
}

export default TechStackCard
