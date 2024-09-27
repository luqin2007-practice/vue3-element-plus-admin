<template>
  <div class="header-wrap">
    <div class="wrap">
      <span class="menu-btn" @click="switch_aside_collapse">
        <svg-icon iconName="menuBtn" className="icon-menu-svg" />
      </span>
    </div>
    <div class="wrap">
      <div class="user-info">
        <div class="face-info">
          <img :src="avatar" :alt="store.state.app.user" />
          <span>{{ store.state.app.user }}</span>
        </div>
        <span class="logout" @click="logout">
          <svg-icon iconName="logout" className="icon-logout" />
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const default_avatar = computed(() => require("@/assets/images/logo-min.png"));
const avatar = computed(() => {
  return store.state.app.avatar || default_avatar.value;
});

function switch_aside_collapse() {
  store.commit("app/SWITCH_COLLAPSE");
}

function logout() {
  store.dispatch("app/logoutAction");
  router.push({ name: "Login" });
}
</script>

<style lang="scss" scoped>
.header-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.menu-btn {
  cursor: pointer;
}

.icon-menu-svg {
  font-size: 24px;
}

.user-info {
  display: flex;
  align-items: center;
}

.face-info {
  span,
  img {
    display: inline-block;
    vertical-align: middle;
  }

  span {
    margin-left: 15px;
  }
}

.logout {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 75px;
  height: 75px;
  cursor: pointer;
}
</style>
