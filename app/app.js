import Vue from 'nativescript-vue';
import Vuex from 'vuex';
Vue.use(Vuex);

// Calendar
import RadCalendarPlugin from 'nativescript-ui-calendar/vue';
Vue.use(RadCalendarPlugin);

// Listview
import RadListView from 'nativescript-ui-listview/vue';
Vue.use(RadListView);

// Font awesome
import {TNSFontIcon, fonticon} from 'nativescript-fonticon';
TNSFontIcon.debug = false;
TNSFontIcon.paths = { 'fa': './fonts/font-awesome.css' };
TNSFontIcon.loadCss();
Vue.filter('fonticon', fonticon);

// Application
Vue.config.silent = true;

import Login from './components/Login';

new Vue({
    render: h => h('frame', [h(Login)]),
    data() {
    	return {
    		userdata: {
                id: 0,
                rank: "",
                username: "",
                password: ""
            }
    	}
    }

}).$start();