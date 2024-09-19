<script setup lang="ts">
import SlottedChild from './SlottedChild.vue';
</script>

<template>
    <div class="wrap">
        <SlottedChild>
            <template v-slot:demo>
                <div class="inner">这里是插槽内的内容</div>
            </template>
        </SlottedChild>
    </div>
</template>