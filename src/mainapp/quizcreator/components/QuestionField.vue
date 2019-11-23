<template>
    <div class="quizer-creator-question-field">
        <div class="quizer-creator-question-field-wrapper">
            <v-text-field
                    label="Answer"
                    single-line
                    full-width
                    hide-details
                    v-model="answerField"
                    @change="$emit('changeAnswer', {index: index, answerField: answerField})"
            ></v-text-field>
            <div class="field-removeicon"><v-icon @click="$emit('answerToBeRemoved', index)">far fa-trash-alt</v-icon></div>
        </div>
        <v-divider></v-divider>
    </div>
</template>

<script>

    export default {
        name: "QuestionField",
        props: ["answer", "index"],
        data() {
            return {
                answerField: this.answer
            }
        },
    }
</script>

<style lang="scss" scoped>

    .slide-leave-active {
        transition: all .5s;
    }
    .slide-leave-to /* .fade-leave-active below version 2.1.8 */ {
        transform: translateX(-100vh);
    }

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
</style>
