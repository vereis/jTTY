# jTTY
A fun little 'tty' written in JavaScript and CSS with the goals of feeling like a native textarea, being extensible and not being over engineered.

Check out a live example [here](https://rawgit.com/vereis/jTTY/master/index.html)

## Current Features:
  - Terminal style caret which supports any (?) hotkeys supported in normal textareas on the web.
  - The ability to move the caret by clicking on any characters
  - Highlight select functionality.

## How it works:
  - a jTTY object instantiates the following elements upon creation:
    1) A container
    2) A buffer
    3) A display
  - The container node contains both the buffer and display.
  - The buffer is a simple hidden native textarea which has event handlers attached to it which allow us to detect any changes to said textarea.
  - Whenever changes are made to the buffer, these changes are copied into the display. All characters in the display exist as their down DOM Nodes, which have event handlers to deal with clicking logic etc.
  - Using this, interactions to the display are passed through to the buffer, allowing what appears to be native seamless 'tty' emulation.
  
## Caveats:
Right now, the way we're creating DOM Objects for each character is really slow and whilst it performs reasonably well on my dev machine on Chrome, it performs horribly on Firefox with as few as 15 characters. 

## What's coming up (In order of importance, in my opinion)?
  1) Remove event handlers on individual characters and don't have spans for each one. Utilise Range to detect which character was clicked. Have caret as seperate element because the current way is hard to extend.
  2) Command parsing. Currently Jtty doesn't do anything functional as its base, Jsh, is being rewritten completely.
  3) Some kind of standard set of commands
  4) Custom commands and extensibility
  5) Documentation.
  
## How to use:
  - Simply add `jTTY.css` and `jTTY.js` to your webpage. This allows you to construct a new jTTY object.
  - Constructing a new `jTTY` object will allow you to use several methods. Save the results of `new jTTY()` to a variable and inspect for more information.
  - Once constructed, a `jTTY` object can be attached to any DOM nodes via the `attach(node)` method. Detaching is possible and can be done with the `detach(node)` method.

## Credits:
  -  windelicato: for inspiring me to look at making my own JavaScript terminal in the same vein as his own. It is a shame his homepage is no longer accessible the last I checked.

