import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

axios.defaults.baseURL = process.env.REACT_APP_API_URL
const useInterceptors = process.env.INTERCEPTORS_ENABLED

useInterceptors &&
  axios.interceptors.response.use(
    response => {
      if (response.status === 200 || response.status === 201) {
        response.data.message && toast.success(response.data.message)
        console.log('response.data.message')
      }
      return response
    },
    error => {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message)
        const errors = error.response.data.errors
        if (errors) {
          for (var key of Object.keys(errors)) {
            toast.error(key + ':' + errors[key])
          }
        }
      }
      const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      if (!expectedError) {
        console.log(error)
        toast.error(error.message)
      }
      if (error.response && error.response.status === 403) {
        toast.error('Access denied')
        window.location.href = '/denied'
      }
      if (error.response && error.response.status === 404) {
        toast.error('404: Not Found')
        window.location.href = '/notfound'
      }
      if (error.response && error.response.status === 500) {
        toast.error('Server error')
        console.log(error)
        window.location.href = '/server-error'
      }
      return Promise.reject(error)
    }
  )

export const post = axios.post
export const get = axios.get
export const put = axios.put
export const del = axios.delete

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
}
