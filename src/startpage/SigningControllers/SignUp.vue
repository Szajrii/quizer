<template>

    <v-app>
        <div class="quizer-start">
            <div class="quizer-signin">
                <v-form>
                    <v-text-field
                            label="Email"
                            outlined
                            type="email"
                            color="white"
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
                            color="white"
                            @click:append="show1 = !show1"
                    ></v-text-field>
                    <v-text-field
                            label="Nickname"
                            outlined
                            color="white"
                            v-model="nickname"
                            :rules="[rules.required]"
                    ></v-text-field>
                    <div class="quizer-signerbutton">
                        <v-btn color="primary" :block="buttonProps" :x-large="buttonProps" @click="startRegister">
                            Register
                        </v-btn>
                    </div>
                    <div class="quizer-signerwarning red--text text-center" >
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
    import firebase from "firebase";
    import "firebase/auth";
    import router from '../../router'
    const axios = require('axios');
    const db = firebase.firestore();

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
                            firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                                .then(()=> {
                                    db.collection("Users").doc(this.email).set({
                                        email: this.email,
                                        nickname: this.nickname,
                                        quizes: [],
                                        quizesRated: []
                                    });
                                    firebase.auth().onAuthStateChanged(user => {
                                        if (user) {
                                            router.push( { name: 'quizer', params: {'email': this.email} } )
                                        } else {}
                                    });
                                })
                                .catch(error => {
                                this.showWarning = true;
                                this.warning = error.message;
                                setTimeout(()=> {this.showWarning = false}, 8000);
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

    .quizer-signin input {
        color: white !important;
    }


</style>
