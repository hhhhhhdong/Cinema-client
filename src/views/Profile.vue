<template>
  <div class="my-profile">
    <div v-if="user" class="my-3">
      <h1 class="page-title">{{ user.username }}'s Profile</h1>

      <div class="d-flex justify-content-center mt-3">
        <div style="text-align: left;">
          <p>레벨: 
            <!-- user level -->
            <span 
              :class="[levelClass(user.acc_point)]"
              class="user-level"
            >{{ level(user.acc_point) }}</span>
          </p>
          <p>점수: {{ user.curr_point }} / {{ user.acc_point }}</p>
          <p>팔로잉: {{ user.followings_cnt }}, 팔로워: {{ user.followers_cnt }}</p>
        </div>
      </div>

      <!-- 버튼 -->
      <div v-if="loginUser.username !== user.username">
        <div v-if="chk">
          <button class="btn-unfollow" @click="follow">언팔로우</button>
        </div>
        <div v-else>
          <button class="btn-follow" @click="follow">팔로우</button>
        </div>
      </div>

    </div>

    <hr>

    <h4>작성한 리뷰(영화)</h4>
    <div v-if="reviews" class="row justify-content-around m-5">
      <!-- <img :src="posterUrl" alt="포스터" width="300px"> -->
      <review-card
        v-for="review in reviews" 
        :key="review.id"
        :review="review"
      >
      </review-card>
      
    </div>
    
  </div>
</template>

<script>
import ReviewCard from '@/components/review/ReviewCard'

import { mapState } from 'vuex'

import axios from 'axios'

export default {
  name: 'Profile',
  components: {
    ReviewCard
  },
  data: function () {
    return {
      chk: null,
      user: null,
      reviews: null,
      // url: `/movies/${this.reviews.movie.poster_path}/`
    }
  },
  computed: {
    paramsUserName: function () {
      return this.$route.params.username
    },
    ...mapState([
      'loginUser'
    ])
  },
  methods: {
    level: function (point) {
      return Math.floor(point/100)
    },
    levelClass: function (point) {
      return `level-${Math.floor(point/100)}`
    },
    follow: function () {
      const token = localStorage.getItem('JWT')
      const config = {
        Authorization: `Bearer ${token}`
      }

      axios({
        method: 'post',
        url: `/accounts/${this.user.id}/follow/`,
        headers: config
      })
      .then(() => {
        if (this.chk) {
          this.chk = false
          this.user.followers_cnt -= 1
        } else {
          this.chk = true
          this.user.followers_cnt += 1
        }
      })
      .catch(err => {
        console.log(err)
      })
    },
    setToken: function () {
      const token = localStorage.getItem('JWT')
      const config = {
        Authorization: `Bearer ${token}`
      }
      return config
    },
    getProfileUser: function () {
      // profile 유저 정보 가져오기
      const username = this.$route.params.username

      axios({
        method: 'get',
        url: `/accounts/${username}/`,
        headers: this.setToken()
      })
      .then(res => {
        this.user = res.data

        // follow <-> unfollow 버튼 변경
        if(this.loginUser.followings.find(id => this.user.id === id)) {
          this.chk = true
        } else {
          this.chk = false
        }

          this.getUserReview()
      })
      .catch(err => {
        console.dir(err)
        if (err.response.data.code === 'token_not_valid') {
          this.$router.push({ name: 'Login' })
        }else if (err.response.status === 404) {
          alert('해당유저가 없습니다.')
        }
      })
    },
    getUserReview: function () {
      // profile 유저의 리뷰(영화) 정보 가져오기
      axios({
        method: 'get',
        url: `/reviews/user/${this.user.id}/`,
        headers: this.setToken()
      })
      .then(res => {
        this.reviews = res.data
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  created: function () {
    this.getProfileUser()
  },
  watch: {
    paramsUserName: function () {
      this.getProfileUser()
    }
  }

}
</script>

<style scoped>
.my-profile {
  color: white;
}
.btn-unfollow {
  background-color: #2f2f2f;
  border: 2px solid #2f2f2f;
  color: white;
  padding: 6px 12px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1rem;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
  transition-duration: 0.4s;
}
.btn-unfollow:hover {
  background-color: #dc3545;
  color: white;
}
.btn-follow {
  background-color: #2f2f2f;
  border: 2px solid #2f2f2f;
  color: white;
  padding: 6px 12px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1rem;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
  transition-duration: 0.4s;
}
.btn-follow:hover {
  background-color: #0b5ed7;
  color: white;
}
</style>