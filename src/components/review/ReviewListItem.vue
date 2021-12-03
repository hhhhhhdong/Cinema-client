<template>
  <div class="mb-3">
    <div class="container-fluid">
      <div class="card border-secondary border-2 mb-3 text-white">
        <div class="card-header border-secondary border-1">
          <div class="container row px-1" style="font-size: 1.5rem;">
            <div class="col-9">
              <div class="link mb-0 d-flex" @click="goProfile">
                <!-- user level -->
                <div class="d-flex align-items-center">
                  <span :id="userLevelId" class="user-level">{{ level }}</span>
                </div>
                {{ review.user.username }}
              </div>
              
              <star-rating class="mb-0" :rating="review.rated/2" :read-only="true" :increment="0.01" :star-size="25"></star-rating>
            </div>
            <div class="col-3 px-0 heart-size d-flex justify-content-center align-items-center">
              <span v-if="liked" class="link"  @click="likesRivew">
                <font-awesome-icon :icon="['fas', 'heart']" :style="{ color: 'red' }"/>
              </span>
              <span v-else class="link"  @click="likesRivew">
                <font-awesome-icon :icon="['far', 'heart']"/>
              </span>
              <span class="ms-3" style="font-size: 1.5rem">
                {{ likedNum }}
              </span>
            </div>
          </div>
        </div>
        
        <div class="card-body cursor-po px-4" style="text-align: left" @click="goReview">
          <strong class="card-title mb-0" style="font-size: 1.6rem; word-wrap:break-word;">{{ review.title }}</strong>
          <p class="card-text mb-0" style="font-size: 1.4rem; word-wrap:break-word; white-space:pre-wrap;">{{ review.content }}</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import StarRating from 'vue-star-rating'
import { mapState } from 'vuex'

import getToken from '@/util/getToken.js'

import axios from 'axios'

export default {
  name: 'ReviewListItem',
  components: {
    StarRating,
  },
  data: function () {
    return {
      liked: null,
      likedNum: null,
      userLevelId: `reviewUser-${this.review.user.username}`,
    }
  },
  computed: {
    ...mapState([
      'loginUser'
    ]),
    point: function () {
      return this.review.user.acc_point
    },
    level: function () {
      return Math.floor(this.review.user.acc_point/100)
    },
  },
  props: {
    review: Object,
  },
  methods: {
    goProfile: function () {
      this.$router.push({ name: 'Profile', params: { username: `${this.review.user.username}`}})
    },
    goReview: function () {
      this.$router.push({ name: 'ReviewDetail', params: { reviewId: `${this.review.id}`}})
    },
    getLiked: function () {
      if (this.review.like_users.find(id => this.loginUser.id === id)) {
        this.liked = true
      } else {
        this.liked = false
      }
    },
    likesRivew: function () {
      axios({
        method: 'post',
        url: `/reviews/${this.review.id}/likes/`,
        headers: getToken()
      })
      .then(res => {
        this.liked = res.data.liked
        if (this.liked) {
          this.likedNum += 1
        } else {
          this.likedNum -= 1
        }
      })
      .catch(err => {
        console.log(err)
      })
    },
    updateLevel: function () {
      const reviewUser = document.querySelector(`#${this.userLevelId}`)
      if (reviewUser) {
        if (this.level === 1) {
          reviewUser.setAttribute('class', 'level-1 user-level')
        } else if (this.level === 2) {
          reviewUser.setAttribute('class', 'level-2 user-level')
        } else if (this.level === 3) {
          reviewUser.setAttribute('class', 'level-3 user-level')
        } else if (this.level === 4) {
          reviewUser.setAttribute('class', 'level-4 user-level')
        } else if (this.level === 5) {
          reviewUser.setAttribute('class', 'level-5 user-level')
        } else {
          reviewUser.setAttribute('class', 'user-level')
        }
      }
    }
  },
  created: function () {
    this.getLiked()
    this.likedNum = this.review.like_users.length
  },
  mounted: function () {
    this.updateLevel()
  },
  watch: {
    point: function () {
      console.log(this.point)
      this.updateLevel()
    },
  }
}
</script>

<style>
.card {
  background-color: #2f2f2f !important;
}
.heart-size {
  font-size: 2rem;
}
.vue-star-rating-star {
  padding-bottom: 3.5px;
}
</style>