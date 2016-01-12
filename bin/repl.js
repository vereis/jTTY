function print(output) // Prints something to the console
{
	$("#terminal").append("<br class = 'nl'> <pre class = 'output'>" + output + "</pre>");
}

function parseInput(input) // Gets the input from #input and tries to read it.
{
	var input2 = "";
	var childrenLen = $("#post").children().length;
	$("#post").contents().each(function(i) 	
	{ 
		//alert($(".ppost:nth-child(" + (i+1) + ")").text());	
		//alert($(".ppost:nth-child(" + (childrenLen - i) + ")").text());
		input2 += $(".ppost:nth-child(" + (i+1) + ")").text()
	})
	var doubleDash = "--";
	var combinedInput = input + input2;
	var standardisedString = combinedInput.replace(/\s\s+/g, " ") && combinedInput.replace(doubleDash,"");		// Remove areas of multiple whitespace and also removes dashes
		historyList.push(standardisedString);
		historyList[0] = historyList.length;
		historyIndex = historyList[0];
	var parsedString = standardisedString.trim().split(" ");		// Split the string into several based on whitespace
	validate(parsedString, input);
}

function validate(input, original) // Validates a functions and arguments
{
	var stringLength = input.length - 1; // Empty string beginning and end count too for some reason, lets sanitise
	var flag = false;
	
	//print(stringLength);
	
	for (i = 0; i <= COMMAND_LIST.length; i++) // Is the first segment of the input a valid command?
	{
		if (COMMAND_LIST[i] == input[0])
		{
			flag = true; // If so, cool
		}
	}

	if (flag == true) // Depending on the results of the previous test, either proceed here, or below..
	{
		if (stringLength > 0) // If there is more than one segment to our input, we'll use em as arguments
		{
			var args = []; 

			for (i = 1; i <= stringLength; i++)
			{
				if (input[i] != null) { args[i-1] = input[i]; }  
			}

			evaluate(input[0], args);
		}
		else // Otherwise call evaluate without any arguments
		{
			evaluate(input[0], "empty");
		}
	}
	else
	{
		var error = "The specified command " + input[0] + " was not recognised as a valid command."
		print(error);
		respond("null");
	}
}

function evaluate(input, args) // Executes different code depending on input and arguments 
{
	if (input == "clear")
	{
		clear(args);
	}
	
	
	else if (input == "echo")
	{
		echo(args);
	}
	
	else if (input == "about")
	{
		about(args);
	}

	else if (input == "help") // The loop automatically prints every command with every associated help message
	{
		help(args);
	}
	
	
	else if (input == "google" || input == "youtube") // These section governs sites you can search
	{
		search(input, args);
	}
	
	
	else if (input == "site" || input == "facebook" || input == "wikipedia" || input == "discord" || input == "trello") // This just redirects either to a site shorthand such as facebook
	{
		redir(input, args);
	}
	
	else if (input == "rss")
	{
		rss(input, args);
	}

}

function respond(input) // Prints new prompt and input. 
{
	$("#prompt").attr("class", "prompt_Old");
	$("#prompt").attr("id", null);
	$("#caret").remove();
	$("#post").attr("class", "input_Old");
	$("#post").attr("id", null);
	$(".input_Old").contents().each(function(i) 	
	{ 
		$(".ppost:nth-child(" + (i+1) + ")").attr("class", "input_Old");
		$(".ppost:nth-child(" + (i+1) + ")").attr("id", null);
	})
	$("#input").attr("class", "input_Old");
	$("#input").attr("id", null);
	$(".input_Old").attr("contentEditable", "false");
	if(input == "!br")
	{
		$("#terminal").append(promptString + inputString + inputBlock + postInput);
	}
	else
	{
		$("#terminal").append("<br class = 'nl'>" + promptString + inputString + inputBlock + postInput);
	}
	$("#input").focus();
	resetInput();
}

function focusEnd()
{
	$("#input").focus();
	var editableDiv = document.getElementById("input");
	cursorManager.setEndOfContenteditable(editableDiv);
}

//------------------------------------------------------------------------------------------------------------------------------------------------------------------/

function resetInput()
{
	catchEnter();
	catchClick();
	catchLR();
	catchUD();
}
