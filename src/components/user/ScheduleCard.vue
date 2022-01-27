<template>
<div class="user-items-div">
    <div class="row justify-content-center title-div">
        <div class="col-12 title-col">
            <h2 id="title"><img src='@/assets/icons-Time.png'> My Orders</h2>
        </div>
        <div class="col-12 title-col"> </div>
    </div>
    <div class="row justify-content-center tab-div">
        <Tabs class='Tab-container' id="tab-container">

            <TabItem name="Upcoming">
                <div class="first-tab">
                    <div class="col-12 content-col">
                        <div v-if="claimedItemsID.filter((item)=>item.status===0).length===0" class="empty-placeholder">
                            👀 You haven't claimed any item yet.
                        </div>
                        <div v-else>

                            <div :key="item.id" :item="item" v-for="(item,index) in claimedItems">
                                <div class="row item-row" v-if="claimedItemsID[index].status===0">
                                    <div class="col-1">
                                        ID: {{claimedItemsID[index].id.slice(0,5)}}
                                    </div>
                                    <div class="col-2">
                                        <div>Qt. {{claimedItemsID[index].quantity}}</div>
                                        <div>{{item.name}}</div>
                                        <div><strong>{{item.utility}}</strong></div>
                                    </div>
                                    <div class="col-3">
                                        <div> Pick-up Window</div>
                                        <span>{{item.start}} - {{item.end}}<br /> {{item.date}}</span>
                                    </div>
                                    <!-- <div class="col-3">
                                    <div>By</div>
                                    <span>(placeholder for owner name){{item}}</span>
                                </div> -->
                                    <div class="col-3">
                                        <div> Owner</div>
                                        <span>{{item.creatorName}}</span>
                                    </div>
                                    <div class="col-2">
                                        <complete-button :orderID='claimedItemsID[index].id' :when="'order'" class="complete-btn"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </TabItem>

            <TabItem name="Completed">
                <div class="second-tab">
                    <div class="col-12 content-col">
                        <div v-if="claimedItemsID.filter((item)=>item.status===1).length===0" class="empty-placeholder">
                            👀 This space is empty right now.<br>
                            <router-link class="router-link" to="/home">See if you have ⇗</router-link>
                        </div>
                        <div v-else>
                            <div :key="item.id" :item="item" v-for="(item,index) in claimedItems">
                                <div class="row item-row" v-if="claimedItemsID[index].status===1">
                                    <div class="col-2">
                                        ID: {{claimedItemsID[index].id.slice(0,5)}}
                                    </div>
                                    <div class="col-2">
                                        <div>Qt. {{claimedItemsID[index].quantity}}</div>
                                        <div>{{item.name}}</div>
                                        <div><strong>{{item.utility}}</strong></div>
                                    </div>
                                    <div class="col-2">
                                        <div> Pick-up Window</div>
                                        <span>{{item.start}} - {{item.end}}, {{item.date}}</span>
                                    </div>
                                    <div class="col-2">
                                        <div> Owner</div>
                                        <span>{{item.creatorName}}</span>
                                    </div>
                                    <!-- <div class="col-3">
                                    <div>By</div>
                                    <span>(placeholder for owner name){{item}}</span>
                                </div> -->
                                    Completed
                                </div>
                            </div>
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

import CompleteButton from "@/components/item/CompleteButton.vue";

export default {
    name: "ScheduleCard",
    props: ["signedInUser", "userProfileOwner", "response"],
    components: {

        Tabs,
        TabItem,
        CompleteButton
    },
    data() {
        return {
            itemsID: [],
            items: [],
            claimedItemsID: [],
            claimedItems: [],
        };
    },
    created() {
        this.getSignedInUser();
        eventBus.$on(["profile-updated", "create-item-success",
            "delete-item-success",
            "claim-item-success",
            "mark-complete-success"
        ], () => {
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
                    this.getClaimedItems(response);
                    console.log("getSignedInUser response");
                    console.log(response);
                })
                .catch((error) =>
                    eventBus.$emit("response-error", {
                        data: error.response
                    })
                );
        },
        getItems(response) {
            console.log("response.data.items");
            console.log(response.data.items);
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
            for (const item of this.claimedItemsID) {
                axios
                    .get("/api/item/id/" + item.itemId)
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
    background: #FCF8F2;
}
.Tab-container .tabs{
    border:none;
    border-radius: 0;
    min-height: 30vh;
    background: none;
    margin: 2vh 3vw;
}
#tab-container{
    background: none;
}
.item-row {
    margin: 4vh 4vw;
    display: flex;
}

</style>
