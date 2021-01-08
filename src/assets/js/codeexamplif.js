Prism = Prism || {}
Prism.manual = true
const USAGEEXAMPLE_ID_NAME = "usage-example"
const FORCODEEXAMPLE_ATT_NAME = "for-code-example"
/**
 *  Deep copy node by id of USAGEEXAMPLE_ID_NAME
 **/
/** @type {HTMLElement} */
const codeExampleDom = document
	.getElementById(USAGEEXAMPLE_ID_NAME)
	.cloneNode(true)
/**
 *  Find all nodes that are text nodes or not having an attribute named FORCODEEXAMPLE_ATT_NAME
 */
const notCodingExampleElements = document.createNodeIterator(
	codeExampleDom,
	NodeFilter.SHOW_ALL,
	(/** @type {Node} */ elm) => {
		if (elm.nodeType == 3 || !elm.hasAttribute(FORCODEEXAMPLE_ATT_NAME))
			return NodeFilter.FILTER_ACCEPT
		else return NodeFilter.FILTER_SKIP
	},
)
/**
 *  Remove all nodes not selected by the previous iteration
 **/
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
