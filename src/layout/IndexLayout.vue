<template>
  <el-container id="layout-container">
    <el-aside id="layout-aside" width="250px">
      <aside-layout />
    </el-aside>
    <el-container>
      <el-header id="layout-header" height="75px">
        <header-layout />
      </el-header>
      <el-main id="layout-main">
        <main-layout />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AsideLayout from "./AsideLayout.vue";
import HeaderLayout from "./HeaderLayout.vue";
import MainLayout from "./MainLayout.vue";

export default {
  name: "IndexLayout",
  components: { AsideLayout, HeaderLayout, MainLayout },
};
</script>

<style lang="scss" scoped>
#layout-container {
  height: 100vh;
}
#layout-aside {
  background-color: #77acbc;
}
#layout-header {
  background-color: #77bc99;
}
#layout-main {
  background-color: #bc77a1;
}
</style>
