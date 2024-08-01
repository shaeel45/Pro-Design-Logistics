$( document ).ready(function() {
        $('.share-twitter').each(function(){$(this).attr('href',$(this).attr('href').split("&hashtags")[0]);}); 
        $('#myCarousel .item').attr('data-interval', 6000);
        $('#myCarousel').on("slide.bs.carousel", function (e)
    {
        //get the next interval from the data- HTML attribute
        var interval = parseInt($(e.relatedTarget).data("interval"));

        //set the interval by first getting a reference to the widget
        $('#myCarousel').data("bs.carousel").options.interval =  interval;
    });
        $('.slide-in-the-news .slide-type').text('In The News');

        $("h3:contains('Most Admired List 2016')").wrap("<a target='_blank' href='http://fortune.com/worlds-most-admired-companies/c-h-robinson-worldwide-100000/' ></a>");
		
		$("h3:contains('Dickinson and Company')").wrap("<a href='https://www.chrobinson.com/en/us/Newsroom/Press-Releases/2016/05-02-2016_CH-Robinson-Honored-with-Excellence-Award-from-Becton-Dickinson-and-Company/' ></a>");
		
		$("h3:contains('Brose North America')").wrap("<a href='https://www.chrobinson.com/en/us/Newsroom/Press-Releases/2016/04-29-2016_CH-Robinson-Customer-Service-Recognized-by-Brose-North-America/' ></a>");
		
		$("h3:contains('Coca-Cola - Customer Service Team of the Year')").wrap("<a href='https://www.chrobinson.com/en/us/Newsroom/Press-Releases/2016/04-29-2016_Coca-ColaHonors-CH-Robinson-with-Customer-Service-Award/' ></a>");
		
		$("h3:contains('ConAgra Foods - 2015 Dry Brokerage Provider of the Year')").wrap("<a href='https://www.chrobinson.com/en/us/Newsroom/Press-Releases/2016/04-29-2016_CH-Robinson-Presented-with-Dry-Brokerage-Award-by-ConAgra-Foods/' ></a>");
		
		$("h3:contains('Evergreen Packaging - Carrier Excellence Award')").wrap("<a href='https://www.chrobinson.com/en/us/Newsroom/Press-Releases/2016/04-29-2016_CH-Robinson-Honored-with-Excellence-Award-from-Evergreen-Packaging/' ></a>");
		
		$("h3:contains('Dollar General - Carrier Partner of the Year')").wrap("<a href='https://www.chrobinson.com/en/us/Newsroom/Press-Releases/2016/04-29-2016_Dollar-General-Names-CH-Robinson-Carrier-Partner-of-the-Year/' ></a>");
		
		$("h3:contains('HSN - Best Supporting Business')").wrap("<a href='https://www.chrobinson.com/en/us/Newsroom/Press-Releases/2016/04-29-2016_CH-Robinson-Awarded-Best-Supporting-Business-by-HSN/' ></a>");
		
		$("h3:contains('Lowe’s - 2015 Non-Asset Provider of the Year, 2015 Platinum Carrier Award')").wrap("<a href='https://www.chrobinson.com/en/us/Newsroom/Press-Releases/2016/04-29-2016_CH-Robinson-Receives-Lowes-Carrier-Awards/' ></a>");
		
		$("h3:contains('Ocean Spray - 2015 Outbound Carrier of the Year')").wrap("<a href='https://www.chrobinson.com/en/us/Newsroom/Press-Releases/2016/04-29-2016_Ocean-Spray-Names-CH-Robinson-Outbound-Carrier-of-the-Year/' ></a>");
		
		$("h3:contains('Walmart 3PL Carrier of The Year')").wrap("<a href='https://www.chrobinson.com/en/us/Newsroom/Press-Releases/2016/04-07-2016_Walmart-Presents-CH-Robinson-with-Second-Consecutive-3PL-Award/' ></a>");
		
		$("h3:contains('St. Louis Post Dispatch Top Work Places 2016')").wrap("<a href='http://www.stltoday.com/business/workplaces/c-h-robinson-worldwide/article_52f58054-01a5-5cb2-86f4-69d2f655efd4.html' target='_blank'></a>");
		
		
		$("h3:contains('Star Tribune Top 150 Workplaces 2016')").wrap("<a href='http://www.startribune.com/listing-of-top-150-workplaces-in-minnesota-for-2015/307292801/' target='_blank'></a>");
		
		$("h3:contains('Newell Brands - 2015 Non-Asset Based Carrier of the Year')").wrap("<a href='https://www.chrobinson.com/en/us/Newsroom/Press-Releases/2016/06-14-2016_Newell-Brands-Honors-CH-Robinson-With-Non-Asset-Based-Award/' ></a>");
		
		$("h3:contains('2016 50 Best')").wrap("<a href='https://www.chrobinson.com/en/us/Newsroom/Press-Releases/2016/08-17-2016_CH-Robinson-Selected-to-Selling-Powers-50-Best-Companies-to-Sell-For-List/' ></a>");
		
		$("h3:contains('Inbound Logistics Top 100 3PL Provider')").wrap("<a href='http://www.inboundlogistics.com/cms/index.php' target='_blank'></a>");

		$("h3:contains('Inbound Logistics Top 3PL 2016')").wrap("<a href='https://www.chrobinson.com/en/us/Newsroom/Press-Releases/2016/07-08-2016_CHRobinson-Voted-Top-3PL/'></a>");


        piAId = '120242';
        piCId = '112754';

        (function() {
            function async_load(){
                        /* var s = document.createElement('script'); s.type = 'text/javascript';
                        s.src = ('https:' == document.location.protocol ? 'https://pi' : 'http://cdn') + '.pardot.com/pd.js';
                        var c = document.getElementsByTagName('script')[0]; c.parentNode.insertBefore(s, c); */
            }
            if(window.attachEvent) { window.attachEvent('onload', async_load); }
            else { window.addEventListener('load', async_load, false); }
        })();

	
});

$(window).load(function() {
 // adds title to twitter iframe
 $('.twitter-timeline').attr('title','C.H. Robinson Twitter Feed');
 
 //adds title to hidden tracking iframe
 $('iFrame[src*="fls.doubleclick.net"]').attr('title','tracking iFrame code');

});