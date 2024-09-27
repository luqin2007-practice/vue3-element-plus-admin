<template>
  <div>
    <div class="good_detail">
      <img :src="good.image" :alt="good.name" />
      <div>
        <h1>{{ good.name }}</h1>
        <p>"{{ good.description }}"</p>
        <div class="good_price">
          <span>¥</span>
          <span>{{ good.price }}</span>
          <div class="right">
            <div class="button" @click="good.count -= 1">-</div>
            <div>{{ good.count }}</div>
            <div class="button" @click="good.count += 1">+</div>
          </div>
        </div>
      </div>
    </div>
    <hr />
    <p class="total_price"><span>¥</span>{{ total_price }}</p>
    <p class="send_price">另需配送费 ¥{{ good.send_price }}</p>
  </div>
</template>

<script setup>
import { reactive, computed } from "vue";

const good = reactive({
  name: "小米南瓜粥",
  description: "不错哦，小米南瓜粥很赞！",
  image: "src/assets/practice/xmngzh.png",
  count: 1,
  price: 17.88,
  send_price: 0,
});

const total_price = computed({
  get: () => (good.count * good.price).toFixed(2),
  set: (val) => (good.count = val / good.price),
});
</script>

<style lang="scss" scoped>
* {
  background-color: white;
}

.good_detail {
  img {
    display: inline-block;
    width: 30%;
  }

  div {
    display: inline-block;

    .good_price {
      width: 100%;
    }
  }
}

.total_price {
  margin-left: 6px;
  color: red;
  font-size: xx-large;

  span {
    font-size: medium;
  }
}

.send_price {
  margin-left: 6px;
  color: gray;
}
</style>
