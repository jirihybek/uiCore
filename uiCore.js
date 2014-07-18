/*
 * uiCore - simple usefull JS snippet collection (pure JS version)
 * @author Jiri Hybek <jiri.hybek@cryonix.cz> / Cryonix Innovations <www.cryonix.cz>
 */

function uiEl(tagName, attributes, content, parent){
	var el = document.createElement(tagName);
	for(var key in attributes || {}) { if(attributes[key]) el.setAttribute(key, attributes[key]); }
	if(content) el.innerHTML = content;
	if(parent) parent.appendChild(el);
	return el;
}

function uiId(id) { return document.getElementById(id); }
function uiGet(selector, parent) { return (parent || document).querySelector(selector); }

function uiEach(selector, a, b){
	var parent = (b ? a : document),
		cb = (b ? b : a);
	var elements = parent.querySelectorAll(selector);
	for(var i = 0; i < elements.length; i++) cb(elements.item(i));
}

function uiEvent(el, eventName, a, b){
	var prevent = (b ? a : false),
		cb = (b ? b : a);
	
	var handler = function(ev) {
		if(prevent){ ev.preventDefault(); ev.stopPropagation(); }
		var r = cb(ev);
		if(!r || prevent) return false;
	};

	if(el.addEventListener)
		el.addEventListener(eventName, handler);
	else if(el.attachEvent)
		el.attachEvent("on" + eventName, handler);
	else
		el["on" + eventName] = handler;

	return { el: el, eventName: eventName, handler: handler }
}

function uiEventRemove(eventRes) {
	if (!eventRes || !eventRes.el || !eventRes.handler) throw "Invalid event resource"

	if(eventRes.el.removeEventListener)
		eventRes.el.removeEventListener(eventRes.eventName, eventRes.handler);
	else if(eventRes.el.detachEvent)
		eventRes.el.detachEvent("on" + eventRes.eventName, eventRes.handler);
	else
		eventRes.el["on" + eventRes.eventName] = null;
}