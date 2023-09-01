import axios from 'axios'

export const onLogin = async (formData: {
  email: string
  password: string
}) => {
  try {
    const res = await axios({
      method: 'post',
      url: '/api/auth/signin',
      headers: {
        'content-type': 'application/json',
      },
      data: formData,
    })
    const authToken = res.data
    axios.defaults.headers.common['Authorization'] = `${authToken}`
    return res
  } catch (err) {
    console.log(err)
  }
}
