<template>
        <div class="quizer-creator-config">
            <v-form>
                <div class="quizer-creator-config-title">

                        <v-text-field class="title-textfield"
                                      label="Title"
                                      color="white"
                                      height="100%"
                                      append-icon="fas fa-book-reader"
                                      :rules="[rules.title]"
                                      v-model="quizConfig.title"
                                      v-if="!editMode"
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
                            v-if="!editMode"
                    ></v-text-field>
                    <p v-else><span class="primary--text">Category: </span>{{quizConfig.category}}</p>
                </div>
                <div class="quizer-creator-config-field">
                    <div v-if="!editMode">
                        <v-switch label="Multiple choices" color="success"></v-switch>
                        <v-switch label="Shuffle questions" color="success"></v-switch>
                    </div>

                </div>
                <div class="quizer-creator-config-field">
                    <v-textarea
                            label="Quiz description"
                            hint="Max 300 characters"
                            :rules="[rules.description]"
                            v-model="quizConfig.description"
                            v-if="!editMode"
                    ></v-textarea>
                    <div v-else>
                        <span class="primary--text">Description: </span>
                        <p >{{quizConfig.description}}</p>
                    </div>

                </div>

            </v-form>
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
        </div>
</template>

<script>
    export default {
        name: "Config",
        data() {
            return {
                rules: {
                    title: x => x.length <= 30  || 'Max 30 characters',
                    description: x => x.length <= 300  || 'Max 300 characters',
                    category: x => x.length <= 20  || 'Max 20 characters'
                },
                editMode: false,
                quizConfig: {
                    title: '',
                    category: '',
                    description: ''
                }
            }
        },
        methods: {
            changeEditMode() {
                this.editMode = !this.editMode;
            }
        },
        computed: {
            activeButton() {
                if(!this.editMode) {
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
    }

    .title-textfield {
        width: 80%;
        margin: auto;
        color: white !important;
    }

</style>
