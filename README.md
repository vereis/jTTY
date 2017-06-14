# jTTY
A fun little 'tty' written in JavaScript and CSS with the goals of feeling like a native textarea, being extensible and not being over engineered.

Current Features:
  - Terminal style caret which supports any (?) hotkeys supported in normal textareas on the web.
  - The ability to move the caret by clicking on any characters
  - Highlight select functionality.

What's coming up?
  1) Command parsing. Currently Jtty doesn't do anything functional as its base, Jsh, is being rewritten completely.
  2) Some kind of standard set of commands
  3) Custom commands and extensibility
  
How to use:
  - Simply use the code in the script tags of 'rewrite_test.html' which allows you to construct a new jTTY object which can then be attached to any DOM nodes via jTTY.attachTo(node);

Credits:
  -  windelicato: for inspiring me to look at making my own JavaScript terminal in the same vein as his own. It is a shame his homepage is no longer accessible the last I checked.

