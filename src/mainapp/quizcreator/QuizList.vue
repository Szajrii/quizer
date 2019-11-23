<template>
    <div class="quizer-creator-list">
        <Question v-for="(question, index) in questions" :question-number="index + 1" :key="'question' + index + 1" :question="question"></Question>
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
                questions: []
            }
        },
        methods: {
          updateConfig({numberOfQuestions, multipleChoices, shuffle}) {
              const currentNumberOfQuestions = this.listConfig.numberOfQuestions;

              this.listConfig.numberOfQuestions = numberOfQuestions;
              this.updateList(currentNumberOfQuestions);
              this.listConfig.multipleChoices = multipleChoices;
              this.listConfig.shuffle = shuffle;
          },
          updateList(currentNumberOfQuestions) {

              if(currentNumberOfQuestions < this.listConfig.numberOfQuestions) {
                  const questionsDifference = this.listConfig.numberOfQuestions - currentNumberOfQuestions;

                  for(let i = 0; i<questionsDifference; i++) {
                      this.questions.push({
                          title: "Type your question here",
                          answers: ["Type your answer here", "Type your answer here", "Type your answer here"],
                          correctAnswers: []
                      })
                  }
              }else {
                  const questionsDifference = currentNumberOfQuestions - this.listConfig.numberOfQuestions;
                  this.questions.splice(this.numberOfQuestions, questionsDifference)
              }
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

</style>
