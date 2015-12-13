function drawLoad()
{
	$("#terminal").append(loading);
}

function drawSeperator(i)
{
	seperatorLength = i;
	seperator = Array(seperatorLength+1).join("-");
	$("#terminal").append("<br id='nl'> <pre class = 'output'>" + seperator + "</pre>");
}

function printHelp(messageArray, mode)
{
	if (mode == "argList")
	{
		messageArray.sort();
		var output = ""
		for (i = 0 ; i < messageArray.length; i++)
		{	
			 output += " [--" + messageArray[i] + "]"
		}
	}
	
	else if (mode == "special")
	{
		
	}
	
	else
	{
		var output = "";
		for (i = 0; i < messageArray.length; i++)
		{
			output += messageArray[i] + "<br id = nl>" ;
		}
	}
	return output;
}