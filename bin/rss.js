/*
* jterm - rss-get: generates and displays a rss feed
* Author : Vereis~
*/

function rss(input, args)
{
	var helpDesc = ["weather", "nyaa", "daily", "tech", "ted", "reddit", "help", "version"]
	
	var pages = 5;
	var url = '';
	
	if (args == "empty" || args[0] == "help")
	{
		print("Usage: rss" + printHelp(helpDesc, "argList"));
	}
	else if (args[0] == "version") 
	{
		print("jterm rss version 1.0");
	}
	else if (args.length > 0)
	{
		if (args[0] == "weather")
		{
			url = 'http://open.live.bbc.co.uk/weather/feeds/en/2643123/3dayforecast.rss';
		}
		else if (args[0] == "nyaa")
		{
			url = 'http://www.nyaa.se/?page=rss';
		}
		else if (args[0] == "daily")
		{
			url = 'http://feeds.feedburner.com/InterestingThingOfTheDay';
		}
		else if (args[0] == "tech")
		{
			url = 'http://feeds.feedburner.com/techradar/computing-news?format=xml';
		}
		else if (args[0] == "ted")
		{
			url = 'http://feeds.feedburner.com/tedtalks_video';
		}
		else if (args[0] == "reddit")
		{
			url = 'http://www.reddit.com/.rss';
		}
		
		if (args.length > 1) { pages = args[1]; }
		
		$("#rss").attr("class", "rss_Old")
		$("#rss").attr("id", null);
		
		drawSeperator(120);
		print(" ");
			$("#terminal").append("<div id = rss></div>");
			$("#rss").getRSS({
				FeedUrl: url,
				MaxCount : pages,
				ShowDesc : true,
				ShowPubDate:true,
				DescCharacterLimit:100,
				TitleLinkTarget:'_blank',
				});
		drawSeperator(120);
	}

	respond();
}