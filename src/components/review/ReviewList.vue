<template>
  <div>
    <review-list-item 
      v-for="review in reviews" 
      :key="review.id"
      :review="review"
      :id="review.id"
    >
    </review-list-item>
  </div>
</template>

<script>
import ReviewListItem from '@/components/review/ReviewListItem'

import axios from 'axios'

export default {
  name: 'ReviewList',
  components: {
    ReviewListItem
  },
  data: function () {
    return {
      reviews: null,
    }
  },
  props: {
    movieId: [Number, String],
    newReviewItem: Object,
  },
  methods: {
    setToken: function () {
      const token = localStorage.getItem('JWT')
      const config = {
        Authorization: `Bearer ${token}`
      }
      return config
    },
    getReviews: function () {
      console.log(typeof(this.movieId))
      axios({
        method: 'get',
        url: `/reviews/movie/${this.movieId}/`,
        headers: this.setToken()
      })
      .then(res => {
        // console.log(res.data)
        this.reviews = res.data
      })
      .catch(err => {
        console.log(err)
      })
    },
  },
  created: function () {
    this.getReviews()
  },
  watch: {
    newReviewItem: function () {
      // this.reviews.push(this.newReviewItem)
      this.getReviews()
    }
  }
}
</script>

<style>

</style>