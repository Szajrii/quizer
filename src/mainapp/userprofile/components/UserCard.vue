<template>
    <v-card
            class="mx-auto ma-3 pa-6"
            width="70%"
            outlined
            elevation="20"
    >
        <v-list-item three-line>
            <v-list-item-content>
                <div class="overline mb-4">UserCard</div>
                <v-list-item-title class="headline mb-1">{{user}}</v-list-item-title>
            </v-list-item-content>

            <v-list-item-avatar
                    size="80"
                    color="secondary"
            ><span class="white--text display-1">{{user.charAt(0).toUpperCase()}}</span></v-list-item-avatar>
        </v-list-item>
    </v-card>
</template>

<script>
    export default {
        name: "UserCard",
        props: ["user"]
    }
</script>

<style scoped>

</style>
