<template>
  <div v-if="review" class="text-light d-flext justify-content-center" style="position: relative">
    

    <div class="review-warp mb-5">
      <!-- 영화 포스터 & 제목 -->
      <div>
        <img @click="goDetail(review.movie.id)" :src="posterUrl" alt="포스터" width="800px" class="review-img link" />
        <h3 class="review-detail mt-3">
          <span class="link" @click="goDetail(review.movie.id)">
            {{ review.movie.title }}
          </span>
        </h3>
      </div>

      <!-- 리뷰 & 댓글-->
      <div class="mt-4">

        <!-- 리뷰 수정 폼 -->
        <div v-if="isEdit" class="mt-3">
          <div class="card border-secondary" style="width: 800px;">
            <div class="card-header border-secondary border-1">
              <h3 class="mb-0">리뷰 수정</h3>
            </div>
            <div class="card-body">
              <star-rating class="review-comment-star mb-3" :rating="inputRating" @rating-selected="getRating" :glow="5" :increment="0.5" :star-size="40" :clearable="true"></star-rating>
              <p class="card-text text-light">별점을 선택해 주세요</p>
            </div>
            <div class="card-body">
              <input class="mb-3 ps-1 input-text" type="text" v-model="editTitle" placeholder="제목을 입력해주세요." size="87">
              <textarea class="textarea" v-model="editContent" cols="90" rows="5" placeholder="감상평을 남겨주세요."></textarea>
            </div>
            <div class="card-body pt-0 text-center">
              <button class="my-button-update" @click="reviewEditSubmit">수정</button>
              <button class="my-button-cancel" @click="reviewEdit">취소</button>
            </div>
          </div>
        </div>

        <!-- 리뷰 조회 -->
        <div v-else class="review-detail">

          <!-- 리뷰 header -->
          <div class="d-flex justify-content-between">

            <div class="container row ps-2" style="font-size: 1.5rem;">
              <!-- 리뷰 유저 & 별점 -->
              <div class="col-8">
                <div class="mb-0 d-flex">
                  <!-- user level -->
                  <div class="d-flex align-items-center" >
                    <span 
                      :class="[levelClass(review.user.acc_point)]"
                      class="link user-level"
                      @click="goProfile(review.user.username)"
                    >{{ level(review.user.acc_point) }}</span>
                  </div>
                  <span class="link" @click="goProfile(review.user.username)">{{ review.user.username }}</span>
                </div>
                <star-rating class="mb-0" :rating="review.rated/2" :read-only="true" :increment="0.01" :star-size="25"></star-rating>
              </div>
              <!-- 좋아요  & 작성시간-->
              <div class="col-4 px-0">
                <div class="d-flex justify-content-center" style="font-size: 1.3rem">
                  {{ getTime(review.created_at) }}
                </div>
                <div class="heart-size d-flex justify-content-center align-items-center">
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

            <!-- 드랍다운 설정메뉴 -->
            <span v-if="loginUser.id === review.user.id" class="d-flex align-items-center">
              <b-dropdown menu-class="py-1 wrap-dropdown" size="lg" right variant="link" toggle-class="text-decoration-none" no-caret>
                <template #button-content>
                  <font-awesome-icon :icon="['fas', 'ellipsis-v']" :style="{ color: 'white' }" />
                </template>
                <b-dropdown-item @click="reviewEdit">수정</b-dropdown-item>
                <b-dropdown-item @click="reviewDelete">삭제</b-dropdown-item>
              </b-dropdown>
            </span>
          </div>

          <!-- 리뷰 body -->
          <hr class="mt-0">
          <div class="ps-2">
            <h2 style="word-wrap:break-word;">{{ review.title }}</h2>
            <h4 style="word-wrap:break-word; white-space:pre-wrap; color:gainsboro;">{{ review.content }}</h4>
          </div>


          <!-- 댓글 조회 & 작성 & 삭제 -->
          <div class="card border-secondary" style="width: 800px; margin: 30px auto">
            <div class="card-header border-secondary border-1">
              <h3 class="mb-0">Comments</h3>
            </div>
            <div class="card-body">
              <div
                v-for="comment in review.comment_set"
                :key="comment.id"
                style="text-align: left"
                class="d-flex justify-content-between"
              >
                <div class="mb-3" style="padding-left: 10px">
                  <!-- user level -->
                  <span class="mb-0 d-flex align-items-center">
                    <span class="d-flex align-items-center">
                      <span 
                        @click="goProfile(comment.author.username)"
                        :class="levelClass(comment.author.acc_point)"
                        class="link user-level comment-user-level"
                      >
                      {{ level(comment.author.acc_point) }}</span>
                    </span>
                    <span 
                      @click="goProfile(comment.author.username)" 
                      class="link me-2"
                    >
                    {{ comment.author.username }}</span> 
                    <font-awesome-icon :icon="['fas', 'chevron-right']" size="sm" :style="{ color: 'gray' }" />
                    <span class="ms-3 comment-content">{{ comment.content }}</span>
                  </span>
                </div>

                <button
                  v-if="loginUser.username === comment.author.username"
                  class="my-comment-button-delete mb-3"
                  @click="deleteComments(comment.id)"
                >
                  <font-awesome-icon :icon="['fas', 'times']" />
                </button>
              </div>

              <!-- 댓글 작성 -->
              <div class="d-flex justify-content-around mt-2">
                <input
                  class="input-text"
                  style="width: 600px"
                  type="text"
                  @keyup.enter="createComments"
                  v-model="inputTxt"
                  placeholder="댓글을 작성해 주세요."
                />
                <button
                  class="my-comment-button"
                  @click="createComments"
                >
                  작성
                </button>
              </div>
            </div>
            <div class="card-body pt-0"></div>
          </div>
          <!-- <div v-if="loginUser.id === review.user.id" class="edit-btn">
            <button @click="reviewDelete">삭제</button
            ><button @click="reviewEdit">수정</button>
          </div> -->
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import axios from "axios"
import getToken from "@/util/getToken.js"
import { mapState } from "vuex"
import StarRating from 'vue-star-rating'

export default {
  name: "Review",
  data: function () {
    return {
      review: null,
      inputTxt: null,
      posterUrl: null,
      comments: null,

      isEdit: false,
      editTitle: null,
      editContent: null,
      inputRating: null,
      reviewRating: null,

      liked: null,
      likedNum: null,
    }
  },
  components: {
    StarRating
  },
  computed: {
    ...mapState(["loginUser"]),
    point: function () {
      return this.review.user.acc_point
    },
  },
  methods: {
    getTime: function (time) {
      return time.slice(0, 10) + '  '+ time.slice(11, 16)
    },
    level: function (point) {
      return Math.floor(point/100)
    },
    levelClass: function (point) {
      return `level-${Math.floor(point/100)}`
    },
    goProfile: function (user) {
      this.$router.push({ name: 'Profile', params: { username: user}})
    },
    goDetail: function (id) {
      this.$router.push({ name: 'Movie', params: { movieId: id }})
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

    createComments: function () {
      axios({
        method: "POST",
        url: `/reviews/${this.review.id}/comments/`,
        headers: getToken(),
        data: {
          content: this.inputTxt,
        },
      })
        .then((res) => {
          console.log(res)
          this.comments.push(res.data)
          this.inputTxt = ""
        })
        .catch((err) => {
          alert(err.response?.data?.content[0])
          console.dir(err)
        })
    },
    deleteComments: function (id) {
      axios({
        method: 'delete',
        url: `/reviews/${this.review.id}/comments/${id}`,
        headers: getToken(),
      })
      .then(res => {
        console.log(res)
        this.getReviewComment()
      })
      .catch(err => {
        console.log(err)
      })
    },
    reviewDelete: function () {
      axios({
        method: "DELETE",
        url: `/reviews/${this.review.id}/`,
        headers: getToken(),
      })
        .then(() => {
          this.$router.push({
            name: "Movie",
            params: { movieId: `${this.review.movie.id}` },
          })
        })
        .catch((err) => {
          console.log(err)
        })
    },
    reviewEdit: function () {
      this.isEdit = !this.isEdit
    },
    reviewEditSubmit: function () {
      axios({
        method: "PUT",
        url: `/reviews/${this.review.id}/`,
        headers: getToken(),
        data: {
          title: this.editTitle,
          content: this.editContent,
          rated: this.inputRating*2,
        }
      })
        .then((res) => {
          console.log(res);
          this.isEdit = false
          this.review.title = this.editTitle
          this.review.content = this.editContent
          this.review.rated = res.data.rated
        })
        .catch((err) => {
          console.log(err.response)
        })
    },
    getRating: function (rating) {
      this.inputRating = rating
    },
    getReviewComment: function () {
      const reviewId = this.$route.params.reviewId
      axios({
        method: "GET",
        url: `/reviews/${reviewId}/`,
        headers: getToken(),
      })
        .then((res) => {
          this.review = res.data
          this.posterUrl = `https://image.tmdb.org/t/p/original/${this.review.movie.backdrop_path}`
          this.comments = res.data.comment_set
          this.editTitle = res.data.title
          this.editContent = res.data.content
          this.inputRating = res.data.rated/2
          console.log(this.review)

          this.getLiked()
          this.likedNum = this.review.like_users.length
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  created: function () {
    this.getReviewComment()
  },
}
</script>

<style>
.comment-content {
  width: 600px;
}
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
.comment-user-level {
  font-size: 0.8rem;
  height: 20px;
  padding-left: 5px;
  padding-right: 5px;
  margin-right: 4px;
}
.review-img {
  -webkit-box-shadow: 5px 5px 5px 0px rgba(255,255,255,.1), inset 4px 4px 15px 0px rgba(255,255,255,.1), 3px 10px 18px 8px rgba(0,0,0,0.65); 
box-shadow: 5px 5px 5px 0px rgba(255,255,255,.1), inset 4px 4px 15px 0px rgba(255,255,255,.1), 3px 10px 18px 8px rgba(0,0,0,0.65);
}
.wrap-dropdown {
  width: 100%;
  min-width: 0;
  white-space: normal;
}
.edit-btn {
  position: absolute;
  top: 10px;
  right: 400px;
}
.author {
  padding-right: 10px;
}
.review-warp {
  margin: 0 auto;
  width: 800px;
}
.review-detail {
  text-align: left;
}
.review-comment-star {
  font-size: 1.5rem;
  padding-left: 17rem;
}
.my-button-update {
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
.my-button-update:hover {
  background-color: #4CAF50;
  color: white;
}
.my-button-cancel {
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
.my-button-cancel:hover {
  background-color: #dc3545;
  color: white;
}
.my-comment-button {
  background-color: light;
  border: 1px;
  border-color: light;
  color: #2f2f2f;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1.4rem;
  margin: 2px 2px;
  cursor: pointer;
  border-radius: 4px;
  transition-duration: 0.4s;
}
.my-comment-button:hover {
  background-color: #4CAF50;
  color: white;
}
.my-comment-button-delete {
  background-color: #2f2f2f;
  border: 1px;
  border-color: #2f2f2f;
  color: white;
  padding: 1px 9px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1rem;
  margin: 2px 2px;
  cursor: pointer;
  border-radius: 4px;
  transition-duration: 0.4s;
}
.my-comment-button-delete:hover {
  background-color: #dc3545;
  color: white;
}
</style>
