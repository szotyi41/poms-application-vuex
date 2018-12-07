<template>
    <Page class="cover-image">
        <StackLayout class="form">
            <StackLayout>
                <Image src="res://poms" stretch="none"></Image>
            </StackLayout>

            <StackLayout class="input-field input-username">
                <TextField class="input" hint="Username" v-model="username" autocapitalizationType="none" autocorrect="false"></TextField>
            </StackLayout>

            <StackLayout class="input-field input-password">
                <TextField class="input" hint="Password" v-model="password" autocapitalizationType="none" secure="true" autocorrect="false"></TextField>
            </StackLayout>

            <Button text="Log In" class="btn btn-primary" @tap="login"></Button>
        </StackLayout>
    </Page>
</template>

<script>

import * as ApplicationSettings from 'tns-core-modules/application-settings';
import Home from './Home';
import axios from 'axios';

export default {
    data() {
        return {
            user: this.$root.user,
            username: "",
            password: ""
        }
    },
    created() {
        var json = ApplicationSettings.getString("userdata");
        if(typeof json == "string") {
            var userdata = JSON.parse(json);
            this.username = userdata.username;
            this.password = userdata.password;

            if((this.username) && (this.password)) {
                this.login();
            }
        }
    },
    methods: {
        login() {
            axios({
                url: "http://mediaturmix.com/ordermanagement/src/login.php", 
                method: "POST",
                responseType: "json",
                data: {
                    username: this.username,
                    password: this.password
                }
            })
            .then(result => {
                var userdata = result.data;
                //alert(JSON.stringify(result.data));
                if(userdata.loggedin === true) {
                    this.$root.userdata = userdata;
                    ApplicationSettings.setString("userdata", JSON.stringify({ username: this.username, password: this.password }));
                    this.$navigateTo(Home, {
                        clearHistory: true
                    });
                    alert("Üdv, " + userdata.username);
                } else {
                    alert("Hibás felhasználónév, vagy jelszó.");
                }

            }, error => {
                alert("Bejelentkezéshez mobilinternet, vagy wifihálózat szükséges.");
            });     
        }
    }
};
</script>

<style>

/* Login */

.cover-image {
    background-image: url("res://LoginScreen");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
}
.page {
    align-items: center;
    flex-direction: column;
}
.form {
    margin-left: 30;
    margin-right: 30;
    flex-grow: 2;
    vertical-align: middle;
}
.input {
    margin: 0;
}
.input-field {
    border: 1 solid #eee;
    border-radius: 4;
    background-color: #fff;
    color: #000;
    margin: 0;
    padding: 12;
}

.btn {
    background: #1fbba6;
    border-radius: 4;
}
</style>