<template>
    <div class="quizer-comment">
        <div class="quizer-comment-topsection">
            <div class="quizer-comment-user">
                <v-avatar color="secondary" size="40">
                    <span class="white--text headline">{{comment.author.charAt(0).toUpperCase()}}</span>
                </v-avatar>
                <span class="quizer-comment-user-name red--text">{{comment.author}}</span>
            </div>
            <div class="quizer-comment-date">
                <span class="secondary--text">{{comment.date}}</span>
            </div>
        </div>
        <div class="quizer-comment-content">
            <p>{{comment.content}}</p>
        </div>
        <v-divider></v-divider>
    </div>
</template>

<script>

    export default {
        name: "Comment",
        props: ["comment"]
    }
</script>

<style lang="scss" scoped>

    .quizer-comment {
        width: 100%;
        min-height: 150px;


        &-topsection {
            width: 100%;
            display: flex;
            justify-content: space-between;
        }

        &-user {
            padding-left: 10px;

            &-name {
                padding-left: 10px;
            }
        }

        &-date {
            padding-right: 10px;
        }

        &-content {
            padding: 15px 5px;
        }
    }
</style>
