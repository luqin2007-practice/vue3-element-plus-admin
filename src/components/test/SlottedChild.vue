<template>
    <slot name="foo"></slot>
</template>

<style scoped>
:slotted(.inner) {
    font-size: 24px;
    color: red;
}
</style>