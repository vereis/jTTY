/*
* Clears terminal screen
* Author : Vereis~
*/

function clear()
{
    $("#terminal .nl, p, pre, .input_Old, #rss, rss_Old, li, ul").remove(); // Clear the screen
    respond("!br"); // We don't want a newline
}