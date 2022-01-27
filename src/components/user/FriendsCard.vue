<template>
<div class="user-friends-div">
    <div class="row justify-content-center title-div">
        <div class="col-12 title-col">
            <h2 id="title">My Friends</h2>
        </div>
    </div>
    <div class="row justify-content-center content-div">
        <div class="col-12 content-col">
            <div v-if="friends.length==0" class="empty-placeholder">
                👀 There is no user here yet.<br>
                <router-link class="router-link" to="/home">Add friends to CoFridge together! ⇗</router-link>
            </div>
            <div v-else class="row friends-row">
                <div class="friends-col col-lg-3 col-md-4" v-bind:key="friend.username" v-for="friend in friends">
                    <router-link :to="'/userprofile/' + friend.username" class="friend-wrapper">
                        <div class="friend-picture"></div>
                        <div class="friend-name">{{friend.username}}</div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from "axios";
import {
    eventBus
} from "../../main";

export default {
    name: "ProfileCard",
    props: ["signedInUser", "userProfileOwner", "response"],
    components: {},
    data() {
        return {
            friends: '',
        };
    },
    created() {
        this.getSignedInUser();
        eventBus.$on("profile-updated", () => {
            this.getSignedInUser();
        });
    },
    methods: {
        getSignedInUser() {
            axios
                .get("/api/user/session/profile")
                .then((response) => {
                    console.log(response);
                    this.updateDisplayData(response);
                })
                .catch((error) =>
                    eventBus.$emit("response-error", {
                        data: error.response
                    })
                );
        },
        updateDisplayData(response) {
            this.friends = response.data.friends;
            console.log(this.friends);
        },
    },
};
</script>

<style scoped>
.user-friends-div {
    font-family: "Montserrat", sans-serif;
    padding: 0 30px;
}

.col-12 {
    padding: 0;
}

#title {
    font-size: 1.5rem;
    font-weight: 700;
}

.content-col {
    border-top: 1px solid black;
    padding: 2vh 0;
    min-height: 20vh;
}

.empty-placeholder {
    margin: 4vh 2vw;
    font-size: 1.5rem;
}

.friends-row {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
}

.friends-col {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
}

.friend-wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 3vh 0;
    text-decoration: none;
}

.friend-picture {
    background: #f2f4ff;
    border: 1px solid #cdff61;
    height: 6vh;
    width: 6vh;
    border-radius: 100%;
}

.friend-name {
    padding-left: 0.8vw;
    color: #403D39;
    font-weight: 700;
}
</style>
