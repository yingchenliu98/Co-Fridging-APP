<template>
<div class="completeButton">
    <div v-if ="when === 'order'">
        <button class="mark-complete-btn" v-on:click="markComplete()">
            Mark as Complete
        </button>
    </div>
    <div v-else>
        <span><input type='checkbox' class="strikethrough" v-on:click="markComplete()"> </span>
    </div>
</div>

</template>

<script>
// import { defineComponent } from '@vue/composition-api'
import axios from "axios";
import {
    eventBus
} from "../../main";
export default {
    name: "CompleteButton",
    props: {
        orderID: {
            type: String,
            required: true,
        },
        when: {
            type:String,
            required: true,
        },
    },
    data() {
        return {};
    },

    methods: {
        markComplete() {
            axios.
            put("/api/item/complete/" + this.orderID)
                .then((response) => {
                    console.log('response');
                    eventBus.$emit('mark-complete-success', {
                        data: response.data,
                    })
                }).catch((error) => {
                    if (error.response && error.response.status != 200) {
                        alert(error.response.data.error);
                    }
                })
        }
    },
};
</script>

<style scoped>
.blue-color {
    color: #3ca3d8;
}



</style>
