<template>
  <el-menu
    default-active="4"
    background-color="#344a5f"
    text-color="#fff"
    active0-text-color="#ffd04b"
  >
    <template v-for="item in routers" :key="item.path">
      <template v-if="isMenuDisplay(item)">
        <!-- 一级菜单 -->
        <el-menu-item v-if="!item.children" :index="item.path">
          <template #title>
            <svg-icon
              v-if="hasIcon(item)"
              :icon-name="item.meta.icon"
              class-name="aside-menu-svg"
            >
            </svg-icon>
            {{ item.meta.title }}
          </template>
        </el-menu-item>
        <!-- 仅有一项的菜单 -->
        <el-menu-item
          v-else-if="hasOneChildMenu(item.children)"
          :index="item.children[0].path"
        >
          <template #title>
            <svg-icon
              v-if="hasIcon(item.children[0])"
              :icon-name="item.children[0].meta.icon"
            >
            </svg-icon>
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
            >
            </svg-icon>
            {{ item.meta.title }}
          </template>
          <template v-for="child in item.children">
            <template v-if="isMenuDisplay(child)">
              <el-menu-item :key="child.path">
                <svg-icon
                  v-if="hasIcon(child)"
                  :icon-name="child.meta.icon"
                  class-name="aside-menu-svg"
                >
                </svg-icon>
                {{ child.meta.title }}
              </el-menu-item>
            </template>
          </template>
        </el-sub-menu>
      </template>
    </template>
  </el-menu>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  setup() {
    const { options } = useRouter();
    const routers = options.routes;

    return {
      routers,

      // 仅显示包含 meta.title 的项
      isMenuDisplay(route) {
        return route && route.meta && route.meta.title;
      },

      // 项包含图标
      hasIcon(route) {
        return route && route.meta && route.meta.icon;
      },

      // 仅有一项子菜单，且为第一项
      hasOneChildMenu(children) {
        if (children) {
          const menu = children.filter(this.isMenuDisplay);
          return this.isMenuDisplay(children[0]) && menu.length == 1;
        }
        return false;
      },
    };
  },
};
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
</style>
