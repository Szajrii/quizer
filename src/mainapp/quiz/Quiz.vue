<template>
    <div class="quizer-quiz-wrapper">
        <v-card>
            <v-responsive :aspect-ratio="16/9">
                <v-card-text>
                    <p class="quizer-quiz-question"><span class="info--text">{{questionNumber}}. {{currentQuestion.title}}</span></p>
                    <div class="quizer-quiz-answers">
                        <div class="quizer-quiz-answer" v-for="(answer, index) in currentQuestion.answers" :key="'actualquizanswer' + index">
                            <div class="quizer-quiz-answer-group">
                                <v-checkbox color="warning"  @change="setAnswer(index)" :key="'correctAnswerState' + index"></v-checkbox>
                                <span style="font-size: 22px" class="info--text">{{answer.answerField}}</span>
                            </div>
                            <v-divider></v-divider>
                        </div>
                    </div>
                    <div class="quizer-quiz-submit">
                        <v-btn color="warning" width="50%" :disabled="!answerSelected" @click="submitAnswer">Submit</v-btn>
                    </div>
                </v-card-text>
            </v-responsive>
        </v-card>
    </div>
</template>

<script>

    import firebase from "firebase";
    import "firebase/auth";
    const db = firebase.firestore();

    export default {
        name: "Quiz",
        props: ["quizname"],
        data() {
            return {
                questionNumber: 1,
                answers: [],
                answerSelected: false
            }
        },
        computed: {
          currentQuestion() {
              return this.$store.state.questions[this.questionNumber - 1];
          },
          multipleChoices() {
              return this.$store.state.multipleChoices;
          },
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
                if(isAnswerSelected) {
                    this.$store.commit('setAnswer', this.answers);
                    this.resetAnswers();
                    this.questionNumber ++;
                }else {}
            }
        },
        created() {
            this.resetAnswers();
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
    }
</style>
