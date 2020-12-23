/**
 * All links that have a local(#) target SHOULD NOT add their action to the browser's history
 */
document.querySelectorAll("a[href^='#']").forEach((elm) => {
	elm.addEventListener("click", (evt) => {
		history.replaceState({}, "", evt.toElement.href)
	})
})
