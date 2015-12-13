/*
* Echos argument(s)
* Author : Vereis~
*/

function echo(args)
{
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