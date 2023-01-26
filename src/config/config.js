import axios from 'axios'

const app_api = axios.create({
  baseURL:
     'http://demo.api.cogoport.umehta.xyz/',
})


app_api.interceptors.request.use((config) => {
  if (!!localStorage.getItem('cogoportKey')) {
    let cp_user = JSON.parse(localStorage.getItem('cogoportKey'))
    let token = cp_user['Authorization']
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default app_api
