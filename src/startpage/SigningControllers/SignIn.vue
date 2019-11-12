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
                            :rules="[rules.required]"
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
                    <div class="quizer-signerbutton">
                        <v-btn color="primary" :block="buttonProps" :x-large="buttonProps" @click="logIn">
                            Login
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

    export default {
        name: "SignIn",
        data() {
            return {
                show1: false,
                showWarning: false,
                password: '',
                buttonProps: true,
                email: '',
                rules: {
                    required: value => !!value || 'Required.',
                    min: v => v.length >= 8 || 'Min 8 characters',
                },
            }
        },
        methods: {
            logIn() {
                if(!this.email || !this.password) {
                    showWarning.call(this, "You must fill every field.")
                }else if(this.password.length < 8) {
                    showWarning.call(this, "Provided password must be at least 8 characters long")
                }else {
                    firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                        .then(()=> {
                            firebase.auth().onAuthStateChanged(user => {
                                if (user) {
                                    router.push( { name: 'quizer', params: {'email': this.email} } )
                                } else {}
                            });
                        })
                        .catch(error => {
                        showWarning.call(this, error.message)
                    });
                }
            }
        }
    }
    function showWarning(text) {
        this.warning = text;
        this.showWarning = true;
        setTimeout(()=>{this.showWarning = false}, 8000)
    }
</script>

<style scoped>

</style>
