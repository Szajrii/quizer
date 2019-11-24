<template>
    <v-app>
            <div class="quizer-mainapp">
                <div class="quizer-mainapp-sidemenu">
                    <div class="quizer-mainapp-sidemenu-logo">
                        <div class="quizer-mainapp-sidemenu-logo-content">
                            <div><i class="fas fa-question"></i> Quizer</div>
                        </div>
                    </div>
                    <div class="quizer-mainapp-sidemenu-elements">
                        <SideMenuElement text="Quizes List" icon="far fa-list-alt" id="/" @click.native="navigateTo('list')"></SideMenuElement>
                        <SideMenuElement text="User Profile" icon="fas fa-user" id="profile" @click.native="navigateTo('profile')"></SideMenuElement>
                        <SideMenuElement text="Create Quiz" icon="far fa-plus-square" id="create" @click.native="navigateTo('create')"></SideMenuElement>
                    </div>
                </div>
                <div class="quizer-mainapp-mainarea">
                    <div class="quizer-mainapp-mainarea-topmenu"></div>
                    <div class="quizer-mainapp-mainarea-content">
                        <transition name="redirect" mode="out-in">
                            <router-view></router-view>
                        </transition>
                    </div>
                </div>
            </div>
    </v-app>
</template>

<script>
    import router from '../router'
    import SideMenuElement from './components/SideMenuElement'
    export default {
        name: "MainApp",
        components: {
            SideMenuElement
        },
        props: ["email"],
        methods: {
            navigateTo(destination) {
                if(!this.$route.path.endsWith(destination)) {
                    router.push({ name: destination });
                }else {}
            }
        }
    }
</script>

<style lang="scss" scoped>
    .redirect-enter-active, .redirect-leave-active {
        transition: opacity .5s;
    }
    .redirect-enter, .redirect-leave-to {
        opacity: 0;
    }

    .quizer-mainapp {
        width: 100%;
        height: 100%;
        display: flex;

        &-sidemenu {
            width: 15%;
            height: 100%;
            background: rgb(99,152,214);
            background: linear-gradient(58deg, rgba(99,152,214,1) 0%, rgba(100,160,223,0.7315301120448179) 35%, rgba(87,145,214,1) 100%);
            -webkit-box-shadow: 8px 7px 19px -1px rgba(0,0,0,0.75);
            -moz-box-shadow: 8px 7px 19px -1px rgba(0,0,0,0.75);
            box-shadow: 8px 7px 19px -1px rgba(0,0,0,0.75);
            z-index: 1;

            &-elements {
                width: 100%;
                height: 90%;
            }

            &-logo {
                width: 100%;
                height: 10%;

                &-content {
                    width: 80%;
                    height: 100%;
                    margin: auto;
                    border-bottom: 1px solid rgba(239, 239, 239, 0.5);
                    color: white;
                    font-size: 2vw;
                    text-align: center;
                    font-family: 'Boogaloo';
                    text-shadow: 1px 2px 2px #000000;

                    div {
                        position: relative;
                        top: 40%;

                        i {
                            padding-right: 15px;
                            transform: rotate(180deg) !important;
                        }
                    }
                }
            }
        }

        &-mainarea {
            width: 85%;
            height: 100%;
            background-color: rgba(219, 219, 219, 0.7);
            overflow: auto;

            &-topmenu{
                width: 100%;
                height: 10%;
                border-bottom: 1px solid rgba(250, 253, 234, 0.5);
            }

            &-content {
                min-height: 90%;
                width: 100%;
            }
        }
    }


</style>
