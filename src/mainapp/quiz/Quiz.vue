<template>
    <div class="quizer-quiz-wrapper">
        <v-card>
            <v-responsive :aspect-ratio="16/9">
                <v-card-text v-if="!summary">
                    <p class="quizer-quiz-question"><span class="info--text">{{questionNumber}}. {{currentQuestion.title}}</span></p>
                    <div class="quizer-quiz-answers">
                        <div class="quizer-quiz-answer" v-for="(answer, index) in currentQuestion.answers" :key="'actualquizanswer' + index">
                            <div class="quizer-quiz-answer-group" :key="'quizanswergroup' + index">
                                <v-checkbox color="warning" :value="answers[index]"  @change="setAnswer(index)" :key="'correctAnswerState' + index"></v-checkbox>
                                <span style="font-size: 22px" class="info--text" :key="'fieldwithanswer' + index">{{answer.answerField}}</span>
                            </div>
                            <v-divider></v-divider>
                        </div>
                    </div>
                    <div class="quizer-quiz-submit">
                        <v-btn color="warning" width="50%" :disabled="!answerSelected" @click="submitAnswer">{{submitButton}}</v-btn>
                    </div>
                </v-card-text>
                <v-card-text v-else>
                    <div class="quizer-quiz-summary">
                        <p>Seems like you have finished this quiz. You correctly answered
                            <span class="success--text">{{correctAnswers}}</span>
                            out of <span class="secondary--text">{{questionNumber}} all questions</span>
                        </p>
                        <p>That means you have result about <span class="success--text">{{Math.round((correctAnswers/questionNumber * 100) * 100) / 100}}</span>%</p>
                        <div class="quizer-quiz-summary-rate" v-if="!quizRated">
                            <p>If you enjoy this quiz please rate it below</p>
                            <v-rating half-increments v-model="quizRate" @input="quizRateAction = true"></v-rating>
                        </div>
                        <p>Good luck with other quizes <v-icon color="success">fa-smile</v-icon></p>
                        <div class="quizer-quiz-summary-actionbuttons">
                            <v-btn color="success" width="35%" @click="playAgain">Play again</v-btn>
                            <v-btn color="info" width="35%" @click="returnToList">Back to quizes list</v-btn>
                        </div>
                    </div>
                </v-card-text>
            </v-responsive>
        </v-card>
    </div>
</template>

<script>

    import firebase from "firebase";
    import "firebase/auth";
    import router from '../../router'

    const axios = require('axios');
    const db = firebase.firestore();

    export default {
        name: "Quiz",
        props: ["quizname"],
        data() {
            return {
                questionNumber: 1,
                answers: [],
                answerSelected: false,
                summary: false,
                correctAnswers: 0,
                quizRated: false,
                quizRate: 1,
                quizRateAction: false
            }
        },
        computed: {
          currentQuestion() {
              return this.$store.state.questions[this.questionNumber - 1];
          },
          multipleChoices() {
              return this.$store.state.multipleChoices;
          },
          submitButton() {
              if(this.questionNumber < this.$store.state.questions.length) {
                  return 'Submit'
              } else {
                  return 'Finish'
              }
          }
        },
        methods: {
            resetAnswers() {
                let arr = [];
                this.currentQuestion.answers.forEach(x => arr.push(false));
                this.answers = arr;
            },
            setAnswer(index) {
                if(!this.multipleChoices) {
                    const currentState = this.answers[index];
                    this.resetAnswers();
                    this.answers[index] = !currentState;
                    this.answerSelected = this.answers.some(x => x === true);
                }else {
                    this.answers[index] = !this.answers[index];
                    this.answerSelected = this.answers.some(x => x === true);
                }
            },
            submitAnswer() {
                const isAnswerSelected = this.answers.some(x => x === true);
                if(isAnswerSelected && this.questionNumber < this.$store.state.questions.length) {
                    this.$store.commit('setAnswer', this.answers);
                    this.resetAnswers();
                    this.questionNumber ++;
                    this.answerSelected = this.answers.some(x => x === true);
                }else if(isAnswerSelected && this.questionNumber === this.$store.state.questions.length) {
                    this.$store.commit('setAnswer', this.answers);

                    this.getRatingState();
                    axios.post('https://us-central1-quizer-2b2ff.cloudfunctions.net/calculateQuiz', {
                        questions: this.$store.state.questions,
                        answers: this.$store.state.answers
                    })
                        .then(response => {
                            this.correctAnswers = response.data.correctAnswers;
                            this.summary = true;
                        });
                } else {}
            },
            playAgain() {
                db.collection("Users").doc(this.$attrs.email).update({
                        quizesRated: firebase.firestore.FieldValue.arrayUnion(this.quizname)
                    })
                    .then(data => {
                        if(this.quizRateAction) {
                            db.collection("Quizes").doc(this.quizname).get()
                                .then(doc => {
                                    const rating = doc.data().rating;
                                    const firstRating = doc.data().firstRating;
                                    let newRating = 0;
                                    if(firstRating) {
                                        newRating = (rating + this.quizRate) / 2;
                                    }else {
                                        newRating = this.quizRate;
                                    }
                                    db.collection("Quizes").doc(this.quizname).update({
                                        rating: newRating,
                                        firstRating: true
                                    })
                                        .then(data => {
                                            this.questionNumber = 1;
                                            this.resetAnswers();
                                            this.summary = false;
                                            this.answerSelected = this.answers.some(x => x === true);
                                            this.$store.state.answers = [];
                                        })
                                })
                        } else {
                            this.questionNumber = 1;
                            this.resetAnswers();
                            this.summary = false;
                            this.answerSelected = this.answers.some(x => x === true);
                            this.$store.state.answers = [];
                        }

                    })
            },
            returnToList(){
                db.collection("Users").doc(this.$attrs.email).update({
                    quizesRated: firebase.firestore.FieldValue.arrayUnion(this.quizname)
                })
                    .then(data => {
                        if(this.quizRateAction) {
                            db.collection("Quizes").doc(this.quizname).get()
                                .then(doc => {
                                    const rating = doc.data().rating;
                                    const firstRating = doc.data().firstRating;
                                    let newRating = 0;
                                    if(firstRating) {
                                        newRating = (rating + this.quizRate) / 2;
                                    }else {
                                        newRating = this.quizRate;
                                    }
                                    db.collection("Quizes").doc(this.quizname).update({
                                        rating: newRating,
                                        firstRating: true
                                    })
                                        .then(data => {
                                            router.push({name: 'quizer'})
                                        })
                                })
                        } else {
                            router.push({name: 'quizer'})
                        }

                    })
            },
            getRatingState() {
                db.collection("Users").doc(this.$attrs.email).get()
                    .then(doc => {
                        if(doc.data().quizesRated.includes(this.quizname)) {
                            this.quizRated = true;
                        } else {}
                    })
            }
        },
        created() {
            this.resetAnswers();
            this.$store.state.answers = [];
            this.getRatingState();
        }
    }
</script>

<style lang="scss" scoped>

    .quizer-quiz {

        &-wrapper {
            width: 80%;
            margin: auto;
            padding-top: 3%;
        }

        &-answers {
            width: 70%;
            margin: auto;
        }

        &-answer {
            width: 100%;
            height: 85px;


            &-group {
                width: 100%;
                height: 100%;
                display: flex;
                -webkit-box-align: center;
                align-items: center;

                span {
                    transform: translateY(-2px);
                }
            }
        }

        &-submit {
            width: 70%;
            margin: auto;
            padding-top: 50px;
            text-align: center;
        }

        &-question {
            width: 70%;
            margin: auto;
            text-align: center;
            font-size: 30px;
            padding-top: 25px;
            padding-bottom: 25px;
        }

        &-summary {
            width: 70%;
            margin: auto;
            text-align: center;
            font-size: 22px;
            padding-top: 25px;

            p {
                padding-top: 15px;
            }

            &-rate {
                width: 100%;
            }

            &-actionbuttons {
                width: 100%;
                text-align: center;
                margin-top: 100px;

                :nth-child(1) {
                    margin-right: 10px;
                }

                :nth-child(2) {
                    margin-left: 10px;
                }
            }
        }
    }
</style>
