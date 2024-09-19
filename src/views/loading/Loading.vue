<template>
    <Suspense @fallback="fallbackSuspense" @resolve="resolveSuspense">
        <!-- 加载成功后的组件 -->
        <template #default><AsyncCom /></template>
        <!-- 加载中 -->
        <template #fallback>
            <div class="loader-inner ball-clip-rotate">
                <div v-if="!data.suspense_obj.msg"></div>
                <p>{{ data.suspense_obj.msg || '加载中...' }}</p>
            </div>
        </template>
    </Suspense>
</template>

<script setup>
    const fallbackSuspense = () => console.log("这里是 fallback 回调")
    const resolveSuspense = () => console.log("<AsyncCom> 回调成功")

    import { onErrorCaptured, reactive } from "vue"
    const data = reactive({
        suspense_obj: {}
    })
    onErrorCaptured((error, instance, info) => { 
        data.suspense_obj = error
        return true
     })
</script>