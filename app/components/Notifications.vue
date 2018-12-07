<template>
    <Page class="page">
        <ActionBar class="action-bar">
            <Label class="action-bar-title" text="Notifications"></Label>
        </ActionBar>
        <RadListView class="list-group" for="notification in notifications" pullToRefresh="true" @itemTap="" @pullToRefreshInitiated="refresh">
            <v-template>
                <StackLayout class="list-group-item">
                    <Label class="list-group-item-heading" v-bind:class="{ error: notification.type == 'ERROR', cron: notification.type == 'CRON' }">{{notification.type}}</Label>
                    <Label v-show="!notification.viewed"> (NEW)</Label>
                    <Label :text="notification.created_time" class="list-group-item-time" textWrap="true"/>
                    <Label :text="notification.text" class="list-group-item-text" textWrap="true"/>
                </StackLayout>
            </v-template>
        </RadListView>
    </Page>
</template>

<script>

import axios from "axios";

export default {
    data: function() {
        return {
            notifications: []
        }
    },
    created() {

        axios({ 
            url: "http://mediaturmix.com/ordermanagement/src/notifications.php",
            method: "POST",
            responseType: "json"
        })
        .then(result => {
            this.notifications = result.data;
        }, error => {
            alert("Az értesítések betöltéséhez mobilinternet, vagy wifi szükséges.");
        });  

    },
    methods: {
        refresh({ object }) {
            axios({ 
                url: "http://mediaturmix.com/ordermanagement/src/notifications.php",
                method: "POST",
                responseType: "json"
            })
            .then(result => {
                this.notifications = result.data;
                object.notifyPullToRefreshFinished();
            }, error => {
                alert("Az értesítések betöltéséhez mobilinternet, vagy wifi szükséges.");
            });  
        }
    }
};
</script>

<style>

.home-panel {
    height: 100%;
}

.action-bar {
    background: #399A8B;
    color: #fff;
}

.list-group-item-heading {
    font-size: 20;
}

.list-group-item-time {
    display: block;
    color: #999;
    font-size: 12;
    margin: 4 0;
}

.list-group-item-text {
    display: block;
    color: #000;
    font-size: 18;
}

.cron {
    color: #0000BE;
}

.error {
    color: #BB0004;
}

</style>
