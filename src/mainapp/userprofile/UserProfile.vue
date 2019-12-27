<template>
    <div class="quizer-profile">
        <v-container fluid>
            <v-row>
                <v-col cols="12">
                    <v-row
                            align="center"
                            justify="center"
                            class="grey lighten-5"
                    >
                        <UserCard :user="userName"></UserCard>
                        <ProfileItem title="Quizes Created" text="Number of Created Quizes:" :number="quizesCreated" color="success" icon="mdi mdi-content-copy"></ProfileItem>
                        <ProfileItem title="Quizes Rated" text="Number of Rated Quizes:" :number="quizesRated" color="warning" icon="far fa-star"></ProfileItem>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>

    import UserCard from './components/UserCard'
    import ProfileItem from './components/ProfileItem'
    import firebase from "firebase";
    import "firebase/auth";
    const db = firebase.firestore();

    export default {
        name: "UserProfile",
        components: {
            UserCard,
            ProfileItem
        },
        data() {
            return {
                userName: '',
                quizesCreated: 0,
                quizesRated: 0
            }
        },
        created() {
            db.collection("Users").doc(this.$attrs.email).get()
                .then(doc => {
                    this.userName = doc.data().nickname;
                    this.quizesCreated = doc.data().quizes.length;
                    this.quizesRated = doc.data().quizesRated.length;
                })
        }
    }
</script>

<style lang="scss" scoped>

    .quizer-profile {
        width: 80%;
        margin: auto;

        &-items {
            width: 70%;
            margin: auto;
            display: flex;
            padding-top: 20px;
        }
    }
</style>
