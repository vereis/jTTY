/*
* Loops over all possible commands, displaying help info
* Author : Vereis~
*/

function help()
{
	print("Below are the list of commands recognised by the system:");
	//print("");
	for (i = 0; i != COMMAND_LIST.length; i++)
	{
		var customTab = Array(((tabLength*5)+1) - COMMAND_LIST[i].length).join(" ");
		print(tab + COMMAND_LIST[i] + customTab  + HELP_LIST[i]);
	}
	print("For more information about these tools, you can try typing help with the command as an argument");
	print("");
	respond();
}