<template>
  <h1 class="logo">
    <img :src="logo" alt="手把手撸码前端" />
  </h1>
  <el-menu
    background-color="#344a5f"
    text-color="#fff"
    active0-text-color="#ffd04b"
    :default-active="current_path"
    :collapse="collapse"
  >
    <template v-for="item in routers" :key="item.path">
      <template v-if="isMenuDisplay(item)">
        <!-- 一级菜单 -->
        <el-menu-item v-if="!item.children" :index="item.path">
          <svg-icon
            v-if="hasIcon(item)"
            :icon-name="item.meta.icon"
            class-name="aside-menu-svg"
          />
          <template #title>
            {{ item.meta.title }}
          </template>
        </el-menu-item>
        <!-- 仅有一项的菜单 -->
        <el-menu-item
          v-else-if="hasOneChildMenu(item.children)"
          :index="item.children[0].path"
        >
          <svg-icon
            v-if="hasIcon(item)"
            :icon-name="item.meta.icon"
            class-name="aside-menu-svg"
          />
          <template #title>
            {{ item.children[0].meta.title }}
          </template>
        </el-menu-item>
        <!-- 子菜单 -->
        <el-sub-menu v-else :index="item.path">
          <template #title>
            <svg-icon
              v-if="hasIcon(item)"
              :icon-name="item.meta.icon"
              class-name="aside-menu-svg"
            />
            <span>{{ item.meta.title }}</span>
          </template>
          <template v-for="child in item.children" :key="child.path">
            <el-menu-item v-if="isMenuDisplay(child)" :index="child.path">
              <template #title>
                <svg-icon
                  v-if="hasIcon(child)"
                  :icon-name="child.meta.icon"
                  class-name="aside-menu-svg"
                />
                <span>{{ child.meta.title }}</span>
              </template>
            </el-menu-item>
          </template>
        </el-sub-menu>
      </template>
    </template>
  </el-menu>
</template>

<script setup lang="ts">
import SvgIcon from "@/components/svgIcon/SvgIcon.vue";
import { computed, ref } from "vue";
import { useRouter, useRoute, RouteRecordRaw } from "vue-router";
import { useStore } from "vuex";

const { options } = useRouter();
const { path } = useRoute();
const store = useStore();
const routers = options.routes;

// 仅显示包含 meta.title 的项
const isMenuDisplay = (route: RouteRecordRaw) => route.meta && route.meta.title;
// 项包含图标
const hasIcon = (route: RouteRecordRaw) => route.meta && route.meta.icon;
// 仅有一项子菜单，且为第一项
const hasOneChildMenu = (children: RouteRecordRaw[]) => {
  if (children) {
    const menu = children.filter((r) => isMenuDisplay(r));
    return isMenuDisplay(children[0]) && menu.length == 1;
  }
  return false;
};

// 导航
const current_path = computed(() => path);
const collapse = computed(() => store.state.app.collapse);

// logo
const logo_max = computed(() => require("@/assets/images/logo.png"));
const logo_min = computed(() => require("@/assets/images/logo-min.png"));
const logo = computed(() => {
  return store.state.app.collapse ? logo_min.value : logo_max.value;
});
</script>

<style lang="scss" scoped>
#layout-aside {
  background-color: #344a5f;
}

.aside-menu-svg {
  margin-right: 5px;
  margin-top: -2px;
  font-size: 18px;
}

.is-active {
  background-color: rgba(254, 108, 108, 0.2) !important;
}

.is-opened {
  .el-sub-menu__title {
    background-color: #f56c6c !important;
  }
}

.logo {
  width: 100%;
  border-bottom: 1px solid #2d4153;
  text-align: center;
}
</style>
