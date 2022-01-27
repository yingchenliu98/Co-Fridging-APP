<template>
<div class="claim">
    <div>
        <select class="claim-quantity" v-model="quantity" v-show="!claimed">
            <option disabled value="">Please select one</option>
            <option v-for="n in ListNumber(item.quantity)" v-bind:key="n">
                {{ n }}
            </option>
        </select>
        <button class="button" :disabled="isDisabled" v-on:click="SubmitClaim()">
            {{ claimButton.text }}
        </button>
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
    name: "ClaimButton",
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            claimButton: {
                text: "Claim",
            },
            claimed: false,
            open: false,
            quantity: 0,
        };
    },

    mounted: function () {
        this.ChangeButtonText();
        eventBus.$on("claim-item-success", () => {
            this.ChangeButtonText();
        });
    },
    computed:{
      isDisabled: function(){
        console.log(this.claimed)
        return this.claimed;
      }
    },
    methods: {
        ListNumber(highEnd) {
            var list = [];
            for (var i = 1; i <= highEnd; i++) {
                list.push(i);
            }
            return list;
        },
        SubmitClaim() {
            axios
                .post("/api/item/claim/" + this.item.id, {
                    quantity: this.quantity
                })
                .then((response) => {
                    this.open = false;
                    eventBus.$emit("claim-item-success", {
                        data: response.data,
                    });
                    this.quantity=0;
                    // this.claimed = true;
                    // this.claimButton.text = "Claimed";
                })
                .catch((error) => {
                    if (error.response && error.response.status != 200) {
                        alert(error.response.data.error);
                    }
                });
        },
        ChangeButtonText() {
            if (this.item.status != 0) {
               this.claimed=true;
                this.claimButton.text = "Out of stock";
            }
        },
    },
};
</script>

<style scoped>
.blue-color {
    color: #3ca3d8;
}
</style>
