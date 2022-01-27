<template>
<div class="user-items-div">
    <div class="row justify-content-center title-div">
        <div class="col-12 title-col">
            <h2 id="title"><img src='@/assets/icon-Tomato.png'> My Items</h2>
        </div>
    </div>
    <div class="row justify-content-center content-div">
        <Tabs class='Tab-container'>
            <TabItem name="Listed Item">
                <div class="first-tab">
                    <div class="col-12 content-col">
                        <div v-if="items.length===0" class="empty-placeholder">
                            👀 There is no item here yet.<br>
                            <router-link class="router-link" to="/home">List an item! ⇗</router-link>
                        </div>
                        <div v-else>

                            <Item class="item" v-for="item in items" :key="item.id" :item="item" />
                        </div>
                    </div>
                </div>
            </TabItem>

            <TabItem name="Received Claims">
                <div class="second-tab">
                    <div class="col-12 content-col">
                        <div v-if="items.length===0" class="empty-placeholder">
                            👀 You haven't yet received any claims!<br>
                        </div>
                        <div v-else>
                            <div v-for="item in items" :key="item.id">
                                <div v-if='item.claimsReceived.filter((c)=>c.status===0).length!=0'>
                                    <strong>{{item.name}} @ {{item.pickupwindow}}</strong>
                                    <div class="row item-row">
                                        <div v-for="(c,index) in item.claimsReceived.filter((c)=>c.status===0)" 
                                            :key="index"
                                            >
                                                <CompleteButton :orderID='c.id' :when='items' />
                                                Quantity: {{ c.quantity }},
                                            
                                                Claimed By: {{ c.claimedBy }}
                                         
                                         
                                        </div>
                                    </div>
                                </div><br>
                            </div>
                        </div>
                    </div>

                </div>

            </TabItem>
            <TabItem name="Completed Claims">
                   <div class="col-12 content-col">
                        <div v-if="items.length===0" class="empty-placeholder">
                            👀 You haven't yet received any claims!<br>
                        </div>
                        <div v-else>
                            <div v-for="item in items" :key="item.id">
                                 <div v-if='item.claimsReceived.filter((c)=>c.status===1).length!=0'>
                                    <strong>{{item.name}} @ {{item.pickupwindow}}</strong>
                                    <ul id="claims-received">
                                        <div v-for="(c,index) in item.claimsReceived.filter((c)=>c.status===1)" :key="index">

                                                (DONE)
                                                Id: {{c.id.slice(0,5)}},
                                                Quantity: {{ c.quantity }},
                                                Claimed By: {{ c.claimedBy }}
                                        
                                        </div>
                                    </ul>
                                </div><br>
                            </div>
                        </div>
                    </div>
            </TabItem>
        </Tabs>
    </div>
</div>
</template>

<script>
import axios from "axios";
import {
    eventBus
} from "../../main";
import {
    Tabs,
    TabItem
} from "vue-material-tabs";
import Item from "@/components/item/Item.vue";
import CompleteButton from "@/components/item/CompleteButton.vue";

export default {
    name: "ItemCard",
    props: ["signedInUser", "userProfileOwner", "response"],
    components: {
        Item,
        Tabs,
        TabItem,
        CompleteButton
    },
    data() {
        return {
            itemsID: [],
            items: [],
            claimedItemsID: [],
            claimedItems: []
        };
    },
    created() {
        this.getSignedInUser();

        eventBus.$on(["profile-updated", "create-item-success","mark-complete-success",
            "delete-item-success",
            "claim-item-success",
        ], () => {
            this.items= [];
             this.itemsID= [];
             this.claimedItemsID= [],
            this.claimedItems= []
            this.getSignedInUser();
        });

    },
    methods: {
        getSignedInUser() {
            axios
                .get("/api/user/session/profile")
                .then((response) => {
                    console.log(response);
                    this.getItems(response);
                    this.getClaimedItems(response)

                })
                .catch((error) =>
                    eventBus.$emit("response-error", {
                        data: error.response
                    })
                );
        },
        getItems(response) {
            // console.log("response.data.items");
            // console.log(response.data.items);
            this.itemsID = response.data.items;
            for (const id of this.itemsID) {
                axios
                    .get("/api/item/id/" + id)
                    .then((response) => {
                        console.log('response');
                        console.log(response.data);
                        if (response.data != "") {
                            this.items.push(response.data);
                        }
                    })
                    .catch((error) =>
                        eventBus.$emit("response-error", {
                            data: error.response
                        })
                    )
            }
            console.log('this.items');
            console.log(this.items)
        },
        getClaimedItems(response) {
            console.log("response.data.claimedItems");
            console.log(response.data.claimedItems);
            this.claimedItemsID = response.data.claimedItems;
            for (const id of this.claimedItemsID) {
                axios
                    .get("/api/item/id/" + id)
                    .then((response) => {
                        console.log('response');
                        console.log(response.data);
                        if (response.data != "") {
                            this.claimedItems.push(response.data);
                        }

                    })
                    .catch((error) =>
                        eventBus.$emit("response-error", {
                            data: error.response
                        })
                    )
            }
            console.log('this.items');
            console.log(this.items)
        },
 

    },
};
</script>

<style scoped>
.user-items-div {
    font-family: "Montserrat", sans-serif;
    padding: 0 30px;
    width: 90%;
    margin: 0 4vw;
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
    min-height: 20vh;
}

.empty-placeholder {
    margin: 4vh 2vw;
    font-size: 1.5rem;
}

.Tab-container {
    border:none;
    border-radius: 0;
    min-height: 30vh;
}

.item-row {
    margin: 4vh 4vw;
    display: flex;
}

</style>
