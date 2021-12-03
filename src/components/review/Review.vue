<template>
  <div class="row justify-content-around mx-5 px-5 my-5">
    <h2 class="mb-5">리뷰</h2>
    <review-list class="col-7 container mx-0" :movie-id="movieId" :new-review-item="newReviewItem"></review-list>

    <create-review class="col-5 container" :movie-id="movieId" @new-review="newReview"></create-review>
  </div>
</template>

<script>
import ReviewList from '@/components/review/ReviewList'
import CreateReview from '@/components/review/CreateReview'

export default {
  name: 'Review',
  components: {
    ReviewList,
    CreateReview
  },
  data: function () {
    return {
      newReviewItem: null,
    }
  },
  props: {
    movieId: [Number, String],
  },
  methods: {
    newReview: function (data) {
      this.newReviewItem = data
    }
  }
}
</script>

<style>

</style>