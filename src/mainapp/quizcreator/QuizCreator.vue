<template>
    <div class="quizer-creator">
        <Config></Config>
        <div class="quizer-creator-questions"></div>
    </div>
</template>

<script>
    import Config from './Config'
    export default {
        name: "QuizCreator",
        components: {
            Config
        }
    }
</script>

<style lang="scss" scoped>

    .quizer-creator {
        width: 100%;
        height: 100%;
        padding-top: 5%;
        z-index: -1;
    }
</style>
