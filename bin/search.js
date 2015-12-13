/*
* Searches either youtube or google
* Author : Vereis~
*/

function search(input, args)
{
	if (input == "google") // This if/else tree generates pre-query urls
	{	
		var http = "https://www.google.com/search?q=";
	}
	else if (input == "youtube")
	{
		var http = "https://www.youtube.com/results?search_query=";
	}

	// --------------------------------------------------------------------- //
	
	if (args == "empty") // This if/else tree generates a search string and or redirects to said site
	{
		window.location = http; // This may as well be an alias of site args for specific sites
	}
	else if (args != "empty")
	{
		var query = "";
		for (i = 0; i != args.length; i++)
		{
			query += args[i] + "+";
		}
		window.location = http + query; // Otherwise perform a search
	}
}