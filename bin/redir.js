/*
* Redirects to given site
* Author : Vereis~
*/

function redir(input, args)
{
	if(input != "site") { var http = "https://www." + input + ".com"; }
	else if (input == "site") { var http = "https://www." + args[0];
								if (args.length > 1) { http += "." + args[1] }
							   /* if (args.length == 1) { http += ".com"; } */};
	window.location = http;
}