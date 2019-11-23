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
                                :value="question.title"
                                single-line
                                full-width
                                hide-details
                                v-model="questionController.title"
                        ></v-text-field>
                    </div>
                    <div class="title-removeicon"><v-icon>far fa-trash-alt</v-icon></div>
            </v-toolbar>
            <v-form>
                    <QuestionField
                            v-for="(answer, index) in questionController.answers"
                            :key="'answer' + index" :answer="answer"
                            :index="index"
                            @changeAnswer="updateAnswers"
                            @answerToBeRemoved="removeAnswer"
                    ></QuestionField>
            </v-form>
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
        props: ["questionNumber", "question"],
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
                this.questionController.answers[index] = answerField;
            },
            removeAnswer(index) {
                console.log(index);
                this.questionController.answers.splice(index, 1);
                this.questionConfig.numberOfAnswers = this.questionController.answers.length;
            }
        }
    }
</script>

<style lang="scss" scoped>



    .quizer-creator-question {
        width: 100%;
        margin-bottom: 5%;

        &-title {
            width: 100%;

        }
    }
</style>
