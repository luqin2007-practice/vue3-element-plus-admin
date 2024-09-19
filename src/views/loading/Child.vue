<script>
export default {
    async setup(props) {
        const p = await new Promise((resolve, reject) => {
            setTimeout(() => {
                // 模拟异步操作
                // resolve()
                // 模拟异步失败
                reject({
                    msg: '异步失败，请稍后重试',
                    status: false
                })
            }, 2000)
        })
        return { p }
    }
}
</script>