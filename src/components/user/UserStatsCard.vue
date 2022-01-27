<template name="StatsCard">
  <div class="user-stats-div">
    <div class="stats-div">
      <div class="row stats-col-wrapper">
        <div class="col-3">
          <div class="row stat">
            <span>{{ friendStat }}</span>
          </div>
          <div class="row stat-name"><span>Friends</span></div>
        </div>
        <div class="col-3">
          <div class="row stat">
            <span>{{ fridgeStat }}</span>
          </div>
          <div class="row stat-name"><span>Fridges</span></div>
        </div>
        <div class="col-3">
          <div class="row stat">
            <span>{{ itemStat }}</span>
          </div>
          <div class="row stat-name"><span>Items</span></div>
        </div>
        <div class="col-3">
          <div class="row stat">
            <span>{{ pointStat }}</span>
          </div>
          <div class="row stat-name"><span>Karma points</span></div>
        </div>
      </div>
    </div>
    <div class="participation-div">
      <div
        class="participation-vis"
        style="text-align: center; padding-top: 15vh; color: gray"
      >
        <span>placeholder: for participation visualization</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { eventBus } from "../../main";

export default {
  name: "StatsCard",
  components: {},
  data() {
    return {
      sessionUsername: "",
      sessionUser: "",
      friendStat: 0,
      fridgeStat: 0,
      itemStat: 0,
      pointStat: 0,
    };
  },
  created() {
    this.getSignedInUser();
    this.getSearchedUser();
  },
  methods: {
    getSignedInUser() {
      axios
        .get("/api/user/session/profile")
        .then((response) => {
          this.sessionUsername = response.data.username;
          this.sessionUser = response.data;
        })
        .catch((error) =>
          eventBus.$emit("response-error", { data: error.response })
        );
    },
    getSearchedUser(){
      axios
        .get("/api/user/profile/" + this.$route.params.userProfileOwner)
        .then((response) => {
          this.friendStat = Object.keys(response.data.friends).length;
          this.fridgeStat = Object.keys(response.data.createdFridges).length + Object.keys(response.data.joinedFridges).length;
          this.itemStat = Object.keys(response.data.items).length;
          this.pointStat = Object.keys(response.data.points).length;
        })
        .catch((error) =>
          eventBus.$emit("response-error", { data: error.response })
        );
    },
  },
};
</script>

<style scoped>
.user-stats-div {
  background-color: transparent;
}
.stats-div {
  height: 20vh;
  border: 2px solid black;
  background: white;
  margin-top: 13.5vh;
}
.stats-col-wrapper {
  padding: 7vh 2vw;
  width: 100%;
  height: 100%;
  margin: 0;
}
.stat {
  text-align: center;
  font-family: "Montserrat", sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
}
.stat-name {
  text-align: center;
  font-family: "Montserrat", sans-serif;
  font-size: 1rem;
  font-weight: 400;
}
.participation-div {
  height: calc(40vh - 36px) !important;
  border: 2px solid black;
  background: white;
  margin-top: 36px;
}
</style>
