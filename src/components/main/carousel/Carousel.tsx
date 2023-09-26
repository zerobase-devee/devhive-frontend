import React, { useState, useEffect } from 'react'
import styles from './carousel.module.css'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import LinkButton from '@/components/common/button/LinkButton'
import Image, { StaticImageData } from 'next/image'
import CarouselImg1 from 'public/images/carousel/carousel1.png'
import CarouselImg2 from 'public/images/carousel/carousel2.png'

const carouselContent = [
  {
    carouselId: 1,
    text1: 'devHive에서',
    text2: '원하는 프로젝트를 찾아보세요!',
    buttonText: '프로젝트보기',
    buttonHref: '/project',
    imageSrc: CarouselImg1 as StaticImageData,
    width: 303,
    height: 303,
    alt: '캐러셀이미지1',
  },
  {
    carouselId: 2,
    text1: 'devHive에서',
    text2: '이번달 랭킹 1등 확인하기',
    buttonText: '랭킹보기',
    buttonHref: '/rank',
    imageSrc: CarouselImg2 as StaticImageData,
    width: 247,
    height: 247,
    alt: '캐러셀이미지2',
  },
]

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % carouselContent.length
    setCurrentIndex(newIndex)
  }

  const prevSlide = () => {
    const newIndex =
      (currentIndex - 1 + carouselContent.length) % carouselContent.length
    setCurrentIndex(newIndex)
  }

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000)
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex])

  const content = carouselContent[currentIndex]

  return (
    <div
      className={`${styles.container} ${
        currentIndex === 0 ? styles.first : styles.second
      }`}
    >
      <div className={styles.carousel}>
        <div className={styles.slideItem}>
          <div className={styles.left}>
            <p className={styles.light}>{content.text1}</p>
            <p className={styles.bold}>{content.text2}</p>
            <LinkButton href={content.buttonHref} fill>
              {content.buttonText}
            </LinkButton>
          </div>
          <Image
            src={content.imageSrc}
            width={content.width}
            height={content.height}
            alt={content.alt}
            priority
          />
        </div>
        <div className={styles.controller}>
          <button className={styles.arrow} onClick={prevSlide}>
            <IoIosArrowBack />
          </button>
          <div className={styles.page}>
            <span>0{currentIndex + 1}</span>
            <span>|</span>
            <span>0{carouselContent.length}</span>
          </div>
          <button className={styles.arrow} onClick={nextSlide}>
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Carousel
