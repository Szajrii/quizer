<template>

    <v-app>
        <div class="quizer-start">
            <div class="quizer-signin">
                <v-form>
                    <v-text-field
                            label="Email"
                            outlined
                            type="email"
                            color="#5f99c9"
                            :rules="[rules.emailMatch]"
                    ></v-text-field>
                    <v-text-field
                            v-model="password"
                            :append-icon="show1 ? 'fas fa-eye' : 'fas fa-eye-slash'"
                            :rules="[rules.required, rules.min]"
                            :type="show1 ? 'text' : 'password'"
                            label="Password"
                            counter
                            color="#5f99c9"
                            @click:append="show1 = !show1"
                    ></v-text-field>
                    <v-text-field
                            label="Nickname"
                            outlined
                            color="#5f99c9"
                    ></v-text-field>
                </v-form>
            </div>
        </div>
    </v-app>

</template>

<script>
    export default {
        name: "SignIn",

        data () {
            return {
                show1: false,
                password: '',
                rules: {
                    required: value => !!value || 'Required.',
                    min: v => v.length >= 8 || 'Min 8 characters',
                    emailMatch: v => this.validateEmail(v) || 'Invalid format'
                },
            }
        },
        methods: {
            validateEmail(email) {
                const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return reg.test(String(email).toLowerCase());
            }
        }


    }
</script>

<style scoped lang="scss">
    .quizer-start {
        width: 100%;
        height: 100%;
        background-image: url("../../img/start.jpg");
        background-position: center;
        background-repeat: no-repeat;
    }

    .quizer-signin {
        width: 50%;
        margin: auto;
        padding-top: 10%;
    }

</style>
