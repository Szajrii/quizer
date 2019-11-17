<template>
    <div class="quizer-menuelement" :class="[isActive ?  'active-element': ''] ">
        <div class="quizer-menuelement-content">
            <i :class="icon"></i><span>{{text}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SideMenuElement",
        props: ['icon', 'text', 'id'],
        computed: {
            isActive() {
                if(this.$route.path.endsWith(this.id)) {
                    return true;
                }else return false
            }
        }
    }
</script>

<style lang="scss" scoped>

    .active-element {
        background-color: rgba(12, 5, 153, 0.51) !important;
    }

    .quizer-menuelement {
        height: 50px;
        width: 80%;
        margin: auto;
        color: #efefef;
        margin-top: 20px;
        line-height: 50px;
        border-radius: 10px;
        font-family: 'Roboto';
        transition: background-color 0.3s;

        &-content {
            width: 100%;
            font-size: 1.3vw;

            span {
                padding-left: 15px;
                font-size: 0.8vw;
            }
            i {
                padding-left: 10px;
            }
        }
    }

    .quizer-menuelement:hover {
        background-color: rgba(157, 177, 240, 0.51);
        cursor: pointer;
    }
</style>
