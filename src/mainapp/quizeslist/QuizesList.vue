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
                        <QuizCard v-for="(quiz, index) in quizesList" :quiz="quiz" :key="'quizcard' + index"></QuizCard>
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
    import {Eventbus} from "../../eventbus/Eventbus";

    const db = firebase.firestore();

    export default {
        name: "QuizesList",
        components: {QuizCard},
        data() {
            return {
                quizesList: []
            }
        },
        methods: {
            updateComments(title) {
                db.collection("Quizes").doc(title).get()
                    .then(doc => {
                        const quizToUpdate = this.quizesList.find(x=> x.title === title);
                        quizToUpdate.comments = doc.data().comments;
                    })
            }
        },
        created() {
            db.collection("Quizes").get()
                .then(doc => {
                    doc.forEach(x=> this.quizesList.push(x.data()));
            });
            Eventbus.$on('updateQuizComments', this.updateComments);
        },
        beforeDestroy() {
            this.quizesList = [];
            Eventbus.$off('updateQuizComments');
        }
    }
</script>

<style lang="scss" scoped>

    .quizer-quizeslist {
        width: 80%;
        margin: auto;
    }
</style>
