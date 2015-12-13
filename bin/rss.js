/*
* Generates and displays a rss feed
* Author : Vereis~
*/

function rss(input, args)
{
	var argList = [" [--weather]", " [--nyaa]", 
					" [--daily]", " [--tech]", " [--ted]", 
					" [--help]", " [--version]"
					]
	var pages = 5;
	var url = '';
	argList.sort();

	if (args == "empty" || args[0] == "help")
	{
		print("Usage: RSS" + argList);
	}
	else if (args[0] == "version" || args[0] == "--version") 
	{
		print("jterm rss version 1.0");
	}
	else if (args.length > 0)
	{
		if (args[0] == "weather" || args[0] == "--weather")
		{
			url = 'http://open.live.bbc.co.uk/weather/feeds/en/2643123/3dayforecast.rss';
		}
		else if (args[0] == "nyaa" || args[0] == "--nyaa")
		{
			url = 'http://www.nyaa.se/?page=rss';
		}
		else if (args[0] == "daily" || args[0] == "--daily")
		{
			url = 'http://feeds.feedburner.com/InterestingThingOfTheDay';
		}
		else if (args[0] == "tech" || args[0] == "--tech")
		{
			url = 'http://feeds.feedburner.com/techradar/computing-news?format=xml';
		}
		else if (args[0] == "ted" || args[0] == "--ted")
		{
			url = 'http://feeds.feedburner.com/tedtalks_video';
		}
		else if (args[0] == "reddit" || args[0] == "--reddit")
		{
			url = 'http://www.reddit.com/.rss';
		}
		
		if (args.length > 1) { pages = args[1]; }
		
		$("#rss").attr("class", "rss_Old")
		$("#rss").attr("id", null);
		
		drawSeperator(120);
		print(" ");
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