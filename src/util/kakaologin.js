import axios from "axios"
const kakaoHeader = {
  'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
}
export default async (code) => {
  console.log("loginWithKakao")
  try {
    const data = {
      grant_type: "authorization_code",
      client_id: "2b50e86d28347cf817b83084343f17a2",
      redirect_uri: "http://127.0.0.1:8080/accounts/login/",
      code: code,
    }
    const queryString = Object.keys(data)
      .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
      .join("&")
    const result = await axios.post(
      "https://kauth.kakao.com/oauth/token",
      queryString,
      { headers: kakaoHeader }
    )
    console.log("카카오 토큰", result)
    return result
  } catch (e) {
    console.dir(e)
  }
}
