<template>
  <div style="color: white">
    <h1 class="page-title">Following's Review</h1>
    <div v-if="reviews" class="mt-5">
      <review-card
        v-for="review in reviews" 
        :key="review.id"
        :review="review"
      >
      </review-card>
    </div>
    <h1 v-if="reviews && reviews.length === 0" style="color: #5e5e5e;">No Followings</h1>
  </div>
</template>

<script>
import ReviewCard from '@/components/review/ReviewCard'
import axios from "axios"

export default {
  name: "Community",
  components: {
    ReviewCard
  },
  data: function () {
    return {
      reviews: null,
    }
  },
  methods: {
    setToken: function () {
      const token = localStorage.getItem("JWT")
      const config = {
        Authorization: `Bearer ${token}`,
      }
      return config
    },
  },
  created: function () {
    axios({
      methods: "GET",
      url: "/reviews/community/",
      headers: this.setToken(),
    })
      .then((res) => {
        this.reviews = res.data
      })
      .catch((err) => {
        console.log(err)
      })
  },
}
</script>

<style></style>
