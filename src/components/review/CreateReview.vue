<template>
  <div>

    <div class="card border-secondary" style="width: 35rem;">
      <div class="card-header border-secondary border-1">
        <h3 class="mb-0">리뷰 등록</h3>
      </div>
      <div class="card-body">
        <star-rating class="custom-star mb-3" :rating="inputRating" @rating-selected="getRating" :glow="5" :increment="0.5" :star-size="40" :clearable="true"></star-rating>
        <p class="card-text text-light">별점을 선택해 주세요</p>
      </div>
      <div class="card-body">
        <input class="mb-3 ps-1 input-text" type="text" v-model="inputTitle" placeholder="제목을 입력해주세요." size="57">
        <textarea class="textarea" v-model="inputContent" cols="60" rows="5" placeholder="감상평을 남겨주세요."></textarea>
      </div>
      <div class="card-body pt-0">
        <button class="my-button" @click="createReview">작성</button>
      </div>
    </div>
    
  </div>
</template>

<script>
import StarRating from 'vue-star-rating'
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  name: 'CreateReview',
  components: {
    StarRating
  },
  data: function () {
    return {
      inputTitle: null,
      inputContent: null,
      inputRating: null,
      ...mapState([
      'tmpReview',
      ]),
    }
  },
  props: {
    movieId: [Number, String],
  },
  methods: {
    getRating: function (rating) {
      this.inputRating = rating
    },
    setToken: function () {
      const token = localStorage.getItem('JWT')
      const config = {
        Authorization: `Bearer ${token}`
      }
      return config
    },
    createReview: function () {
      const reviewItem = {
        title: this.inputTitle,
        content: this.inputContent,
        rated: this.inputRating * 2,
      }
      if (reviewItem.title) {
        axios({
          method: 'post',
          url: `/reviews/movie/${this.movieId}/`,
          data: reviewItem,
          headers: this.setToken()
        })
        .then(res => {
          console.log(res)
          this.$emit('new-review', res.data)
        })
        .catch(err => {
          console.log(err)
          // 이미 작성했으면 alert 알림창 띄우기
          // (이미 작성한 경우인지 확인 필요)
          if (err.response.data.detail) {
            alert(err.response.data.detail)
          }
        })
        this.inputTitle = null
        this.inputContent = null
        this.inputRating = null
      }
    }
  },
}
</script>

<style scoped>
.textarea {
  border: 2px solid #6c757d;
  border-radius: 4px;
  height: 150px;
  resize: none;
}
.input-text {
  border: 2px solid #6c757d;
  border-radius: 4px;
}
.card-header {
  background-color: #2f2f2f !important;
  color: light;
  font-size: 1.5rem;
  
}
.card-body {
  background-color: #2f2f2f !important;
}
.custom-star {
  font-size: 1.5rem;
  padding-left: 10rem;
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
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
  transition-duration: 0.4s;
}
.my-button:hover {
  background-color: #4CAF50;
  color: white;
}
</style>