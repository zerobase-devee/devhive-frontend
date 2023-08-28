import { BiSearch } from 'react-icons/bi'
import styles from './searchBar.module.css'
import { useForm } from 'react-hook-form'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/router'
import { AiFillCloseCircle } from 'react-icons/ai'

interface SearchBarData {
  search: string
}

const SearchBar = () => {
  const pathname = usePathname()
  const router = useRouter()

  const { register, handleSubmit, reset, getValues, watch } =
    useForm<SearchBarData>({
      mode: 'onChange',
    })

  const onSubmit = (data: SearchBarData) => {
    if (watch('search')) {
      const queryString = new URLSearchParams()
      queryString.set('search', getValues('search'))
      router.push(pathname + '?' + queryString.toString())
      console.log(data)
    }
  }

  const onReset = () => {
    reset()
    router.push(pathname)
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <input
        placeholder="검색어를 입력해주세요."
        className={styles.search}
        type="text"
        {...register('search')}
      />
      <div className={styles.buttonArea}>
        {watch('search') && (
          <button
            className={`${styles.button} ${styles.resetButton}`}
            type="button"
            onClick={onReset}
          >
            <AiFillCloseCircle />
          </button>
        )}
        <button
          className={`${styles.button} ${styles.searchButton}`}
          type="submit"
        >
          <BiSearch />
        </button>
      </div>
    </form>
  )
}

export default SearchBar
