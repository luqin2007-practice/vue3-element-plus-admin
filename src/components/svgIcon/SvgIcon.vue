<template>
  <svg class="svg-class" :class="svgClassName" aria-hidden="true">
    <!-- 加载 svg 图标 -->
    <use :href="svgIconName"></use>
  </svg>
</template>

<script>
import { ref, computed } from "vue";

export default {
  name: "SvgIcon",
  props: {
    // iconName：图标类型
    iconName: {
      type: String,
      default: "",
    },
    // className：直接绑定到 svg 的样式
    className: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    // 不直接使用 className
    // 防止父对象变化，class 未变时，图标重渲染
    const svgClassName = ref(props.className);
    const svgIconName = computed(() => `#icon-${props.iconName}`);
    return { svgClassName, svgIconName };
  },
};
</script>

<style lang="scss" scoped>
.svg-class {
  width: 1em;
  height: 1px;
  fill: currentColor;
}
</style>
