<template>
    <Page class="page">
        <ActionBar class="action-bar">
            <Label class="action-bar-title" text="Home"></Label>
        </ActionBar>
        <ScrollView>
            <StackLayout class="home-panel">
                <ListView class="list-group" for="menuitem in menuitems" @itemTap="onMenuitemTap" style="height:1250px">
                    <v-template>
                        <FlexboxLayout flexDirection="row" class="list-group-item">
                            <Label class="fa menuitem-icon" :text="menuitem.icon | fonticon"  />
                            <Label :text="menuitem.name" class="list-group-item-heading" style="width: 60%" />
                        </FlexboxLayout>
                    </v-template>
                </ListView>
            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>
import * as ApplicationSettings from 'tns-core-modules/application-settings';
import Notifications from './Notifications';
import Calendar from './Calendar';
import Login from './Login';
import axios from "axios";

export default {
    methods: {
        onMenuitemTap: function(args) {
            switch(args.index) {
                case 0: 
                    this.$navigateTo(Notifications); 
                break;
                case 1: 
                    this.$navigateTo(Calendar); 
                break;
                case 2: 
                    axios({
                        url: "http://admin.apps4you.hu/newx/crons/memcache_sync/syncstatus.php", 
                        method: "get"
                    }) 
                    .then(result => {
                        alert("Syncro status is: " + getSyncstatus(data));
                    }, error => {
                        alert("A syncro status megtekintéséhez mobilinternet, vagy wifihálózat szükséges.");
                    });  
                break;
                case 3:
                    ApplicationSettings.setString("userdata", JSON.stringify({ username: "", password: "" }));
                    this.$navigateTo(Login, {
                        clearHistory: true,
                        animated: false,
                        transition: {},
                        transitionIOS: {},
                        transitionAndroid: {
                            name: 'fade',
                            duration: 200,
                            curve: 'ease'
                        }
                    }); 
                break;
            }
            
        }
    },
    data() {
        return {
            menuitems: [{
                icon: "fa-bell",
                name: "Notifications"
            }, {
                icon: "fa-calendar",
                name: "Calendar"
            }, {
                icon: "fa-refresh",
                name: "Get syncro status"
            }, {
                icon: "fa-sign-out",
                name: "Log out"
            }]
        }
    }
};

/* This method can format roberts bullshit to valid data */
function getSyncstatus(data) {
    switch(data.trim()) {
        case "running": return "idle"; break;
        case "error": return "running"; break;
        default: return "error"; break;
    }
}
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
    display: block;
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

.menuitem-icon {
    margin-right: 18;
}

.fa {
  font-family: FontAwesome, fontawesome-webfont;
}


</style>