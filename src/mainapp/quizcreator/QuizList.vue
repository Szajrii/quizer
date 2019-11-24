<template>
    <div class="quizer-creator-list">
        <Question v-for="(question, index) in questions"
                  :question-number="index + 1"
                  :key="'question' + (Math.random() + Math.random())"
                  :question="question"
                  :multiple="listConfig.multipleChoices"
                  @questionToBeRemoved="removeQuestion"
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
              })
              this.listConfig.numberOfQuestions = this.questions.length;
          },
          removeQuestion(questionNumber) {
              this.questions.splice(questionNumber - 1, 1);
              this.listConfig.numberOfQuestions = this.questions.length;
          }
        },
        created() {
            Eventbus.$on('configFields', this.updateConfig);
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
