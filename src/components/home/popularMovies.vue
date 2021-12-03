<template>
  <div v-if="movies">
    <div @click="goDetail(popMovie.id)" class="pop-movie">
      <img :src="`https://image.tmdb.org/t/p/original/${popMovie.backdrop_path}`" alt="배경 사진" class="most-pop-img">
      <div class="pop-movie-desc">
        <h1>{{popMovie.title}}</h1>
        <p>{{genreStr}}</p>
        <star-rating :rating="popMovie.vote_average/2" :read-only="true" :increment="0.01" :star-size="20"></star-rating>
      </div>
    </div>
    <div class="container-div">
      <h3 class="movie-list-title">POPULAR</h3>
      <swiper class="swiper" :options="swiperOption" v-if="movies">
        <swiper-slide v-for="movie in movies" :key="movie.id">
          <movie-card :movie="movie"></movie-card>
        </swiper-slide>
        <!-- <div class="swiper-pagination" slot="pagination"></div> -->
        <div class="swiper-button-prev" slot="button-prev"></div> 
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
import movieCard from '@/components/home/movieCard'
import { mapState } from 'vuex'
import axios from 'axios'

import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

import StarRating from 'vue-star-rating'

export default {
  name: 'popularMovies',
  data: function () {
    return {
      movies: null,
      popMovie: null,
      swiperOption: { 
        slidesPerView: 6, 
        spaceBetween: 0, 
        loop: true, 
        pagination: { 
          el: '.swiper-pagination', 
          clickable: true 
        }, 
        navigation: { 
          nextEl: '.swiper-button-next', 
          prevEl: '.swiper-button-prev' 
        } 
      }
    }
  },
  components: {
    movieCard,
    Swiper,
    SwiperSlide,
    StarRating,
  },
  methods: {
    goDetail: function (id) {
      console.log(this.isLogin)
      if (this.isLogin) {
        this.$router.push({ name: 'Movie', params: { movieId: id }})
      } else {
        this.$router.push({ name: 'Login' })
      }
    }
  },
  computed: {
    ...mapState([
      'isLogin'
    ]),
    genreStr: function () {
      let tmp = ''
      this.popMovie.genres.forEach(e => {
        tmp = tmp +  e.name + ' '
      })
      return tmp
    }
  },
  created: function () {
    axios({
      method: 'get',
      url: '/movies/popular/',
    })
    .then(res => {
      this.movies = res.data
      this.popMovie = res.data[0]
      console.log(this.popMovie);
    })
    .catch(err => {
      console.log(err)
    })
  }
}
</script>

<style scope>
.pop-movie {
  position: relative;
}
.pop-movie-desc {
  position: absolute;
  bottom: 250px;
  left: 50px;
  color: #e5e5e5;
  text-align: left;
}
.container-div {
  padding: 30px;
}
.movie-list-title {
  text-align: left;
  color: #e5e5e5;
  font-weight: 800;
  font-size: 30px;
  padding-bottom: 10px;
}
.most-pop-img {
  -webkit-box-shadow: 5px 5px 5px 0px rgba(255,255,255,.1), inset 4px 4px 15px 0px rgba(255,255,255,.1), 3px 10px 18px 8px rgba(0,0,0,0.65); 
box-shadow: 5px 5px 5px 0px rgba(255,255,255,.1), inset 4px 4px 15px 0px rgba(255,255,255,.1), 3px 10px 18px 8px rgba(0,0,0,0.65);
  width: 1600px;
}
.swiper-button-next, .swiper-button-prev {
  color: rgba(255,255,255, 0.7);
}
</style>