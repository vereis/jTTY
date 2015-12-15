# jsh
A relatively function javaScript/jQuery terminal/shell.

Currently supports:
  - Caret movement
  - Fully modular design
  - Argument parsing ability

How to use:

  1) How to add new commands:
      - Ensure that you add the new command to bin/
      
      - To enable it, in index.html, add it to the usable function list and
        give it a help message.
        
      - Add an if/else check for the input and arguments in bin/REPL.js 
      
      - To enable a help argument, add a check for the argument and call
        print(printHelp(arrayOfString))
  
  2) Folder Structure:
      - Executable commands and the general workings of the terminal are
        stored in bin/
        
      - JS for extra functionality (caret position and getting rss) will
        be in lib/
        
      - Eventually custom style support will be added to styles/
      
      - Constants will be moved eventually to a properties.json
      
      
  Please play around! :)
  
  Credits:
     -  windelicato; muhh inspirations
    
     -  feedEk for which my rss is based on
