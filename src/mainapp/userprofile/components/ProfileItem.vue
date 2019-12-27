<template>
    <v-card
            class="mx-auto ma-3 pa-6"
            width="500"
            shaped
            elevation="5"
            hover
    >
        <v-list-item three-line>
            <v-list-item-content>
                <v-list-item-title class="headline mb-1">{{title}}</v-list-item-title>
                <v-card-text class="primary--text">{{text}} {{number}}</v-card-text>
            </v-list-item-content>

            <v-list-item-avatar
                    size="80"
                    color="secondary"
                    tile
                    :color="color"
            ><v-icon size="40" color="white">{{icon}}</v-icon></v-list-item-avatar>

        </v-list-item>
    </v-card>
</template>

<script>
    export default {
        name: "ProfileItem",
        props: ["title", "text", "color", "number", "icon"]
    }
</script>

<style scoped>

</style>
