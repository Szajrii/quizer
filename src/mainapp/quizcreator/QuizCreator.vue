<template>
    <div class="quizer-creator">
        <Config></Config>
        <div class="quizer-creator-questions"></div>
        <v-snackbar v-model="configWarning" color="warning">
            Seems like you want to create quiz without basic parameters. Please fill {{warningDetails}}.
            <v-btn
                    color="error"
                    text
                    @click="configWarning = false"
                    multi-line
            >
                Close
            </v-btn>
        </v-snackbar>
    </div>
</template>

<script>
    import Config from './Config'
    import {Eventbus} from '../../eventbus/Eventbus'
    export default {
        name: "QuizCreator",
        components: {
            Config
        },
        data() {
            return {
                configWarning: false,
                warningDetails: ''
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
          }
        },
        created() {
            Eventbus.$on('configFieldsMissing', this.showConfigWarnign)
        }
    }
</script>

<style lang="scss" scoped>

    .quizer-creator {
        width: 100%;
        height: 100%;
        padding-top: 5%;
        z-index: -1;
    }
</style>
