export default function () {
  const token = localStorage.getItem('JWT')
  const config = {
    Authorization: `Bearer ${token}`
  }
  return config
}