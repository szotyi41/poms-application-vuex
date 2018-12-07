<template>
    <Page xmlns:calendar="nativescript-ui-calendar">
        <ActionBar class="action-bar" title="Calendar">
            <ActionItem @tap="changeViewMode" :text="viewModes[viewMode.next].text"
                android.position="actionBar" ios.position="right" />
        </ActionBar>
        <RadCalendar id="myCalendar" :eventSource="calendarEvents" :viewMode="viewMode.mode" eventsViewMode="Inline" />
    </Page>
</template>

<script>

import axios from 'axios';
import { Color } from 'tns-core-modules/color';
import { CalendarEvent } from 'nativescript-ui-calendar';
import { CalendarViewMode } from 'nativescript-ui-calendar';
import { CalendarEventsViewMode } from 'nativescript-ui-calendar';

export default {
    created() {

        axios({ 
            url: "http://mediaturmix.com/ordermanagement/src/calendar.php",
            method: "POST",
            responseType: "json"
        })
        .then(result => {


            this.events = result.data;
            this.calendarEvents = [];

            for(var i in this.events) {

                var event = this.events[i];

                var from = new Date(event.orders_fromtime + 'T10:00:00Z');
                var until = new Date(event.orders_untiltime + 'T10:00:00Z');

                if(from > new Date('2018-10-12T10:00:00Z')) {
                    var object = new CalendarEvent("Start of: " + event.campaign_code, from, from, false, new Color('#1fbba6'));
                    this.calendarEvents.push(object);

                    var object = new CalendarEvent("End of: " + event.campaign_code, until, until, false, new Color('#7f7f7f'));
                    this.calendarEvents.push(object);
                }
                
            }

        }, error => {
            alert("A naptár betöltéséhez mobilinternet, vagy wifi szükséges.");
        });        

    },
    data: function() {
        return {
            events: [],
            calendarEvents: [],
            eventsViewMode: CalendarEventsViewMode.Popover,
            viewModes: [{
                text: "Month",
                mode: CalendarViewMode.Month,
                next: 1
            }, {
                text: "Month names",
                mode: CalendarViewMode.MonthNames,
                next: 2
            }, {
                text: "Year",
                mode: CalendarViewMode.Year,
                next: 3
            }, {
                text: "Day",
                mode: CalendarViewMode.Day,
                next: 0
            }],
            viewMode: {text: "Month", mode: CalendarViewMode.Month, next: 1}
        }
    },
    methods: {
        changeViewMode() {
            this.viewMode = this.viewModes[this.viewMode.next];
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

.notviewed {
    background: #eee;
}

.cron {
    color: #0000BE;
}

.error {
    color: #BB0004;
}

</style>
