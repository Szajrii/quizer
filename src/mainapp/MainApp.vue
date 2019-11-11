<template>
    <div>
        <p>{{user}}</p>
        <p>{{email}}</p>
    </div>
</template>

<script>
    export default {
        name: "MainApp",
        props: ["user", "email"]
    }
</script>

<style scoped>

</style>
