import styles from './detailInfo.module.css'

const EvaluationInfo = ({ score }: { score: number }) => {
  return (
    <div className={styles.list}>
      <div className={styles.item}>
        {score === 0 ? (
          <p className={styles.scoreNull}>아직 평가정보가 없습니다.</p>
        ) : (
          <>
            <p className={styles.title}>팀원평균점수</p>
            <p className={styles.score}>
              <span>{score}</span>
              /25 점
            </p>
          </>
        )}
      </div>
    </div>
  )
}

export default EvaluationInfo
