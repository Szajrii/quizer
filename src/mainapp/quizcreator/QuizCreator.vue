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
    </div>
</template>

<script>
    import Config from './Config'
    import QuizList from './QuizList'
    import {Eventbus} from '../../eventbus/Eventbus'
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
                config: {}
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
          }
        },
        created() {
            Eventbus.$on('configFieldsMissing', this.showConfigWarnign);
            Eventbus.$on('configFields', this.updateConfig);
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
</style>
