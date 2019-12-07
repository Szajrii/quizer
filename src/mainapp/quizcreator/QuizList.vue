<template>
    <div class="quizer-creator-list">
        <div class="assistant-bar">
            <div class="assistant-bar-text" :class="{'assistant-bar-text-display' : displayAssistantBar}">
                <span>Title: <span class="warning--text">{{listConfig.title}}; </span></span>
                <span>Number of questions: <span class="warning--text">{{listConfig.numberOfQuestions}}; </span> </span>
                <span>Multiple: <span class="warning--text">{{listConfig.multipleChoices}}; </span></span>
                <span>Shuffle: <span class="warning--text">{{listConfig.shuffle}}; </span></span>
            </div>
            <div class="assistant-bar-arrow">
                <v-icon @click="displayAssistantBar = !displayAssistantBar" :class="{'assistant-bar-arrow-rotate' : displayAssistantBar}" color="white">
                    fas fa-caret-right
                </v-icon>
            </div>
        </div>
        <Question v-for="(question, index) in questions"
                  :index="index"
                  :key="'question' + index"
                  :question="question"
                  :multiple="listConfig.multipleChoices"
                  @questionToBeRemoved="removeQuestion"
                  @updateQuestionTitle="updateQuestionTitle"
        ></Question>
        <div class="add-question" v-if="!editMode">
            <v-btn color="success" dark large block @click="addQuestion">Add question</v-btn>
        </div>
    </div>
</template>

<script>
    import Question from './components/Question';
    import {Eventbus} from '../../eventbus/Eventbus';

    export default {
        name: "QuizList",
        components: {
            Question
        },
        data() {
            return {
                listConfig: {
                    numberOfQuestions: 0,
                    multipleChoices: false,
                    shuffle: false,
                    title: ''
                },
                editMode: true,
                questions: [],
                displayAssistantBar: false
            }
        },
        methods: {
          updateConfig({numberOfQuestions, multipleChoices, shuffle, editMode, title}) {
              const currentNumberOfQuestions = this.listConfig.numberOfQuestions;

              this.editMode = editMode;
              this.listConfig.numberOfQuestions = numberOfQuestions;
              this.updateList(currentNumberOfQuestions);
              this.listConfig.multipleChoices = multipleChoices;
              this.listConfig.shuffle = shuffle;
              this.listConfig.title = title;
          },
          updateList(currentNumberOfQuestions) {

              if(currentNumberOfQuestions < this.listConfig.numberOfQuestions) {
                  const questionsDifference = this.listConfig.numberOfQuestions - currentNumberOfQuestions;

                  for(let i = 0; i < questionsDifference; i++) {
                      this.questions.push({
                          title: "Type your question here",
                          answers: [{answerField: "Type your answer here", correctAnswer: false },
                                    {answerField: "Type your answer here", correctAnswer: false },
                                    {answerField: "Type your answer here", correctAnswer: false }]
                      })
                  }
              } else {
                  const questionsDifference = currentNumberOfQuestions - this.listConfig.numberOfQuestions;
                  this.questions.splice(this.numberOfQuestions, questionsDifference)
              }
              this.listConfig.numberOfQuestions = this.questions.length;
          },
          addQuestion() {
              this.questions.push({
                  title: "Type your question here",
                  answers: [{answerField: "Type your answer here", correctAnswer: false },
                            {answerField: "Type your answer here", correctAnswer: false },
                            {answerField: "Type your answer here", correctAnswer: false }]
              });
              this.listConfig.numberOfQuestions = this.questions.length;
          },
          updateQuestionTitle({title, index}) {
              this.questions[index].title = title;
          },
          removeQuestion(index) {
              this.questions.splice(index, 1);
              this.listConfig.numberOfQuestions = this.questions.length;
          },
          addAnswer(index) {
                this.questions[index].answers.push({answerField: "Type your answer here", correctAnswer: false});
                this.listConfig.numberOfQuestions = this.questions.length;
          },
          changeAnswer({index, answerField, questionIndex}){
              this.questions[questionIndex].answers[index].answerField = answerField;
          },
          removeAnswer({index, questionIndex}) {
              this.questions[questionIndex].answers.splice(index, 1);
          },
          setCorrectAnswer({index, questionIndex}) {
              const correctAsnwerState = this.questions[questionIndex].answers[index].correctAnswer;
              if(this.listConfig.multipleChoices) {
                  this.questions[questionIndex].answers[index].correctAnswer = !correctAsnwerState;
              } else {
                  this.questions[questionIndex].answers.forEach(a => a.correctAnswer = false);
                  this.questions[questionIndex].answers[index].correctAnswer = !correctAsnwerState;
              }
          },
          updateQuizData() {
              Eventbus.$emit('quizDataSent', this.questions)
          },
          sendDataForJson() {
              Eventbus.$emit('jsonData', this.questions)
          },
          loadFromFile(data) {
              this.editMode = false;
              this.listConfig.numberOfQuestions = data.questions.length;
              this.listConfig.shuffle = data.shuffle;
              this.listConfig.multipleChoices = data.multipleChoices;
              this.listConfig.title = data.title;
              this.questions = data.questions;
          }
        },
        created() {
            Eventbus.$on('configFields', this.updateConfig);
            Eventbus.$on('addAnswer', this.addAnswer);
            Eventbus.$on('changeAnswer', this.changeAnswer);
            Eventbus.$on('answerToBeRemoved', this.removeAnswer);
            Eventbus.$on('setCorrectAnswer', this.setCorrectAnswer);
            Eventbus.$on('collectQuizData', this.updateQuizData);
            Eventbus.$on('jsonGeneration', this.sendDataForJson);
            Eventbus.$on('loadData', this.loadFromFile);
        },
        beforeDestroy() {
            Eventbus.$off('configFields');
            Eventbus.$off('addAnswer');
            Eventbus.$off('changeAnswer');
            Eventbus.$off('answerToBeRemoved');
            Eventbus.$off('setCorrectAnswer');
            Eventbus.$off('collectQuizData');
            Eventbus.off('jsonGeneration');
            Eventbus.off('loadData');
        }
    }
</script>

<style lang="scss" scoped>

    .quizer-creator-list {
        position: relative;
        width: 50%;
        margin: auto;
        margin-top: 10%;
    }

    .add-question {
        width: 100%;
        margin-bottom: 5%;
    }

    .assistant-bar {
        position: fixed;
        left: 15%;
        top: 20%;
        background-color: rgba(103, 118, 184, 0.71);
        display: flex;
        z-index: 10;
        color: white;
        height: 40px;
        line-height: 40px;

        &-text {
            border-right: 1px solid rgba(0, 0, 0, 0.3);
            font-family: Centaur;
            overflow: hidden;
            max-width: 0;
            transition: max-width 1s;
            padding-left: 5px;

            &-display {
                padding-right: 5px;
                display: block !important;
                max-width: 700px !important;
            }
        }

        &-arrow {
            padding-left: 10px;
            padding-right: 10px;

            &-rotate {
                transform: rotateZ(180deg);
            }
        }
    }

</style>
