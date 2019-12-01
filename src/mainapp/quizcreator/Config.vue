<template>
        <div class="quizer-creator-config">
            <v-icon class="info-config" color="info" @click="showDialog = true">fas fa-info-circle</v-icon>
            <div class="quizer-creator-config-title">
                    <v-text-field class="title-textfield"
                                  label="Title"
                                  color="white"
                                  height="100%"
                                  append-icon="fas fa-book-reader"
                                  :rules="[rules.title]"
                                  v-model="quizConfig.title"
                                  v-if="editMode"
                    ></v-text-field>
                    <p v-else>{{quizConfig.title}}</p>
            </div>
            <div class="quizer-creator-config-field">
                <v-text-field
                        label="Category"
                        height="100%"
                        append-icon="fab fa-buffer"
                        no-resize
                        :rules="[rules.category]"
                        v-model="quizConfig.category"
                        v-if="editMode"
                ></v-text-field>
                <p v-else><span class="primary--text">Category: </span>{{quizConfig.category}}</p>
            </div>
            <div class="quizer-creator-config-field">
                <div v-if="editMode">
                    <v-switch label="Multiple choices" color="success" v-model="quizConfig.multipleChoices"></v-switch>
                    <v-switch label="Shuffle questions" color="success" v-model="quizConfig.shuffle"></v-switch>
                </div>
                <div v-else>
                    <p><span class="primary--text">Multiple Choice: </span>{{quizConfig.multipleChoices}}</p>
                    <p><span class="primary--text">Shuffle Questions: </span>{{quizConfig.shuffle}}</p>
                </div>
            </div>
            <div class="quizer-creator-config-field">
                <v-text-field
                        v-model="quizConfig.numberOfQuestions"
                        label="Number of questions"
                        min="5"
                        step="1"
                        style="width: 170px"
                        type="number"
                        v-if="editMode"
                ></v-text-field>
                <p v-else><span class="primary--text">Number of questions: </span>{{quizConfig.numberOfQuestions}}</p>
            </div>
            <div class="quizer-creator-config-field">
                <v-textarea
                        label="Quiz description"
                        hint="Max 300 characters"
                        :rules="[rules.description]"
                        v-model="quizConfig.description"
                        no-resize
                        v-if="editMode"
                ></v-textarea>
                <div v-else>
                    <span class="primary--text">Description: </span>
                    <p >{{quizConfig.description}}</p>
                </div>

            </div>
            <v-fab-transition>
                <v-btn
                        :color="activeButton.color"
                        :key="activeButton.icon"
                        dark
                        small
                        absolute
                        bottom
                        right
                        fab
                        large
                        @click="changeEditMode"
                >
                <v-icon>{{activeButton.icon}}</v-icon>
                </v-btn>
            </v-fab-transition>
            <v-dialog v-model="showDialog" max-width="490">
                <v-card>
                    <v-toolbar
                            flat
                            color="#00838F"
                            dark
                    >
                        <v-card-text>Quiz Creator Description</v-card-text>
                    </v-toolbar>
                    <v-card-text>
                        Hi, I am glad you are here. Let's take a while and read the description below. This panel will help you create your own quiz. Yeeey!
                        Ok, let's be serious now. You have several options which will describe your quiz. First of all you must fill <span class="secondary--text">Title.</span>
                        Obviously we want to have each quiz with name, that will help other users to find and play your quiz. The title can have maximum 30 characters. It's better
                        to have short names. Next field that can't be empty is <span class="secondary--text">Category.</span> That will help users find quiz with category which are they
                        good at. This field can have up to 20 characters. And last field that must be completed is <span class="secondary--text">Description.</span> Let other users know
                        something more about your quiz. And remeber max 300 characters. Next you have <span class="info--text">Multiple Choices</span>
                        and <span class="info--text">Shuffle Questions</span> , which means you can decide wheter your quiz should have more than 1 correct answer or not and if the questions
                        and answers should be shuffled. Next you can enter <span class="info--text">number of questions</span> that will be generated. The number of questions can't be lesser
                        than 5, let other users play more than 10 seconds :). Don't worry you can add/remove questions manually. However if you decide to change number from config panel be
                        aware that if you type number lesser than current number of your questions you might loose a few last questions. Ok let's talk about question itself. Each question
                        can't be empty and number of answer can't be greater than 6 and can't be lesser than 2 - it would't be quiz anymore. And each question must have selected
                        at least one correct answer using checkbox. You can add/remove question/answer. After you're done with creatation, simply click add quiz button. It will be
                        validated and if everything is ok it will be uploaded and added to your account and will became visible and playable for other players.
                        Hope that's everything you must know. Good luck and have fun.
                        <v-icon color="success">far fa-smile</v-icon>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </div>
</template>

<script>
    import {Eventbus} from '../../eventbus/Eventbus'
    export default {
        name: "Config",
        data() {
            return {
                rules: {
                    title: x => x.length <= 30  || 'Max 30 characters',
                    description: x => x.length <= 300  || 'Max 300 characters',
                    category: x => x.length <= 20  || 'Max 20 characters'
                },
                editMode: true,
                quizConfig: {
                    title: '',
                    category: '',
                    description: '',
                    multipleChoices: false,
                    shuffle: false,
                    numberOfQuestions: 5
                },
                showDialog: false
            }
        },
        methods: {
            changeEditMode() {
                if(!this.areRequiredFieldsEmpty()) {
                    this.editMode = !this.editMode;
                    Eventbus.$emit('configFields', {
                        title: this.quizConfig.title,
                        category: this.quizConfig.category,
                        description: this.quizConfig.description,
                        multipleChoices: this.quizConfig.multipleChoices,
                        shuffle: this.quizConfig.shuffle,
                        numberOfQuestions: parseInt(this.quizConfig.numberOfQuestions),
                        editMode: this.editMode
                    })
                }else {
                    Eventbus.$emit('configFieldsMissing', {
                        title: this.quizConfig.title,
                        category: this.quizConfig.category,
                        description: this.quizConfig.description,
                    })
                }
            },
            areRequiredFieldsEmpty() {
                if(this.quizConfig.title === '' || this.quizConfig.category === '' || this.quizConfig.description === '') {
                    return true
                }else return false
            }
        },
        computed: {
            activeButton() {
                if(this.editMode) {
                    return {color: 'success', icon: 'fas fa-check'}
                }else {
                    return  {color: 'secondary', icon: 'fas fa-pen'}
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .quizer-creator-config {
        position: relative;
        min-height: 300px;
        width: 50%;
        margin: auto;
        background-color: white;
        border-radius: 5px;
        -webkit-box-shadow: 0 1px 4px 0 rgba(0,0,0,.14);
        -moz-box-shadow: 0 1px 4px 0 rgba(0,0,0,.14);
        box-shadow: 0 1px 4px 0 rgba(0,0,0,.14);
        font-family: Roboto;

        &-title {
            position: relative;
            left: 20%;
            top: -15px;
            width: 60%;
            height: 50px;
            background-color: rgba(37, 60, 181, 0.9);
            border-radius: 5px;
            -webkit-box-shadow: 14px 17px 73px -13px rgba(0,0,0,0.75);
            -moz-box-shadow: 14px 17px 73px -13px rgba(0,0,0,0.75);
            box-shadow: 14px 17px 73px -13px rgba(0,0,0,0.75);
            line-height: 50px;
            text-align: center;
            color: white;
        }

        &-field {
            width: 70%;
            margin: auto;
        }

        p {
            word-wrap: break-word;
        }
    }

    .title-textfield {
        width: 80%;
        margin: auto;
        color: white !important;
    }

    .info-config {
        position: absolute;
        right: 5%;
        top: 3%
    }

</style>
