<template>
    <div class="quizer-mainapp">
        <div class="quizer-mainapp-sidemenu"></div>
        <div class="quizer-mainapp-mainarea">
            <div class="quizer-mainapp-mainarea-topmenu"></div>
            <div class="quizer-mainapp-mainarea-content"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MainApp",
        props: ["email"]
    }
</script>

<style lang="scss" scoped>

    .quizer-mainapp {
        display: flex;
        width: 100%;
        height: 100%;

        &-sidemenu {
            width: 15%;
            height: 100%;
            background: rgb(80,119,166);
            background: linear-gradient(58deg, rgba(80,119,166,1) 0%, rgba(12,83,156,0.7315301120448179) 35%, rgba(66,79,217,1) 100%);
            -webkit-box-shadow: 8px 7px 19px -1px rgba(0,0,0,0.75);
            -moz-box-shadow: 8px 7px 19px -1px rgba(0,0,0,0.75);
            box-shadow: 8px 7px 19px -1px rgba(0,0,0,0.75);
        }

        &-mainarea {
            display: flex;
            flex-direction: column;
            width: 85%;
            height: 100%;

            &-topmenu{
                width: 100%;
                height: 10%;
                background-color: red;
            }

            &-content {
                height: 90%;
                width: 100%;
                background-color: green;
            }
        }
    }


</style>
