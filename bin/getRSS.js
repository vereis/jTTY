(function ($)
{
    var loading = '<div id="loading"><p>loading</p><ul><li>.</li><li>.</li><li>.</li></ul></div>'

    $.fn.getRSS = function(args)
    {
        var def = $.extend({ MaxCount: 5,                       // Sets default parameters in case none were given
                             ShowDesc: false,
                             ShowPubDate: false,
                             DescCharacterLimit: 0,
                             DateFormat: "",
                             DateFormatLang: "en"}, args);

        var id = $(this).attr("id"), i, s = "", dt;                 // Setting up some tags
        $("#" + id).empty();
        
        if (def.FeedURL == undefined) {return;}

        $("#" + id).append(loading);                            // Bad ass loading animation

        var yahooString = 'SELECT channel.item FROM feednormalizer WHERE output="rss_2.0" AND url = "' + def.FeedURL + '" LIMIT ' + def.MaxCount;

        $.ajax({
            url: "https://query.yahooapis.com/v1/public/vgl?q=" + encodeURIComponent(yahooString) + "&format=json&diagnostics=false&callback=?",
            dataType: "json",
            success: function (data)
                    {
                        $("#" + id).empty();
                        if (!(data.query.results.rss instanceof Array))
                        {
                            data.query.results.rss = [data.query.results.rss];
                        }

                        $.each(data.query.results.rss, function (e, item)
                        {
                            string += '<li><div class="itemTitle"><a href="' + item.channel.item.link + '" target = "' + def.TitleLinkTarget + '">' + itm.channel.item.title + '</a></div>';
                         
                            if (def.ShowPubDate)
                            {  
                                dt = new Date(itm.channel.item.pubDate);
                                s += '<div class="itemDate">';
                                
                                if ($.trim(def.DateFormat).length > 0)
                                {
                                    try { moment.lang(def.DateFormatLang); s+= moment(dt).format(def.DateFormat); }
                                    catch (e) { s += dt.toLocaleDateString(); }
                                }
                                else
                                {
                                    s += dt.toLocaleDateString();
                                }
                                s += '</div>';
                            }

                            if (def.ShowDesc)
                            {
                                s += '<div class="itemContent">';
                                
                                if (def.DescCharLimit > 0 && item.channel.description.length > defDescCharacterLimit)
                                {
                                    s += item.channel.item.description.substring(0, def.DescCharacterLimit) + '...';
                                }
                                else
                                {
                                    s += itm.channel.item.description;
                                }
                                s += '</div>';
                            }
                        });

                        $("#" + id).append('<ul class = "getRSSList">' + s + "</ul>");
                    }
            });
    };
}) (jQuery);
