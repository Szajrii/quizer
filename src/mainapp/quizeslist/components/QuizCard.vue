<template>
    <v-card
            class="mx-auto ma-3 pa-6"
            max-width="400"
    >
        <v-img
                class="white--text align-end"
                height="200px"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        >
            <v-card-title>{{quiz.title}}</v-card-title>
        </v-img>

        <v-card-subtitle class="pb-0">Category: {{quiz.category}}</v-card-subtitle>

        <v-rating :value="quiz.rating" readonly background-color="success" color="success" half-increments></v-rating>

        <v-card-actions>
            <v-btn
                    color="orange"
                    text
                    @click="playQuiz"
            >
                Play
            </v-btn>

            <v-btn
                    color="orange"
                    text
                    @click="dialog = true"
            >
                Details
            </v-btn>
        </v-card-actions>

<!--        Hidden Dialog for each quiz-->
        <v-dialog v-model="dialog" :width="dialogWidth">
            <v-card
                    class="mx-auto"
                    :max-width="dialogWidth"
                    :min-height="dialogHeight"
            >
                <v-img
                        class="white--text align-end"
                        height="200px"
                        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                >
                    <v-card-title>{{quiz.title}}</v-card-title>
                </v-img>

                <v-card-subtitle class="pb-0">
                    Category: {{quiz.category}}
                    <v-rating style="float: right" :value="quiz.rating" readonly background-color="success" color="success" half-increments></v-rating>
                </v-card-subtitle>

                <v-card-text class="text--primary">
                    {{quiz.description}}
                </v-card-text>

                <v-card-actions>
                    <v-btn
                            color="orange"
                            text
                            @click="playQuiz"
                    >
                        Play
                    </v-btn>
                </v-card-actions>
                <div class="quizcard-comments-section">
                    <div class="quizcard-comments-section-header">
                        <h2>Comments</h2>
                        <v-icon color="black" @click="addCommentVisible = true" v-if="!addCommentVisible">fas fa-plus</v-icon>
                        <v-icon color="black" @click="addCommentVisible = false" v-else>fas fa-minus</v-icon>
                    </div>
                    <transition name="showCommentAdd">
                        <div class="quizcard-comments-section-add" v-if="addCommentVisible">
                            <v-textarea
                                    name="input-7-1"
                                    label="Add comment"
                                    v-model="commentContent"
                            ></v-textarea>
                            <v-btn color="cyan" style="margin: 10px 5px" :disabled="commentContent.length < 1" @click="addComment">Add comment</v-btn>
                        </div>
                    </transition>
                    <div class="quizcard-comments-section-items">
                        <Comment v-for="(comment, index) in comments" :comment="comment" :key="'comment' + index"></Comment>
                    </div>
                </div>
            </v-card>
        </v-dialog>
    </v-card>
</template>

<script>

    import Comment from './Comment'
    import firebase from "firebase";
    import "firebase/auth";
    import {Eventbus} from "../../../eventbus/Eventbus";
    import router from '../../../router'

    const db = firebase.firestore();

    export default {
        name: "QuizCard",
        components: {Comment},
        props: ["quiz"],
        data() {
            return {
                dialog: false,
                dialogHeight: 0,
                dialogWidth: 0,
                addCommentVisible: false,
                commentContent: ''
            }
        },
        computed: {
          comments() {
              return this.quiz.comments.reverse()
          }
        },
        methods: {
            changeDialogResolution() {
                let val = window.innerWidth;
                switch (true) {
                    case(val > 1200):
                        this.dialogWidth = 1200;
                        this.dialogHeight = 600;
                        break;
                    case(val > 900 && val < 1200):
                        this.dialogWidth = 600;
                        this.dialogHeight = 500;
                        break;
                    case(val > 500 && val < 900):
                        this.dialogWidth = 450;
                        this.dialogHeight = 600;
                        break;
                    case(val < 500):
                        this.dialogWidth = 200;
                        this.dialogHeight = 400;
                        break;
                }
            },
            addComment() {
                if(this.commentContent.length > 0) {
                    let user = firebase.auth().currentUser;
                    const date = new Date();
                    const fullDate = {
                        day: date.getDate(),
                        month: date.getMonth(),
                        year: date.getFullYear()
                    };
                    db.collection('Users').doc(user.email).get()
                        .then(doc => {
                            user = doc.data().nickname;

                            db.collection('Quizes').doc(this.quiz.title).update({
                                comments: firebase.firestore.FieldValue.arrayUnion({
                                    author: user,
                                    content: this.commentContent,
                                    date: `${fullDate.day}/${fullDate.month}/${fullDate.year}`
                                })
                            })
                        });
                    Eventbus.$emit('updateQuizComments', this.quiz.title);
                }
            },
            playQuiz() {
                this.setUpQuiz();
                router.push( { name: 'quiz', params: {'quizname': this.quiz.title} } )
            },
            setUpQuiz() {
                db.collection("Quizes").doc(this.quiz.title).get()
                    .then(doc => {
                        console.log(doc.data());
                        this.$store.state.questions = doc.data().questions;
                        this.$store.state.multipleChoices = doc.data().multipleChoices;
                        this.$store.state.answers = [];
                        console.log(this.$store.state)
                    })
            }
        },
        mounted() {
            window.addEventListener('resize', this.changeDialogResolution)
        },
        created() {
            this.changeDialogResolution();
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.changeDialogResolution)
        }
    }
</script>

<style lang="scss" scoped>

    .quizcard-comments-section {
        width: 100%;

        &-header {
            text-align: center;
            display: flex;
            justify-content: center;

            h2 {
                text-align: center;
            }

            i {
                text-align: center;
                padding-left: 10px;
            }
        }

        &-items, &-add {
            width: 100%;
        }

        &-add {
            &-button {
                width: 100%;
                padding-bottom: 20px;
            }
        }

        .showCommentAdd-enter-active, .showCommentAdd-leave-active {
            transition: transform .5s;
        }
        .showCommentAdd-enter, .showCommentAdd-leave-to /* .fade-leave-active below version 2.1.8 */ {
            transform: translateX(-100em);
        }

    }
</style>
