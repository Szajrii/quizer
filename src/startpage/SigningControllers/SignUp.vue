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
                            v-model="email"
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
                            v-model="nickname"
                            :rules="[rules.required]"
                    ></v-text-field>
                    <div class="quizer-registerbutton">
                        <v-btn color="accent" :block="buttonProps" :x-large="buttonProps" @click="startRegister">
                            Register
                        </v-btn>
                    </div>
                    <div class="quizer-registerwarning red--text text-center" >
                        <transition name="fade">
                            <p v-if="showWarning">{{warning}}</p>
                        </transition>
                    </div>
                </v-form>
            </div>
        </div>
    </v-app>

</template>

<script>
    import * as firebase from "firebase/app";
    import "firebase/auth";
    const axios = require('axios');

    export default {
        name: "SignUp",

        data () {
            return {
                show1: false,
                showWarning: false,
                password: '',
                buttonProps: true,
                email: '',
                nickname: '',
                rules: {
                    required: value => !!value || 'Required.',
                    min: v => v.length >= 8 || 'Min 8 characters',
                    emailMatch: v => this.validateEmail(v) || 'Invalid format'
                },
                warning: ''
            }
        },
        methods: {
            validateEmail(email) {
                const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return reg.test(String(email).toLowerCase());
            },
            startRegister() {
                if(!this.nickname || !this.email || (!this.password && this.password.length < 8)) {
                    this.showWarning = true;
                    this.warning = 'You must fill every field.'
                    setTimeout(()=> {this.showWarning = false}, 8000);
                } else {
                    axios.post('https://us-central1-quizer-2b2ff.cloudfunctions.net/validateEmail', {
                        email: this.email
                    })
                    .then(response => {
                        if(response.data) {
                            firebase.auth().createUserWithEmailAndPassword(this.email, this.password).catch(function(error) {
                                const errorCode = error.code;
                                const errorMessage = error.message;
                            });
                        }else {
                            this.showWarning = true;
                            this.warning = 'Please enter correct email.';
                            setTimeout(()=> {this.showWarning = false}, 8000);
                        }
                    })
                    .catch(error => console.log(error))
                }
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

    .quizer-registerbutton {
        width: 60%;
        margin: auto;
    }

    .quizer-registerwarning {
        margin-top: 15px;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity 1s;
    }
    .fade-leave-to {
        opacity: 0;
    }
</style>
