// JavaScript Document
// ver-1.1.0 update 2013-01-25

(function($) {
    /*---------------------------------------------- */
    /* BEGIN add new method jfCountdown to jQuery	 */
    /*---------------------------------------------- */
    $.jfCountdown = function(params, callback) {
        var objCountdown = new ObjJfCountdown(params, callback);
    };
    /* END add new method jfCountdown to jQuery	     */

    /*---------------------------------------------- */
    /* BEGIN new object	ObjJfCountdown               */
    /*---------------------------------------------- */
    function ObjJfCountdown(params, callback) {
        var options = {
            utc : 0, //+UTC value in minutes
            year : 2000, //full format YYYY
            month : 0, //value from 1 to 12
            day : 0, //value from 1 to 31
            hour : 0, //value from 0 to 23
            minutes : 0, //value from 0 to 59
            idDays : '#days',
            idHours : '#hours',
            idMinutes : '#minutes',
            idSeconds : '#seconds'
        };

        options = $.extend(options, params);

        options = $.extend(options, {
            daySec : 86400,
            hourSec : 3600,
            minuteSec : 60,

            minuteMs : 60000,

            days$ : $(options.idDays),
            hours$ : $(options.idHours),
            minutes$ : $(options.idMinutes),
            seconds$ : $(options.idSeconds)
        });

        var counter = {
            days : 0,
            hours : 0,
            minutes : 0,
            seconds : 0
        };

        initialise();
        update();

        /*---------------------------------------------- */
        /* BEGIN loop countdown                          */
        /*---------------------------------------------- */
        var idInterval = setInterval(function() {
            if(counter.seconds == 59) {
                if(counter.minutes == 59) {
                    if(counter.hours == 23) {
                        counter.days += 1;
                        counter.hours = 0;
                        counter.minutes = 0;
                        counter.seconds = 0;
                    }
                    else {
                        counter.hours += 1;
                        counter.minutes = 0;
                        counter.seconds = 0;
                    }
                }
                else {
                    counter.minutes += 1;
                    counter.seconds = 0;
                }
            }
            else {
                counter.seconds += 1;
            }

            update();

        }, 1000);
        /* END loop countdown                          */

        function initialise() {
            var dateNow = new Date();
            var dateOpen = new Date();
            dateOpen.setFullYear(options.year, options.month - 1, options.day);
            dateOpen.setHours(options.hour, options.minutes);
            var timeUTCNowMs = dateNow.getTime() - ( -dateNow.getTimezoneOffset() * options.minuteMs);
            var timeUTCOpenMs = dateOpen.getTime() - options.utc * options.minuteMs;

            counter.seconds = Math.abs(timeUTCOpenMs - timeUTCNowMs) / 1000;
            //window.alert(counter.seconds);
            counter.days = parseInt(counter.seconds / options.daySec);
            if(counter.days > 0) {counter.seconds -= counter.days * options.daySec;}

            counter.hours = parseInt(counter.seconds / options.hourSec);
            if(counter.hours > 0) {counter.seconds -= counter.hours * options.hourSec;}

            counter.minutes = parseInt(counter.seconds / options.minuteSec);
            if(counter.minutes > 0) {counter.seconds -= counter.minutes * options.minuteSec;}
        }

        function update() {
            //options.days$.text(counter.hours);
            options.days$.text(counter.days);
            options.hours$.text(counter.hours);
            options.minutes$.text(counter.minutes);
            options.seconds$.text(counter.seconds);
        }
    }

    /* END new object ObjJfCountdown              */
})(jQuery);