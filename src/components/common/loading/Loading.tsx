import { Oval } from 'react-loader-spinner'

const Loading = () => {
  return (
    <Oval
      height={24}
      width={24}
      color="#FFC301"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#FFF8DB"
      strokeWidth={4}
      strokeWidthSecondary={4}
    />
  )
}

export default Loading
