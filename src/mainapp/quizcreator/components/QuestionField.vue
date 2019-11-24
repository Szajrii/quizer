<template>
    <div class="quizer-creator-question-field">
        <div class="quizer-creator-question-field-wrapper">
            <div class="correct-answer">
                <v-checkbox color="success" v-model="config.correctAnswer" @change="$emit('setCorrectAnswer', index)"></v-checkbox>
            </div>
            <v-text-field
                    label="Answer"
                    single-line
                    full-width
                    hide-details
                    v-model="config.answerField"
                    @change="$emit('changeAnswer', {index: index, answerField: config.answerField})"
            ></v-text-field>
            <div class="field-removeicon"><v-icon @click="$emit('answerToBeRemoved', index)" :disabled="this.numberOfAnswers <= 2">far fa-trash-alt</v-icon></div>
        </div>
        <v-divider></v-divider>
    </div>
</template>

<script>

    export default {
        name: "QuestionField",
        props: ["answer", "index", "numberOfAnswers"],
        data() {
            return {
                config: this.answer
            }
        },
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
