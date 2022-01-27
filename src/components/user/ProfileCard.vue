<template>
  <div class="user-profile-div">
    <div class="profile-image-div">
      <div class="image-space"></div>
    </div>
    <div class="profile-info-div">
      <div class="username">{{ displayName }}</div>
      <div class="bio">{{ bio }}</div>
      <div class="edit-profile">
        <router-link
          to="/edit-profile"
          class="router-link"
          id="edit-profile-btn"
          >Edit Profile</router-link
        >
      </div>
      <div class="join-date">👣 Joined {{ monthJoined }}, {{ yearJoined }}</div>
      <div class="location">📍 {{ location }}</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { eventBus } from "../../main";

export default {
  name: "ProfileCard",
  props: ["signedInUser", "userProfileOwner", "response"],
  components: {},
  data() {
    return {
      username: "",
      displayName: "",
      monthJoined: "",
      yearJoined: "",
      location: "Somewhere on Earth",
      bio: "",
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
          eventBus.$emit("response-error", { data: error.response })
        );
    },
    updateDisplayData(response) {
      this.username = response.data.username;
      this.monthJoined = response.data.dates[0];
      this.yearJoined = response.data.dates[1];
      this.bio = response.data.bio;

      if (response.data.location == "") {
        this.location = "Somewhere on Earth";
      } else {
        this.location = response.data.location;
      }

      if (response.data.name == "") {
        this.displayName = response.data.username;
      } else {
        this.displayName = response.data.name;
      }
    },
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
.edit-profile {
  text-align: center;
  padding: 2vh 0 2vh 0;
  font-family: "Montserrat", sans-serif;
  font-size: 1rem;
}
#edit-profile-btn {
  margin-top: 2vh;
  padding: 0.8vh 1vw 0.8vh 1vw;
  border-radius: 6px;
  background: #cdff61;
  color: black;
  font-weight: 500;
}
</style>
