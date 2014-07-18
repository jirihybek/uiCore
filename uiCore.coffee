###
# uiCore - simple usefull JS snippet collection
# @author Jiri Hybek <jiri.hybek@cryonix.cz> / Cryonix Innovations <www.cryonix.cz>
###

uiEl = (tagName, attributes, content, parent) ->
	el = document.createElement(tagName)
	(el.setAttribute(key, val) if val) for key, val of attributes || {}
	el.innerHTML = content if content
	parent.appendChild(el) if parent
	return el

uiId = (id) -> return document.getElementById(id)
uiGet = (selector, parent) -> return (parent || document).querySelector(selector)

uiEach = (selector, a, b) ->
	parent = if b then a else document
	cb = if b then b else a
	
	elements = parent.querySelectorAll(selector)
	cb(el) for el in elements

uiEvent = (el, eventName, a, b) ->
	prevent = if b then a else false
	cb = if b then b else a

	handler = (ev) ->
		if prevent
			ev.preventDefault()
			ev.stopPropagation()

		r = cb(ev)

		return false if !r or prevent

	if el.addEventListener
		el.addEventListener(eventName, handler)
	else if el.attachEvent
		el.attachEvent("on{eventName}", handler)
	else
		el["on{eventName}"] = handler

	return { el: el, eventName: eventName, handler: handler }

uiEventRemove = (eventRes) ->
	throw "Invalid event resource" if !eventRes or !eventRes.el or !eventRes.handler

	if eventRes.el.removeEventListener
		eventRes.el.removeEventListener(eventRes.eventName, eventRes.handler)
	else if eventRes.el.attachEvent
		eventRes.el.detachEvent("on{eventRes.eventName}", eventRes.handler)
	else
		eventRes.el["on{eventRes.eventName}"] = null