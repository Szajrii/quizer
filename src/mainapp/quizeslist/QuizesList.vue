<template>
    <div class="quizer-quizeslist">
        <v-container fluid>
            <v-row>
                <v-col cols="12">
                    <v-row
                            align="center"
                            justify="center"
                            class="grey lighten-5"
                    >
                        <QuizCard v-for="quiz in quizesList" :title="quiz.title" :category="quiz.category" :rating="quiz.rating"></QuizCard>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import QuizCard from './components/QuizCard'
    import firebase from "firebase";
    import "firebase/auth";
    import router from '../../router'

    const db = firebase.firestore();
    const axios = require('axios');
    export default {
        name: "QuizesList",
        components: {QuizCard},
        data() {
            return {
                quizesList: []
            }
        },
        created() {
            db.collection("Quizes").get()
                .then(doc => {
                doc.forEach(x=> this.quizesList.push(x.data()));
            })
        },
        beforeDestroy() {
            this.quizesList = [];
        }
    }
</script>

<style lang="scss" scoped>

    .quizer-quizeslist {
        width: 80%;
        margin: auto;
    }
</style>
