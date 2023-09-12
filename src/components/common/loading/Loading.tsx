import { Oval } from 'react-loader-spinner'

const Loading = ({
  size,
  strokeWidth,
}: {
  size?: number
  strokeWidth?: number
}) => {
  return (
    <Oval
      height={size ? size : 24}
      width={size ? size : 24}
      color="#FFC301"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#FFF8DB"
      strokeWidth={strokeWidth ? strokeWidth : 4}
      strokeWidthSecondary={strokeWidth ? strokeWidth : 4}
    />
  )
}

export default Loading
