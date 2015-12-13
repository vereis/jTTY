$.fn.getRSS = function (opt) 
{
	var def = $.extend({MaxCount: 5,
						ShowDesc: true,
						ShowPubDate: true,
						DescCharacterLimit: 15,
						TitleLinkTarget: "_blank",
						DateFormat: "",
						DateFormatLang:"en" }, opt);
	
	var id = $(this).attr("id"), i, s = "", dt;
	$("#" + id).empty();
	
	if (def.FeedUrl == undefined) return;       
	//$("#" + id).append(loading);
	drawLoad();

	var yahooString = 'SELECT channel.item FROM feednormalizer WHERE output="rss_2.0" AND url ="' + def.FeedUrl + '" LIMIT ' + def.MaxCount;

	$.ajax({
		url: "https://query.yahooapis.com/v1/public/yql?q=" + encodeURIComponent(yahooString) + "&format=json&diagnostics=false&callback=?",
		dataType: "json",
		success: function (data) 
		{
			$("#loading").remove();
			$("#" + id).empty();
			if (!(data.query.results.rss instanceof Array)) { data.query.results.rss = [data.query.results.rss]; }

			$.each(data.query.results.rss, function (e, itm) 
			{
				s += '<li><div class="itemTitle"><a href="' + itm.channel.item.link + '" target="' + def.TitleLinkTarget + '" >' + itm.channel.item.title + '</a></div>';
				
				if (def.ShowPubDate)
				{
					dt = new Date(itm.channel.item.pubDate);
					s += '<pre class="itemDate">';
					if ($.trim(def.DateFormat).length > 0) 
					{
						try { moment.lang(def.DateFormatLang); s += moment(dt).format(def.DateFormat); }
						catch (e){s += dt.toLocaleDateString();}                            
					}
					else { s += dt.toLocaleDateString(); }
					
					s += '</div>';
				}
				
				if (def.ShowDesc) 
				{
					s += '<div class="itemContent">';
					if (def.DescCharacterLimit > 0 && itm.channel.item.description.length > def.DescCharacterLimit) 
					{
						s += itm.channel.item.description.substring(0, def.DescCharacterLimit) + '...';
					}
					else { s += itm.channel.item.description; }
					
					s += '</div>';
				}
			});
			
			$("#" + id).append('<ul class="rssFeed">' + s + '</ul>');

		}
	});
};
