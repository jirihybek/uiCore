# uiCore
simple JS functions collection

See index.html for examples and usage

To use uiCore, just copy desired function into your project or include `uiCore.min.js` file.

## Included functions

### uiId(id)
Returns DOM element by id attribute.

### uiGet(selector, parent = document)
Returns single DOM element by selector.

### uiEl(tagName, attributes, content, parent)
Creates new DOM element, sets attributes, contents and optionally append to parent.

### uiEach(selector, <parent = document>, callback)
Calls callback for each element which matches selector and is child of parent.

### uiEvent(element, eventName, <preventDefault = false>, handler)
Attaches event to element using cross-browser way (handles IE non W3 pranks). Function also can handle "preventDefault" process. Function returns "eventResource" object required by uiEventRemove function.

### uiEventRemove(eventResource)
Detaches event from element which has been attached by uiEvent function (using cross-browser way).

## License
uiCore is published under GNU GPLv3 - see LICENSE.txt for more details.