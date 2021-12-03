<template>
  <div class="d-flex justify-content-center my-5">
    <div class="card border-secondary mt-5" style="width: 25rem">
      <div class="card-header border-secondary border-1">
        <h3 class="mb-0 pt-1">회원가입</h3>
      </div>
      <div class="card-body pb-0">
        <div class="form-floating my-3">
          <input
            type="text"
            id="username"
            class="form-control shadow-sm"
            placeholder="ID"
            v-model="credentials.username"
            @keyup="keyupUsername"
          />
          <label for="username">아이디</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="password"
            id="password"
            class="form-control shadow-sm"
            v-model="credentials.password"
            placeholder="비밀번호"
            @keyup="checkLengthPass"
          />
          <label for="password">비밀번호</label>
        </div>
        <div class="form-floating mb-2">
          <input
            type="password"
            id="passwordConfirmation"
            class="form-control shadow-sm"
            v-model="credentials.passwordConfirmation"
            placeholder="Confirm Password"
            @keyup="checkSamePass"
            @keyup.enter="signup"
          />
          <label for="passwordConfirmation">비밀번호 확인</label>
        </div>
        <p class="error-msg">{{ errMsg }}</p>
      </div>
      <div class="card-body pt-0">
        <button @click="signup" class="my-button my-2">회원가입</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: "Signup",
  data: function () {
    return {
      credentials: {
        username: "",
        password: "",
        passwordConfirmation: "",
      },
      isError: false,
      errMsg: "",
    }
  },
  methods: {
    signup: function () {
      if (this.isError) {
        return
      }
      axios({
        method: "post",
        url: "/accounts/signup/",
        data: this.credentials,
      })
        .then((res) => {
          console.log(res)
          this.$router.push({ name: "Login" })
        })
        .catch((err) => {
          console.dir(err)
          this.isError = true
          this.errMsg = err.response.data.username[0]
        })
    },
    checkLengthPass: function () {
      if (this.credentials.password.length < 8) {
        this.isError = true
        this.errMsg = "비밀번호는 8자 이상이여야 합니다."
      } else {
        this.isError = false
        this.errMsg = ""
      }
    },
    checkSamePass: function () {
      if (this.credentials.password.length >= 8) {
        if (
          this.credentials.password !== this.credentials.passwordConfirmation
        ) {
          this.isError = true
          this.errMsg = "비밀번호가 서로 다릅니다."
        } else if (this.credentials.password.length >= 8) {
          this.isError = false
          this.errMsg = ""
        }
      }
    },
    keyupUsername: function () {
      this.isError = false
      this.errMsg = ""
    },
  },
}
</script>

<style scoped>
.error-msg {
  color: #ff003e;
  text-align: left;
  padding-left: 6px;
  font-size: 14px;
  height: 20px;
  margin-bottom: 10px;
}
.card-body {
  color: #2f2f2f !important;
}
.my-button {
  background-color: light;
  border: 1px;
  border-color: light;
  color: #2f2f2f;
  padding: 12px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1.5rem;
  margin: 1px 2px;
  cursor: pointer;
  border-radius: 4px;
  transition-duration: 0.4s;
}
.my-button:hover {
  background-color: #4caf50;
  color: white;
}
</style>
