//------------------------------------------------------------------------------------------------------------------------------------------------------------------/

function catchEnter() //Intercepts enter presses when on input
{
	$("#input").keydown(function(e)
	{   
		$("#input br").remove();
		if (e.which == 13)
		{
			parseInput($("#input").text());
			return false;
		}
	});
}

//------------------------------------------------------------------------------------------------------------------------------------------------------------------/

function catchClick() // Intercepts clicks on body
{
	$("body").click(function()
	{
	   focusEnd();
	});
}

//------------------------------------------------------------------------------------------------------------------------------------------------------------------/

function catchLR()
{
	$("#input").keyup(function(e)
	{
		if (e.which == 37 && $("#input").text().length > 0)
		{
			var end = $("#input").length;
			var currentText = $("#input").text();
			$("#input").remove();
			$("#prompt").append("<pre id = 'input' contentEditable = 'true'>" + currentText.substring(0, currentText.length-1) + "</pre>");
			focusEnd();
			$("#post").prepend("<pre class = 'ppost'>" + currentText.substring(currentText.length-1, currentText.length) + "</pre>");
			
			setTimeout(10,resetInput());
			
			return false;
		}
		else if (e.which == 39)
		{
			var currentText = $("#input").text();
			var newText = currentText + $(".ppost:first-child").text();
			$("#input").remove();
			$("#prompt").append("<pre id = 'input' contentEditable = 'true'>" + newText + "</pre>");
			focusEnd();
			$(".ppost:first-child").remove();

			setTimeout(10,resetInput());
			
			return false;
		}
		else if (e.which == 46)
		{
			var childrenLen = $("#post").children().length;
			if (childrenLen < 1)
			{
				var end = $("#input").length;
				var currentText = $("#input").text();
				$("#input").remove();
				$("#prompt").append("<pre id = 'input' contentEditable = 'true'>" + currentText.substring(0, currentText.length-1) + "</pre>");
				focusEnd();
				setTimeout(10,resetInput());
			}
			else
			{
				$(".ppost:first-child").remove();
			}
			return false;
		}
	});
}

//------------------------------------------------------------------------------------------------------------------------------------------------------------------/

function catchUD()
{
	$("#input").keyup(function(e)
	{
		if (e.which == 38)
		{
			if (historyIndex >= 2)
			{
				historyIndex--;
				$("#input").remove();
				$("#prompt").append("<pre id = 'input' contentEditable = 'true'>" + historyList[historyIndex] + "</pre>");
				$(".ppost").remove();
				focusEnd();
				setTimeout(10,resetInput());
			}
			else
			{
			}
		}
		else if (e.which == 40)
		{
			if (historyIndex < historyList.length-1)
			{
				historyIndex++;
				$("#input").remove();
				$("#prompt").append("<pre id = 'input' contentEditable = 'true'>" + historyList[historyIndex] + "</pre>");
				$(".ppost").remove();
				focusEnd();
				setTimeout(10,resetInput());
			}
			else if (historyIndex == historyList.length-1)
			{
				$("#input").remove();
				$("#prompt").append("<pre id = 'input' contentEditable = 'true'></pre>");
				$(".ppost").remove();
				focusEnd();
				setTimeout(10,resetInput());
			}
		}
	});
}