<template>
    <div class="quizer-creator-question">
        <v-card :key="'question v-card ' + index">
            <v-toolbar
                flat
                color="#00838F"
                dark
            >
                    <div class="title-questionnumber">{{index + 1}}. </div>
                    <div class="quizer-creator-question-title">
                        <v-text-field
                                :label="question.title"
                                single-line
                                full-width
                                hide-details
                                v-model="title"
                                @change="$emit('updateQuestionTitle', {title, index})"
                        ></v-text-field>
                    </div>
                    <div class="title-removeicon"><v-icon @click="$emit('questionToBeRemoved', index)">far fa-trash-alt</v-icon></div>
            </v-toolbar>
            <QuestionField
                    v-for="(answer, index2) in question.answers"
                    :key="'question ' + index + ' answer ' + index2" :answer="answer"
                    :index="index2"
                    :questionIndex="index"
                    :numberOfAnswers="question.answers.length"
            ></QuestionField>
            <v-toolbar
                    flat
                    color="#CFD8DC"
                    dark
            >
                <v-btn text icon color="success" fixed right @click="addAnswer" :disabled="question.answers.length >= 6">
                    <v-icon large>mdi-plus</v-icon>
                </v-btn>
            </v-toolbar>
        </v-card>
    </div>

</template>

<script>
    import QuestionField from './QuestionField'
    import {Eventbus} from '../../../eventbus/Eventbus'
    export default {
        name: "Question",
        components: {
            QuestionField
        },
        props: ["question", "multiple", "index"],
        data() {
            return {
                title: ""
            }
        },
        methods: {
            addAnswer() {
                if (this.question.answers.length < 6) {
                    Eventbus.$emit('addAnswer', this.index);
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

    .title-removeicon i:hover {
        color: red;
    }
</style>
