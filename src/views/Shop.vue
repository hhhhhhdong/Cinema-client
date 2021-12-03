<template>
  <div>
    <h1 class="page-title">Shop</h1>
    <hr style="color: white" />
    <div class="shop-con">
      <div class="shop-item" v-for="item in items" :key="item.id">
        <div class="card" style="width: 18rem">
          <img :src="item.img" class="card-img-top" alt="" />
          <div class="card-body">
            <h5 class="card-title">{{ item.title }}</h5>
            <p class="card-text">price: {{ item.price }}p</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Shop",
  data: function () {
    return {
      items: [
        {
          id: 1,
          movie: "500일의 썸머",
          title: "500일의 썸머 노트",
          price: 200,
          img: require("@/assets/images/500summer.jpg"),
        },
        {
          id: 2,
          movie: "겨울왕국",
          title: "겨울왕국 그림",
          price: 100,
          img: require("@/assets/images/winter.jpg"),
        },
        {
          id: 3,
          movie: "귀멸의 칼날",
          title: "귀멸의 칼날 미즈코 피규어",
          price: 300,
          img: require("@/assets/images/nife1.png"),
        },
        {
          id: 4,
          movie: "듄",
          title: "듄 소설책",
          price: 300,
          img: require("@/assets/images/dune1.jpg"),
        },
        {
          id: 5,
          movie: "귀멸의 칼날",
          title: "귀멸을 칼날 탄지로 피규어",
          price: 350,
          img: require("@/assets/images/nife2.jpg"),
        },
        {
          id: 6,
          movie: "라라랜드",
          title: "라라랜드 다이어리",
          price: 150,
          img: require("@/assets/images/lalaland1.jpg"),
        },
        {
          id: 7,
          movie: "스타 이즈 본",
          title: "스타 이즈 본 포스터",
          price: 150,
          img: require("@/assets/images/starisborn.jpg"),
        },
        {
          id: 8,
          movie: "신비한 동물 사전",
          title: "신비한 동물 사전 가방",
          price: 250,
          img: require("@/assets/images/dict.jpg"),
        },
        {
          id: 9,
          movie: "알라딘",
          title: "알라딘 요술 램프",
          price: 425,
          img: require("@/assets/images/aladdin.jpg"),
        },
        {
          id: 10,
          movie: "해리포터",
          title: "해리포터 기념품",
          price: 155,
          img: require("@/assets/images/potter.jpg"),
        },
        {
          id: 11,
          movie: "토르",
          title: "토르 망치",
          price: 1055,
          img: require("@/assets/images/thor.jpg"),
        },
      ],
    }
  },
}
</script>

<style>
.shop-con {
  display: flex;
  flex-wrap: wrap;
}
.shop-item {
  margin: 10px;
}
</style>
