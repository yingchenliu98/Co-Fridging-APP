<template>
  <div class="item">
    <button class="delete-button" 
    v-show="signedInUser===item.creatorID"
    v-on:click="DeleteItem">X</button>
    <!-- <button class="edit-button" v-on:click="EditItem">
    Edit
    </button> -->
   
   <br>
    <span>{{ item.name }} x {{ item.quantity }} {{ item.utility }}<br /></span>
    <p>{{ status }}</p>
    <p>{{ item.swap ? item.swap : null }}</p>
    <div>
      <img
        v-if="item.imageUrl"
        :src="item.imageUrl"
        contain
        height="100px"
        width="150px"
      />
    </div>
    <p v-if="item.category === 'Fruits & Vegetables'">
      Maturity Level: {{ item.levelMaturity }} (0 Unripe ~ 5 Overripe)<br />
    </p>
    <p v-else>Expiry Date: {{ item.expiryDate }}<br /></p>
    <p>Pick Up Window: {{ item.pickupwindow }}</p>
    <p v-show="item.specialInstructions">Notes: {{ item.specialInstructions }}</p>
    <div v-show="item.creatorID!=signedInUser"> 
      <ClaimButton :item="item" />
      {{message}}
    </div>
  </div>
</template>

<script>
import { eventBus } from "../../main";
import axios from "axios";
import ClaimButton from "@/components/item/ClaimButton.vue";
export default {
  name: "Item",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  components: { ClaimButton },
  data() {
    return {
      signedInUser: this.$cookie.get("fritter-auth"),
      quantity: null,
      status: "",
      user: "",
      message: "",
    };
  },
 
  mounted: function () {
    this.getStatus();
    eventBus.$on("claim-item-success", () => {
      this.getStatus();
    });
  },
  //&& item.creatorID != signedInUser
  methods: {
    DeleteItem() {
      axios
        .delete("/api/item/delete/" + this.item.id)
        .then((response) => {
          eventBus.$emit("delete-item-success", {
            data: response.data,
          });
        })
        .catch((error) => {
          if (error.response && error.response.status != 200) {
            alert(error.response.data.error);
          }
        });
    },
    getStatus() {
      if (this.item.status === 0) {
        this.status = "Available";
      } else {
        this.status = "On Hold";
      }
    },
    // getUser(){
    //   axios.get("api/user/"+this.signedInUser)
    //   .then((response) => {
    //     this.user = response.data.
    //   })
    // }

    ModifyItem() {},
    SubmitModifiedItem() {
      //   axios
      //     .put("/api/freets/edit/" + this.freet.id, this.NewFreet)
      //     .then((response) => {
      //       eventBus.$emit("edit-freet-success", {
      //         data: response.data,
      //       });
      //       this.open = false;
      //     })
      //     .catch((error) => {
      //       if (error.response && error.response.status != 200) {
      //         this.error = error.response.data.error;
      //       }
      //     });
      // },
    },
  },
};
</script>

<style scoped>
.item {
  padding: 10px;
  margin: 15px;
  margin-bottom: 18px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 1px 1px 6px 0 rgba(31, 38, 135, 0.3);
}
.item > p {
  overflow-wrap: break-word;
  font-size: 11pt;
}
.item > h1 > span {
  font-weight: 100;
  display: flex;
  font-size: 20pt;
  color: #104763;
}



.author {
  display: flex;
  align-items: center;
  font-size: 11pt;
  font-weight: bold;
}

.author > span {
  margin-right: 20px;
}

.delete-button {
  float: right;
  border-radius: 5px;
  box-shadow: 1px 1px 6px 0 rgba(31, 38, 135, 0.3);
  
}
.edit-button {
  float: right;
}

</style>
