<template>
    <div class="quizer-creator-question-field">
        <div class="quizer-creator-question-field-wrapper">
            <div class="correct-answer">
                <v-checkbox color="success" :value="answer.correctAnswer" @change="setCorrectAnswer" :id="'checkbox' + Math.random()"></v-checkbox>
            </div>
            <v-text-field
                    :label="answer.answerField"
                    single-line
                    full-width
                    hide-details
                    v-model="answerField"
                    @change="changeAnswer"
            ></v-text-field>
            <div class="field-removeicon"><v-icon @click="removeAnswer" :disabled="this.numberOfAnswers <= 2">far fa-trash-alt</v-icon></div>
        </div>
        <v-divider></v-divider>
    </div>
</template>

<script>

    import {Eventbus} from "../../../eventbus/Eventbus";

    export default {
        name: "QuestionField",
        props: ["answer", "index", "numberOfAnswers", "questionIndex"],
        data() {
            return {
                answerField: ''
            }
        },
        methods: {
            removeAnswer() {
                if(this.numberOfAnswers > 2) {
                    Eventbus.$emit('answerToBeRemoved', {index: this.index, questionIndex: this.questionIndex})
                }
            },
            changeAnswer() {
                Eventbus.$emit('changeAnswer', {index: this.index, answerField: this.answerField, questionIndex: this.questionIndex})
            },
            setCorrectAnswer() {
                Eventbus.$emit('setCorrectAnswer', {index: this.index, questionIndex: this.questionIndex})
            }
        }
    }
</script>

<style lang="scss" scoped>

    .quizer-creator-question-field {
        width: 100%;

        &-wrapper {
            width: 100%;
            display: flex;
            -webkit-box-align: center;
            align-items: center;
        }
    }

    .field-removeicon {
        padding-right: 10px;

        i {
            font-size: 15px;
        }

        i:hover {
            font-size: 30px;
        }
    }

    .correct-answer {
        padding-left: 10px;

    }
</style>
