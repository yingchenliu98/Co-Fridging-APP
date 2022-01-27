<template>
  <div class="fridge-card">
    <router-link :to="{name: 'fridge', params: {fridge: fridge, name: fridge.name}}" class="f-subcard"  >
        <p>Fridge</p>
        <h2>{{fridge.name}}</h2>
        <p>Creator: {{ fridge.creator }}</p>
    </router-link>
    <button v-on:click="DeleteFridge" class="del-fridge-btn" >
            Delete
    </button>
  </div>

      
  
</template>

<script>
import { eventBus } from "../../main";
import axios from "axios";

export default {
    name: "FridgeCard",
    props: {
        fridge: {
            type: Object,
            required: true,
        }
    },
    data() {
        return{}
    },
    methods:{
        DeleteFridge(){
            axios.delete("/api/Fridges/" + this.fridge.fridgeID)
                .then((response) => {
                    eventBus.$emit("delete-fridge-success",{
                        data: response.data,
                    });
                })
                .catch((error) => {
                    if (error.response && error.response.status != 200){
                    alert(error.response.data.error)
                    }
                })
            
        },
    }
}
</script>

<style>
.fridge-card {
    width: 30%;
    margin: 10px;
}
.f-subcard {
    width: 100%;
    height: 20vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    color: black;
    background-color: white;
    border-radius: 10px;
    box-shadow: 1px 1px 6px 0 rgba(31, 38, 135, 0.3);
}
.del-fridge-btn{
    margin-top: -60px;
    background: #f6652c;
    color: white;
    border: none;
    border-radius: 5px;
    box-shadow: 1px 1px 6px 0 rgba(31, 38, 135, 0.3);
}
</style>