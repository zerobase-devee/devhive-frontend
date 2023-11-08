import styles from './skeletonCard.module.css'

const SkeletonCard = () => {
  return (
    <div className={styles.container}>
      {new Array(3).fill(0).map((_, index) => (
        <div key={`SkeletonCard_${index}`} className={styles.box} />
      ))}
    </div>
  )
}

export default SkeletonCard
