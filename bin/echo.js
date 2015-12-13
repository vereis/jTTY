/*
* Echos argument(s)
* Author : Vereis~
*/

function echo(args)
{
	var helpDesc = ["This isnt accessible anyway"];
	
	if (args == "empty")
    {
        print("''"); // If no argument was given, don't echo anything
    }
    else
    {
        var returnString = ""
        for (i = 0; i != args.length; i++)
            {
                returnString += args[i] + " "; // Otherwise echo all arguments in series  
            }
        print(returnString);
        }
    respond();
}