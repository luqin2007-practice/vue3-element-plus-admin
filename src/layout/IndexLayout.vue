<template>
  <el-container id="layout-container">
    <!-- 侧栏 -->
    <el-aside id="layout-aside" :width="collapse ? '60px' : '250px'">
      <aside-layout />
    </el-aside>
    <el-container>
      <!-- 后台头部，放置全局信息 -->
      <el-header id="layout-header" height="75px">
        <header-layout />
      </el-header>
      <el-main id="layout-main">
        <main-layout />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import AsideLayout from "@/layout/AsideLayout.vue";
import HeaderLayout from "@/layout/HeaderLayout.vue";
import MainLayout from "@/layout/MainLayout.vue";

import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore();
const collapse = computed(() => store.state.app.collapse);
</script>

<style lang="scss" scoped>
#layout-container {
  height: 100vh;
}
#layout-aside {
  background-color: #77acbc;
  @include webkit(transition, all 0.3s ease 0s);
}
#layout-header {
  position: relative;
  z-index: 10;
  background-color: $style-white;
  @include webkit(box-shadow, 0 0 10px 0 rgba(0, 0, 0, 0.5));
}
#layout-main {
  background-color: #bc77a1;
}
</style>
