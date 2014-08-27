// JavaScript Document
// ver-1.1.0 update 2013-01-30

if(urlToSite[urlToSite.length - 1] === '/') {
    urlToSite = urlToSite.substr(0, urlToSite.length - 1);
}

(function($) {
    $(document).ready(function() {
        /*------------------------------ */
        /* BEGIN Countdown          	 */
        /*------------------------------ */
        $.jfCountdown(dateOpen, function() {/*code for callback function, call when is open date, for example, redirect*/});
        /* END Countdown          	 */

        /*------------------------------ */
        /* BEGIN Subscribe Form        	 */
        /*------------------------------ */
        $.jfSubscribe({
            id : '#subscribe',
            urlToSite : urlToSite
        });

        $.jfSubscribe({
            id : '#subscribe-bottom',
            urlToSite : urlToSite
        });
        /* END Subscribe Form        	 */

        /*------------------------------ */
        /* BEGIN Contact Form        	 */
        /*------------------------------ */
        var contactForm = new jfContactForm(urlToSite);
        /* END Contact Form        	 */

        /*------------------------------ */
        /* START Tweet                   */
        /*------------------------------ */
        if(tweetUserName != '' && tweetCount > 1) {
            $(".tweet").tweet({
                username : tweetUserName,
                count : tweetCount,
                page : 1,
                avatar_size : 15,
                loading_text : "loading ..."
            }).bind("loaded", function() {
                    var ul = $(this).find(".tweet_list");
                    var ticker = function() {
                        setTimeout(function() {
                            ul.animate({marginTop : '-=23px'}, 1500, function() {
                                if(Math.abs(parseInt(ul.css('marginTop'))) >= parseInt(ul.innerHeight())) {
                                    ul.css('marginTop', 0);
                                }
                                ticker();
                            });
                        }, 5000);
                    };
                    ticker();
                });
        }
        /* END Tweet					*/

        /*--------------------------------------------- */
        /* START copy social icons to mobile version    */
        /*--------------------------------------------- */
        $(document).ready(function() {
            $("#footer .social-icons").clone().prependTo("#menu-style-b li.wrap-social-icons");
        });
        /* END copy social icons to mobile version    */


    });
})(jQuery);