<template>
    <div class="quizer-creator-question">
        <v-card>
            <v-toolbar
                flat
                color="#00838F"
                dark
            >
                    <div class="title-questionnumber">{{questionNumber}}. </div>
                    <div class="quizer-creator-question-title">
                        <v-text-field
                                label="Question"
                                single-line
                                full-width
                                hide-details
                                v-model="questionController.title"
                        ></v-text-field>
                    </div>
                    <div class="title-removeicon"><v-icon @click="$emit('questionToBeRemoved', questionNumber)">far fa-trash-alt</v-icon></div>
            </v-toolbar>
            <v-form>
                <QuestionField
                        v-for="(answer, index) in questionController.answers"
                        :key="'answer' + Math.random()" :answer="answer"
                        :index="index"
                        :numberOfAnswers="questionConfig.numberOfAnswers"
                        @changeAnswer="updateAnswers"
                        @answerToBeRemoved="removeAnswer"
                        @setCorrectAnswer="changeCorrectAnswersState"
                ></QuestionField>
            </v-form>
            <v-toolbar
                    flat
                    color="#CFD8DC"
                    dark
            >
                <v-btn text icon color="success" fixed right @click="addAnswer" :disabled="questionController.answers.length >= 6">
                    <v-icon large>mdi-plus</v-icon>
                </v-btn>
            </v-toolbar>
        </v-card>
    </div>

</template>

<script>
    import QuestionField from './QuestionField'
    export default {
        name: "Question",
        components: {
            QuestionField
        },
        props: ["questionNumber", "question", "multiple"],
        data() {
            return {
                questionConfig: {
                    numberOfAnswers: 3
                },
                questionController: this.question,
            }
        },
        methods: {
            updateAnswers({index, answerField}) {
                this.questionController.answers[index].answerField = answerField;
            },
            removeAnswer(index) {
                if(this.questionController.answers.length > 2) {
                    this.questionController.answers.splice(index, 1);
                }
                this.questionConfig.numberOfAnswers = this.questionController.answers.length;
            },
            addAnswer() {
                if (this.questionController.answers.length < 6) {
                    this.questionController.answers.push({answerField: "Type your answer here", correctAnswer: false })
                }

                this.questionConfig.numberOfAnswers = this.questionController.answers.length;
            },
            changeCorrectAnswersState(index) {
                if(!this.multiple) {
                    this.questionController.answers.forEach(answer => answer.correctAnswer = false);
                    this.questionController.answers[index].correctAnswer = true;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

    .question-select {
        width: 50%;
        display: flex;
        -webkit-box-align: center;
        align-items: center;
    }
    .quizer-creator-question {
        width: 100%;
        margin-bottom: 5%;

        &-title {
            width: 100%;
        }
    }
</style>
