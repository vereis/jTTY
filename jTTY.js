var jTTY = (function() {

    // Takes an options object. The options object currently supports the following options
    // {
    //     'enableCommands' : {
    //         'key' : int || string,
    //         'commands' : object<function_name, function>
    //     }
    // }
    var constructor = function(id, options) {
        // Initialise Terminal ----------------------------------------------------------------
        var self = this;

        var state = {
            is_dragging: false,
            drag: {
                from: null,
                to: null,
            }
        };

        this.id = id || __generateId();

        this.state = state;

        this.commands = options && options.enableCommands && options.enableCommands.commands ? 
            options.enableCommands.commands : {};

        this.submitKey = options && options.enableCommands && options.enableCommands.key ? 
            options.enableCommands.key : -1;

        // Create DOM Elements ----------------------------------------------------------------
        this.buffer = document.createElement("textarea");
        this.display = document.createElement("pre");
        this.container = document.createElement("div");

        this.buffer.setAttribute("class", "jtty-text-buffer");

        this.display.setAttribute("class", "jtty-display");
        this.display.setAttribute("tabindex", "1");

        this.container.setAttribute("class", "jtty-term");
        this.container.setAttribute("id", this.id);
        this.container.appendChild(this.buffer);
        this.container.appendChild(this.display);

        // Attach Event Handlers --------------------------------------------------------------
        this.display.addEventListener("mouseup", function() {
            if (state.is_dragging) {
                __setCaretPosition(state.drag.from, state.drag.to);
            } else {
                __setCaretPosition(self.buffer.value.length);
            }
            state.drag.from = null;
            state.drag.to = null;
            state.is_dragging = false;

            __updateCaretPosition(self.buffer);

            self.buffer.focus();
        });

        this.buffer.addEventListener("input", function(e) {
            return __renderDisplay();
        });

        this.buffer.addEventListener("keydown", function(e) {
            if (self.submitKey && (e.key === self.submitKey || e.keyCode === self.submitKey)) {
                var userInput = self.getContents().split(" ");
                var command = userInput[0];
                var args = userInput.splice(1);

                // Clear user input
                self.deleteContents("");
                self.setCaretPos(0, 0);

                // Perform function if possible
                if (self.commands[command]) {
                    self.commands[command].apply(self, args);
                }
                else {
                    console.log("No function by the name '" + command + "' found.");
                }

                e.preventDefault();
            }

            return __updateCaretPosition(self.buffer);
        });

        // Exposed Methods --------------------------------------------------------------------
        this.redraw = function() {
            return __renderDisplay() && __updateCaretPosition();
        };

        this.attach = function(elem) {
            return elem.appendChild(self.container);
        };

        this.detach = function(elem) {
            return elem.removeChild(self.container);
        };

        this.getContents = function() {
            return self.buffer.value;
        };

        this.setContents = function(contents) {
            if (contents === undefined || contents === null) {
                return self.deleteContents();
            }

            self.buffer.value = contents;
            return __renderDisplay() && __updateCaretPosition();
        };

        this.appendContents = function(contents) {
            self.buffer.value += contents;
            return __renderDisplay() && __updateCaretPosition();
        };

        this.deleteContents = function() {
            self.buffer.value = "";
            return __renderDisplay() && __updateCaretPosition();
        };

        this.getCaretPos = function() {
            return __getCaretPosition();
        };

        this.setCaretPos = function(from, to) {
            return __setCaretPosition(from, to) && __renderDisplay() && __updateCaretPosition();
        };

        // Internal Functions -----------------------------------------------------------------
        function __renderDisplay() {
            var val = self.buffer.value;
            self.display.innerHTML = "";

            if (val) {
                val = val.split("");

                for (var i = 0; i < val.length; i++) {
                    self.display.appendChild(__makeChar(self, val[i], i, self.buffer));
                    __updateCaretPosition();
                }
            }
        }

        function __setCaretPosition(a, b) {
            function inRange(dest) {
                return dest >= 0 && dest <= self.buffer.value.length;
            }

            if (b === undefined) {
                b = a;
            }

            if (b < a) {
                return __setCaretPosition(b, a);
            }

            try {
                if (self.buffer.value && inRange(a) && (!b || inRange(b))) {

                    // Dirty hack for focus and no highlighting.
                    self.buffer.value = self.buffer.value;

                    if (self.buffer.createTextRange) {
                        var range = self.buffer.createTextRange();

                        range.setStart(a);
                        range.setEnd(b || null);

                        range.select();
                    } else {
                        if (self.buffer.selectionStart >= 0) {
                            self.buffer.focus();

                            if (b !== a) {
                                b++;
                            }

                            self.buffer.setSelectionRange(a, b || a, "none");
                        } else {
                            throw "Could not move caret - no methods defined for caret manipulation";
                        }
                    }
                } else {
                    // This case is valid when 0ing the caret position and thus we want to handle this case
                    if (a !== 0 || b !== 0) {
                        throw "Could not move caret - Dest was larger than contents of elem";
                    }
                }
            } catch (e) {
                console.warn(e);
                return false;
            }

            return true;
        }

        function __updateCaretPosition() {
            setTimeout(function() {
                var currentlySelected = __getCaretPosition();

                if (currentlySelected.from === currentlySelected.to) {
                    currentlySelected.to++;
                }

                var charContainer = self.container.querySelector(".jtty-display");
                var charElems = self.container.querySelectorAll(".jtty-char");

                if (charElems.length) {
                    for (var i = 0; i < charElems.length; i++) {
                        var index = parseInt(charElems[i].getAttribute("index"));
                        charElems[i].setAttribute("selected", false);

                        void charElems[i].offsetWidth; // Forces DOM to restart animations

                        if (index >= currentlySelected.from - 1 && index < currentlySelected.to - 1) {
                            charElems[i].setAttribute("selected", true);
                        }
                    }
                }

                charContainer.setAttribute("selected", false);

                void charContainer.offsetWidth; // Forces DOM to restart animations

                if (currentlySelected.from === 0) {
                    charContainer.setAttribute("selected", true);
                }
            }, 0);
        }

        function __getCaretPosition() {
            return {
                from: Math.min(self.buffer.selectionStart, self.buffer.selectionEnd),
                to: Math.max(self.buffer.selectionStart, self.buffer.selectionEnd)
            };
        }
    }

    // Generic Functions ------------------------------------------------------------------
    var __generateId = function() {
        return ("uuid_" + Math.floor(Math.random() * 1000000) + "" + Math.floor(Math.random() * 1000000));
    };

    var __isNewLine = function(char) {
        return char.match("(\r)?\n");
    }

    var __makeChar = function(container, char, index) {
        var r = document.createElement("span");
        r.setAttribute("index", index);
        r.setAttribute("class", "jtty-char");

        if (__isNewLine(char)) {
            r.innerHTML = "<span class='hidden'>&crarr;</span>\n";
        } else {
            r.innerHTML = char;
        }

        // Drag handling - custom selection code
        r.addEventListener("mousedown", function(e) {
            container.state.is_dragging = true;
            container.state.drag.from = index;
            container.state.drag.to = index;
        });

        r.addEventListener("mouseover", function(e) {
            if (container.state.is_dragging) {
                container.state.drag.to = index;
            }
        });

        return r;
    }

    return constructor;
})();
