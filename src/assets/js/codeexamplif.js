Prism = Prism || {}
Prism.manual = true
const codeExampleDom = document
	.getElementById("container-example")
	.cloneNode(true)
const notCodingExampleElements = document.createNodeIterator(
	codeExampleDom,
	NodeFilter.SHOW_ALL,
	(/** @type {Node} */ elm) => {
		if (elm.nodeType == 3 || !elm.hasAttribute("for-code-example"))
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
