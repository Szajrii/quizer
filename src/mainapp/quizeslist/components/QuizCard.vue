<template>
    <v-card
            class="mx-auto ma-3 pa-6"
            max-width="400"
    >
        <v-img
                class="white--text align-end"
                height="200px"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        >
            <v-card-title>{{title}}</v-card-title>
        </v-img>

        <v-card-subtitle class="pb-0">Category: {{category}}</v-card-subtitle>

        <v-rating :value="rating" readonly background-color="success" color="success"></v-rating>

        <v-card-actions>
            <v-btn
                    color="orange"
                    text
            >
                Play
            </v-btn>

            <v-btn
                    color="orange"
                    text
            >
                Details
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        name: "QuizCard",
        props: ["title", "category", "rating"]
    }
</script>

<style scoped>

</style>
