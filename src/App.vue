<template>
  <div id="app">
    <div id="nav">
      <router-link to="/"><img class="logo" src="@/assets/images/logo4.png" alt=""></router-link>
      <div v-if="chk" class="navi" style="margin-left: 4rem;">
        <router-link to="/community/">Community</router-link> | 
        <router-link to="/recommend/">Recommend</router-link> | 
        <router-link to="/shop/goods/">Shop</router-link> |
        <router-link 
          :to="{
            name: 'Profile',
            params: { username: loginUser.username }
          }">My Profile
        </router-link>
      </div>
      <div class="me-3">
        <span v-if="chk">
          <span style="margin-right: 5rem;">{{ loginUser.username }} 님 안녕하세요 </span>
          <router-link to="#" @click.native="logout"><span class="mouse">Log Out</span></router-link>
        </span>
        <span v-else>
          <router-link to="/accounts/signup/">Signup</router-link> |
          <router-link to="/accounts/login/">Login</router-link>
        </span>
      </div>
    </div>
    
    <router-view @login="setLogin" class="app-view"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'App',
  data: function () {
    return {
      chk: false,
    }
  },
  computed: {
    ...mapState([
      'isLogin',
      'loginUser'
    ])
  },
  methods: {
    setLogin: function () {
      // 유저 정보 가져오기
      this.$store.dispatch('doLogin')
    },
    logout: function () {
      localStorage.removeItem('JWT')
      this.$router.push({ name: 'Login' })
      this.$store.dispatch('doLogout')
    }
  },
  watch: {
    loginUser: function () {
      if (this.loginUser) {
        this.chk = true
      } else {
        this.chk = false
      }
    }
  },
  created: function () {
    if (localStorage.getItem('JWT')) {
      this.$store.dispatch('refresh')
    }
  }
}
</script>


<style>
.mouse {
  color: white;
}
.mouse:hover {
  color: #42b983;
}
.page-title {
  margin: 40px 0;
  color: whitesmoke;
}
.user-level {
  font-weight: bold;
  border: 1px solid #cfcfcf;
  font-size: 1rem;
  padding-left: 6px;
  padding-right: 6px;
  margin-right: 6px;
  border-radius: 5px;
  height: 25px;
  color: white;
  background: rgba(255, 255, 255, 0);
}
.level-1 {
  background: rgb(255, 255, 70);
  color: #2f2f2f;
}
.level-2 {
  background: green;
}
.level-3 {
  background: rgb(48, 48, 224);
}
.level-4 {
  background: rgb(255, 60, 0);
}
.level-5 {
  background: #242424;
  border: 1px solid rgb(255, 60, 60);
}
body {
  background-color: #141414 !important;
  overflow-y: scroll;
}
.app-view {
  width: 1600px;
  margin: 0 auto;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50; */
}

#nav {
  width: 1600px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
}
.logo {
  width: 200px;
  margin: 10px 0 10px 20px;
}
.navi {
  margin-left: -150px;
  font-size: 20px;

}

#nav a {
  font-weight: bold;
  color: white;
  text-decoration: none;
  display: inline-block;
  padding: 0 10px 0 10px;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.cursor-po {
  cursor: pointer;
}
</style>
