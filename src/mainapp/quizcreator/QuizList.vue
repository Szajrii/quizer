<template>
    <div class="quizer-creator-list">
        <Question v-for="(question, index) in questions"
                  :index="index"
                  :key="'question' + (Math.random() + Math.random())"
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
                    shuffle: false
                },
                editMode: true,
                questions: []
            }
        },
        methods: {
          updateConfig({numberOfQuestions, multipleChoices, shuffle, editMode}) {
              const currentNumberOfQuestions = this.listConfig.numberOfQuestions;

              this.editMode = editMode;
              this.listConfig.numberOfQuestions = numberOfQuestions;
              this.updateList(currentNumberOfQuestions);
              this.listConfig.multipleChoices = multipleChoices;
              this.listConfig.shuffle = shuffle;
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
          }
        },
        created() {
            Eventbus.$on('configFields', this.updateConfig);
            Eventbus.$on('addAnswer', this.addAnswer);
            Eventbus.$on('changeAnswer', this.changeAnswer);
            Eventbus.$on('answerToBeRemoved', this.removeAnswer);
            Eventbus.$on('setCorrectAnswer', this.setCorrectAnswer)
        }
    }
</script>

<style scoped>

    .quizer-creator-list {
        width: 50%;
        margin: auto;
        margin-top: 10%;
    }

    .add-question {
        width: 100%;
        margin-bottom: 5%;
    }

</style>
