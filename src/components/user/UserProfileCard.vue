<template>
  <div class="user-profile-div">
    <div class="profile-image-div">
      <div class="image-space"></div>
    </div>
    <div class="profile-info-div">
      <div class="username">{{ displayName }}</div>
      <div class="bio">{{ bio }}</div>
      <form v-if="!isFriend" class="friend-div" @submit.prevent="addFriend">
        <input type="submit" value="Add Friend" class="friend-btn" />
      </form>
      <form v-if="isFriend" class="friend-div" @submit.prevent="unFriend">
        <input type="submit" value="Unfriend" class="friend-btn" />
      </form>
      <div class="join-date">👣 Joined {{ monthJoined }}, {{ yearJoined }}</div>
      <div class="location">📍 {{ location }}</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { eventBus } from "../../main";

export default {
  name: "UserProfileCard",
  props: ["signedInUser", "response"],
  components: {},
  data() {
    return {
      sessionUsername: "",
      sessionUser: "",
      sessionFriends: "",
      username: "",
      name: "",
      displayName: "",
      monthJoined: "",
      yearJoined: "",
      location: "Somewhere on Earth",
      bio: "",
      isFriend: "",
    };
  },
  created() {
    this.getSignedInUser();
    this.getSearchedUser();

    eventBus.$on('view-user-profile', () => {
      this.getSearchedUser();
    });
  },
  beforeMount(){
    this.getSearchedUser();
  },
  // updated(){
  //   this.getFriendStatus();
  // },
  methods: {
    getSignedInUser() {
      axios
        .get("/api/user/session/profile")
        .then((response) => {
          this.sessionUsername = response.data.username;
          this.sessionUser = response.data;
          this.sessionFriends = response.data.friends;
        })
        .catch((error) => {
          eventBus.$emit("response-error", { data: error.response });
          console.log(error);
        });
    },
    getSearchedUser(){
      axios
        .get("/api/user/profile/" + this.$route.params.userProfileOwner)
        .then((response) => {
          this.displayName = this.$route.params.userProfileOwner;
          this.username = response.data.username;
          this.monthJoined = response.data.dates[0];
          this.yearJoined = response.data.dates[1];
          this.bio = response.data.bio;

          if (response.data.location == "") {
            this.location = "Somewhere on Earth";
          } else {
            this.location = response.data.location;
          }
          // if (response.data.name == "") {
          //   this.displayName = response.data.username;
          // } else {
          //   this.displayName = response.data.name;
          // }

          const sessionFriendList = this.sessionUser.friends;
          const thisUser = sessionFriendList.find(friend => friend.username == this.$route.params.userProfileOwner);
          if (thisUser !== undefined){
            this.isFriend = true;
          }else{
            this.isFriend = false;
          }
          console.log(this.isFriend);

        })
        .catch((error) =>
          eventBus.$emit("response-error", { data: error.response })
        );
    },
    addFriend(){
      axios
        .put("/api/user/friend", {
          sessionUsername: this.sessionUsername,
          usernameToAdd: this.$route.params.userProfileOwner,
        })
        .then((response) => {
          console.log(response);
          this.isFriend = true;
        })
        .catch((error) =>
          eventBus.$emit("response-error", { data: error.response })
        );
    },
    unFriend(){
      axios
        .put("/api/user/unfriend", {
          sessionUsername: this.sessionUsername,
          usernameToRemove: this.$route.params.userProfileOwner,
        })
        .then((response) => {
          console.log(response);
          this.isFriend = false;
        })
        .catch((error) =>
          eventBus.$emit("response-error", { data: error.response })
        );
    },
    getFriendStatus(){
      const sessionFriendList = this.sessionUser.friends;
        const thisUser = sessionFriendList.find(friend => friend.username == this.$route.params.userProfileOwner);
        if (thisUser !== undefined){
          this.isFriend = true;
        }else{
          this.isFriend = false;
        }
        console.log(this.isFriend);
    }
  },
};
</script>

<style scoped>
.user-profile-div {
  background-color: transparent;
}
.profile-image-div {
  position: relative;
  height: 25vh;
  /* padding: 2vw 2vw; */
  z-index: 4;
}
.image-space {
  height: 25vh;
  width: 25vh;
  border-radius: 50%;
  border: 2px solid black;
  margin: 0.5vw auto;
  background-color: #f2f4ff;
  z-index: 4;
}
.profile-info-div {
  height: 60vh;
  position: relative;
  margin-top: -12.5vh;
  background-color: white;
  border: 2px solid black;
  z-index: 0;
}
.username {
  text-align: center;
  padding: 16vh 0 0.5vh 0;
  font-family: "Montserrat", sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
}
.join-date {
  text-align: center;
  padding: 2vh 0 0.5vh 0;
  font-family: "Montserrat", sans-serif;
  font-size: 0.95rem;
  font-weight: 400;
}
.location {
  text-align: center;
  padding: 0.5vh 0 2vh 0;
  font-family: "Montserrat", sans-serif;
  font-size: 0.95rem;
  font-weight: 400;
}
.bio {
  text-align: center;
  padding: 0.5vh 3vw 2vh 3vw;
  font-family: "Montserrat", sans-serif;
  font-size: 1rem;
  font-weight: 500;
}
.friend-div {
  text-align: center;
  padding: 2vh 0 2vh 0;
  font-family: "Montserrat", sans-serif;
  font-size: 1rem;
}
.friend-btn {
  padding: 0.8vh 1vw 0.8vh 1vw;
  border-radius: 6px;
  border: none;
  background: #cdff61;
  color: black;
  font-weight: 500;
}
</style>
