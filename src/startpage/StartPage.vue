<template>
    <v-app>
        <div class="quizer-start">
            <div class="quizer-appinfo">
                <li><span><i class="fas fa-medal" style="color: cornflowerblue"></i></span>Compete with other players</li>
                <li><span><i class="fas fa-cog" style="color: lightgreen"></i></span>Create your own quiz</li>
                <li><span><i class="far fa-lightbulb" style="color: yellow"></i></span>Learn something new</li>
            </div>
            <div class="quizer-sign">
                <p> Do not wait! Join quizer community now! <span @click="navigateToRegistation">Sign up</span></p>
                <p style="font-size: 1.3vw">If you already have account</p>
                <p><span @click="navigateToLogin">Sign in!</span></p>
            </div>
        </div>
    </v-app>
</template>

<script>
    import router from "../router"

    //TODO: Redesign start page something bigger and cooler :)
    export default {
        name: "StartPage",

        methods: {
            navigateToRegistation() {
                router.push({ path: '/Register' })
            },
            navigateToLogin() {
                router.push({ path: '/Login' })
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

    .quizer-appinfo {
        padding-top: 10%;
        width: 70%;
        margin: auto;
        text-align: center;
        font-family: Roboto;
        color: white;
        text-shadow: 2px 3px 2px #000000;
        list-style-type: none;

        li {
            font-size: 2vw;
            padding-top: 5px;
        }
        span {
            padding-right: 12px;
        }
    }

    .quizer-sign {
        width: 70%;
        margin: auto;
        text-align: center;
        font-family: Roboto;
        color: white;
        text-shadow: 2px 3px 2px #000000;
        padding-top: 20px;
        font-size: 2vw;

        span {
            color: deepskyblue;
            cursor: pointer;
        }
        p {
            padding-top: 10px;
        }
    }

</style>
