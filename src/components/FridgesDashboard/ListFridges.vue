<template>
<div class="fridge-container">
    <div class="row justify-content-center title-div">
        <div class="col-12 title-col">
            <h2 id="title"><img src='@/assets/Fridge.png'>My Fridges</h2>
        </div>
    </div>
    <div class="row justify-content-center content-div">
        <div class="fridges-grid">
            <FridgeCard v-for="fridge in fridges" :key="fridge.fridgeID" :fridge="fridge" />
            <plusCard />
        </div>
    </div>
</div>
</template>

<script>
import axios from "axios";
import {
    eventBus
} from "../../main";
import FridgeCard from "./FridgeCard.vue";
import plusCard from "./AddCard.vue";

export default {
    name: "ListFridges",
    components: {
        FridgeCard,
        plusCard,
    },
    data() {
        return {
            fridges: [],
        };
    },
    created() {
        this.getFridges();
        eventBus.$on(["create-fridge-success", "delete-fridge-success"], () => {
            this.getFridges();
        });
    },
    methods: {
        getFridges() {
            axios
                .get("/api/fridges/all")
                .then((response) => {
                    this.fridges = response.data;
                })
                .catch((error) => {
                    alert(error);
                });
        },
    },
};
</script>

<style>
.fridge-container {
    font-family: "Montserrat", sans-serif;
    padding: 0 30px;
    width: 90%;
}
/* .title-div{
    margin: 0 2vw;
    border-bottom: 2px solid black;
} */
.content-div{
   margin-top: 1vh;
}
.col-12 {
    padding: 0;
}
#title {
    font-size: 1.5rem;
    font-weight: 700;
}
.empty-placeholder {
    margin: 4vh 2vw;
    font-size: 1.5rem;
}
.fridges-grid {
    display: flex;
    flex-wrap: wrap;
    padding: 6vh 3vw;
    min-height: 30vh;
    background: none;
}
</style>
