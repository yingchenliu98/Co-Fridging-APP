<template>
    <div class="member-card">
        <button class="delete-member" v-on:click="DeleteMember">
            <i class="fa fa-times " aria-hidden="true"></i>
        </button>
        
        <i class="fa fa-user fa-4x " aria-hidden="true"></i>
        <p>{{member}}</p>
    </div>
</template>

<script>
import { eventBus } from "../../main";
import axios from "axios";

export default {
    name: "MemberCard",
    components: {

    },
    props: {
        member: {
            type: String,
            required: true,
        },
        fridge: {
            type: Object,
            required: true,
        },
    },
    data() {
        return{

        }
    },
    methods:{
        DeleteMember(){
            axios.delete("/api/Fridges/removeMember/" + this.fridge.fridgeID + "/" + this.member, this.member)
                .then((response) => {
                    eventBus.$emit("delete-member-success",{
                        data: response.data,
                    });
                })
                .catch((error) => {
                    if (error.response && error.response.status != 200){
                    alert(error.response.data.error)
                    }
                })
        }
    }
}
</script>

<style>
.member-card{
    width: 100px;
    text-align: center;

}
.member-card > i {
    width: 80px;
    height: 80px;
    padding-top: 5px;
    background-color: rgb(197, 197, 197);
    border-radius: 50px;
}
.delete-member {
    background-color: red;
    color: white;
    padding: 5px;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    position: absolute;
    cursor: pointer;
}
.delete-member > i {
    position: absolute;
    top: 0px;
    left: 4px;
}
</style>