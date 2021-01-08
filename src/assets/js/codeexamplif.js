Prism = Prism || {}
Prism.manual = true
const FORCODEEXAMPLE_ATT_NAME = "for-code-example"
/** @type {HTMLElement} */
const codeExampleDom = document.getElementById("usage-example").cloneNode(true)
const notCodingExampleElements = document.createNodeIterator(
	codeExampleDom,
	NodeFilter.SHOW_ALL,
	(/** @type {Node} */ elm) => {
		if (elm.nodeType == 3 || !elm.hasAttribute(FORCODEEXAMPLE_ATT_NAME))
			return NodeFilter.FILTER_ACCEPT
		else return NodeFilter.FILTER_SKIP
	},
)
/** @type {Node} */
let notCodingExampleElement = null
while (
	(notCodingExampleElement = notCodingExampleElements.nextNode()) != null
) {
	notCodingExampleElement.parentElement.removeChild(notCodingExampleElement)
}
/**
 *  Remove all attributes named FORCODEEXAMPLE_ATT_NAME
 **/
if (codeExampleDom.getAttribute(FORCODEEXAMPLE_ATT_NAME) != null) {
	codeExampleDom.removeAttribute(FORCODEEXAMPLE_ATT_NAME)
}
codeExampleDom
	.querySelectorAll(`[${FORCODEEXAMPLE_ATT_NAME}]`)
	.forEach((elm) => {
		elm.removeAttribute(FORCODEEXAMPLE_ATT_NAME)
	})
let codeExample = codeExampleDom.outerHTML
codeExample = html_beautify(codeExample, {
	inline: [],
})
const highlightedCodeExample = Prism.highlight(
	codeExample,
	Prism.languages.html,
)
document.getElementById(
	"code-example",
).innerHTML = `<pre class="language-markup">${highlightedCodeExample}</pre>`
