# jTTY
A fun little 'tty' written in JavaScript and CSS with the goals of feeling like a native textarea, being extensible and not being over engineered.

Check out a live example [here](https://rawgit.com/vereis/jTTY/master/index.html)

##Current Features:
  - Terminal style caret which supports any (?) hotkeys supported in normal textareas on the web.
  - The ability to move the caret by clicking on any characters
  - Highlight select functionality.

##What's coming up?
  1) Command parsing. Currently Jtty doesn't do anything functional as its base, Jsh, is being rewritten completely.
  2) Some kind of standard set of commands
  3) Custom commands and extensibility
  4) Documentation.
  
##How to use:
  - Simply add `jTTY.css` and `jTTY.js` to your webpage. This allows you to construct a new jTTY object.
  - Constructing a new `jTTY` object will allow you to use several methods. Save the results of `new jTTY()` to a variable and inspect for more information.
  - Once constructed, a `jTTY` object can be attached to any DOM nodes via the `attach(node)` method. Detaching is possible and can be done with the `detach(node)` method.

##Credits:
  -  windelicato: for inspiring me to look at making my own JavaScript terminal in the same vein as his own. It is a shame his homepage is no longer accessible the last I checked.

