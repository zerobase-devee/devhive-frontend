import Head from 'next/head'
import styles from '@/styles/pages/home.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Home = () => {
  const [data, setData] = useState('')

  const getData = async () => {
    try {
      const response = await axios.get('/api/data')
      setData(response.data.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <Head>
        <title>devHive</title>
        <meta name="description" content="devHive-개발자 프로잭트 커뮤니티" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <div className={styles.slider}>슬라이더 영역</div>
        <div className={styles.inner}>data: {data}</div>
      </div>
    </>
  )
}

export default Home
