<template>
    <div class="quizer-creator">
        <Config></Config>
        <QuizList></QuizList>

        <v-snackbar v-model="configWarning" color="warning" multi-line>
            Seems like you want to create quiz without basic parameters. Please fill {{warningDetails}}.
            <v-btn
                    color="error"
                    text
                    @click="configWarning = false"
            >
                Close
            </v-btn>
        </v-snackbar>

        <div class="upload-quiz" v-if="!config.editMode && config.editMode !== undefined">
            <v-btn @click="startUploadingProcess" large color="secondary">Upload Quiz</v-btn>
        </div>

        <v-dialog v-model="showValidationWarning" max-width="690">
            <v-card>
                <v-toolbar
                        flat
                        color="warning"
                        dark
                >
                    <v-card-text class="warning-header">Ooops! Seems like you didn't provide all informations. <v-icon right color="error">far fa-frown-open</v-icon></v-card-text>
                </v-toolbar>
                <v-card-text>
                    Don't worry, we can help you finish your quiz.
                    <p>You can find all mising data below: </p>
                    <v-expansion-panels multiple>
                        <v-expansion-panel v-for="validations in validationDetails.missingFields">
                            <v-expansion-panel-header>{{validations.title}}</v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <p class="primary--text" v-for="index in validations.indexes">Question number {{index + 1}}</p>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                        <v-expansion-panel v-if="validationDetails.numberOfQuestions">
                            <v-expansion-panel-header>Number of questions</v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <p class="primary--text">You must provide at least 5 questions</p>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-card-text>
            </v-card>
        </v-dialog>

    </div>
</template>

<script>
    import Config from './Config'
    import QuizList from './QuizList'
    import {Eventbus} from '../../eventbus/Eventbus'
    import firebase from "firebase";
    import "firebase/auth";
    import router from '../../router'

    const db = firebase.firestore();
    const axios = require('axios');

    export default {
        name: "QuizCreator",
        components: {
            QuizList,
            Config
        },
        data() {
            return {
                configWarning: false,
                warningDetails: '',
                config: {},
                showValidationWarning: false,
                validationDetails: {
                    missingFields: [],
                    numberOfQuestions: false
                }
            }
        },
        methods: {
          showConfigWarnign({title, category, description}) {
              this.warningDetails = '';
              if(title === '')
                  this.warningDetails += ' title,';

              if(category === '')
                  this.warningDetails += ' category,';

              if(description === '')
                  this.warningDetails += ' description';

              this.configWarning = true;
          },
          updateConfig(config) {
              this.config = config;
          },
          startUploadingProcess() {
              console.log("weszlo 1");
              Eventbus.$emit('collectQuizData');
          },
          uploadData(questions) {
              this.config.numberOfQuestions = questions.length;
              const data = {
                  title: this.config.title,
                  category: this.config.category,
                  description: this.config.description,
                  multipleChoices: this.config.multipleChoices,
                  numberOfQuestions: this.config.numberOfQuestions,
                  questions
              };
              const user = firebase.auth().currentUser;
              axios.post('https://us-central1-quizer-2b2ff.cloudfunctions.net/validateQuiz', data)
                  .then(response => {
                      const responseData = response.data;
                      console.log(responseData);
                      if(responseData.validationStatus) {
                          db.collection("Users").doc(user.email).update({
                              quizes: firebase.firestore.FieldValue.arrayUnion(data.title)
                          });
                          let owner;
                          db.collection("Users").doc(user.email).get()
                              .then(doc => {
                                  owner = doc.data().nickname;
                                  db.collection("Quizes").doc(data.title).set({
                                      owner: owner,
                                      rating: 0,
                                      firstRating: false,
                                      comments: [],
                                      ...data
                                  });
                              })
                      }else {
                          this.validationDetails.missingFields = [];
                          this.validationDetails.numberOfQuestions = false;

                          if(responseData.emptyTitle.length > 0) {
                              this.validationDetails.missingFields.push({title: "Missing questions title", indexes: responseData.emptyTitle})
                          }
                          if(responseData.emptyAnswer.length > 0) {
                              this.validationDetails.missingFields.push({title: "Missing answers", indexes: responseData.emptyAnswer})
                          }
                          if(responseData.correctAnswerNotSelected.length > 0) {
                              this.validationDetails.missingFields.push({title: "Missing correct answers", indexes: responseData.correctAnswerNotSelected})
                          }
                          if(responseData.numberOfQuestions) {
                              this.validationDetails.numberOfQuestions = true;
                          }

                          this.showValidationWarning = true;
                      }
                  })
                  .catch(error => console.log(error))
          },
          updateFromLoad(data) {
              const config = {
                  category: data.category,
                  description: data.description,
                  editMode: false,
                  multipleChoices: data.multipleChoices,
                  shuffle: data.shuffle,
                  title: data.title
              }

              this.updateConfig(config);
          }
        },
        created() {
            Eventbus.$on('configFieldsMissing', this.showConfigWarnign);
            Eventbus.$on('configFields', this.updateConfig);
            Eventbus.$on('quizDataSent', this.uploadData);
            Eventbus.$on('loadData', this.updateFromLoad);
        },
        beforeDestroy() {
            Eventbus.$off('configFieldsMissing');
            Eventbus.$off('configFields');
            Eventbus.$off('quizDataSent');
            Eventbus.$off('loadData');
        }
    }
</script>

<style lang="scss">

    .quizer-creator {
        width: 100%;
        height: 100%;
        padding-top: 5%;
        z-index: -1;
    }

    .upload-quiz {
        position: fixed;
        right: 5%;
        bottom: 5%;
    }

    .warning-header {
        display: flex;
        justify-content: space-between;
    }

</style>
