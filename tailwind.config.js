const colors = require("tailwindcss/colors")
const _ = require("lodash")
const plugin = require("tailwindcss/plugin")

module.exports = {
	prefix: "tw-",
	purge: [],
	darkMode: false, // or 'media' or 'class'
	corePlugins: {
		boxSizing: false,
	},
	theme: {
		extend: {
			colors: {
				// see https://tailwindcss.com/docs/customizing-colors#color-palette-reference
				blueGray: colors.blueGray,
				trueGray: colors.trueGray,
				warmGray: colors.warmGray,
			},
			flex: {
				/** Browser Bug
				 * A flex basis of 0% is not interpreted by Browsers the same as 0.
				 * Additionally, if set via composite flex: 1 0;, FF converts mistakenly that to flex 1 1 0px;
				 * */
				1: "1; flex-grow: 1; flex-shrink: 1; flex-basis: 0",
			},
			outline: {
				"pink-400": ["1px dotted rgba(244, 114, 182)", "0px"],
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [
		/**
		 * Box Plugin
		 *
		 * Produces
		 * ```
		 *  .tw-box-1 {
		 *      padding: 0.25rem;
		 *  }
		 * ```
		 * for each value of config("theme.spacing")
		 * ```
		 * [class^='tw-box-'] *, [class*=' tw-box-'] * {
		 *   color: inherit;
		 * }
		 * ```
		 *
		 * For the spacing scale, see
		 * https://tailwindcss.com/docs/customizing-spacing#default-spacing-scale
		 */ // @ts-ignore
		plugin(function ({ addComponents, e, prefix, config }) {
			const boxParents = _.map(config("theme.spacing"), (value, key) => {
				return {
					[`.${prefix(`${e(`box-${key}`)}`)}`]: {
						padding: `${value}`,
						display: "block",
					},
				}
			})
			/**
			 * prefix only works if string starts with a dot
			 */
			let cssSelector = prefix(".box-").substr(1)
			const boxElementsSameColor = {
				[`[class^='${cssSelector}'] *, [class*=' ${cssSelector}'] *`]: {
					color: "inherit",
				},
			}
			const boxElementsBorder = {
				[`.${prefix(`${e(`box-borderize-my`)}`)} > * + *`]: {
					"border-top": "inherit",
				},
			}
			addComponents([boxElementsBorder, boxElementsSameColor, ...boxParents])
		}),
		/**
		 * In Center Pad Horizonzal And Vertical My Plugin
		 *
		 * Produces
		 * ```
		 *  .tw-center-h-byflex-my.tw-p-4 > *, .tw-center-h-bymar-my.tw-p-4 > * {
		 *      padding-left: 1rem;
		 *      padding-right: 1rem;
		 *  }
		 *  .tw-center-v-byflex-my.tw-p-4 > *, .tw-center-v-bymar-my.tw-p-4 > * {
		 *      padding-top: 1rem;
		 *      padding-bottom: 1rem;
		 *  }
		 * 	.tw-center-vh-byflex-my.tw-p-4 > *, .tw-center-vh-bymar-my.tw-p-4 > * {
		 *      padding-left: 1rem;
		 *      padding-right: 1rem;
		 *      padding-top: 1rem;
		 *      padding-bottom: 1rem;
		 *  }
		 * ```
		 * for each value of config("theme.spacing")
		 *
		 * For the spacing scale, see
		 * https://tailwindcss.com/docs/customizing-spacing#default-spacing-scale
		 */ plugin(function ({ addComponents, e, prefix, config }) {
			const centerHComponents = _.map(config("theme.spacing"), (value, key) => {
				return {
					[`.${prefix(`${e(`center-h-byflex-my`)}`)}.${prefix(
						`${e(`p-${key}-my`)} > *`,
					)}, .${prefix(`${e(`center-h-bymar-my`)}`)}.${prefix(
						`${e(`p-${key}-my`)} > *`,
					)}`]: {
						"padding-left": `${value}`,
						"padding-right": `${value}`,
					},
				}
			})
			const centerVComponents = _.map(config("theme.spacing"), (value, key) => {
				return {
					[`.${prefix(`${e(`center-v-byflex-my`)}`)}.${prefix(
						`${e(`p-${key}-my`)} > *`,
					)}, .${prefix(`${e(`center-v-bymar-my`)}`)}.${prefix(
						`${e(`p-${key}-my`)} > *`,
					)}`]: {
						"padding-top": `${value}`,
						"padding-bottom": `${value}`,
					},
				}
			})
			const centerVHComponents = _.map(
				config("theme.spacing"),
				(value, key) => {
					return {
						[`.${prefix(`${e(`center-vh-byflex-my`)}`)}.${prefix(
							`${e(`p-${key}-my`)} > *`,
						)}, .${prefix(`${e(`center-vh-bymar-my`)}`)}.${prefix(
							`${e(`p-${key}-my`)} > *`,
						)}`]: {
							"padding-left": `${value}`,
							"padding-right": `${value}`,
							"padding-top": `${value}`,
							"padding-bottom": `${value}`,
						},
					}
				},
			)
			addComponents([centerHComponents, centerVComponents, centerVHComponents])
		}),
		/**
		 * Center Horizontal By Margins Plugin
		 *
		 * Produces
		 * ```
		 *  .tw-center-h-4 {
		 *      box-sizing: content-box;
		 *      max-width: max-content;
		 *      margin-left: auto;
		 *      margin-right: auto;
		 *      padding-left: 1rem;
		 *      padding-right: 1rem;
		 *  }
		 * ```
		 * for each value of config("theme.spacing")
		 *
		 * For the spacing scale, see
		 * https://tailwindcss.com/docs/customizing-spacing#default-spacing-scale
		 */ plugin(function ({ addComponents, e, prefix, config }) {
			const centerComponents = _.map(config("theme.spacing"), (value, key) => {
				return {
					[`.${prefix(`${e(`center-h-${key}`)}`)}`]: {
						"box-sizing": "content-box",
						"max-width": "max-content",
						"margin-left": "auto",
						"margin-right": "auto",
						"padding-left": `${value}`,
						"padding-right": `${value}`,
					},
				}
			})
			addComponents(centerComponents)
		}),
		/**
		 * Center Vertical By Margins Plugin
		 *
		 * Produces
		 * ```
		 *  .tw-center-v-4 {
		 *      box-sizing: content-box;
		 *      max-height: max-content;
		 *      margin-top: auto;
		 *      margin-bottom: auto;
		 *      padding-top: 1rem;
		 *      padding-bottom: 1rem;
		 *  }
		 * ```
		 * for each value of config("theme.spacing")
		 *
		 * For the spacing scale, see
		 * https://tailwindcss.com/docs/customizing-spacing#default-spacing-scale
		 */ plugin(function ({ addComponents, e, prefix, config }) {
			const centerComponents = _.map(config("theme.spacing"), (value, key) => {
				return {
					[`.${prefix(`${e(`center-v-${key}`)}`)}`]: {
						"box-sizing": "content-box",
						"max-height": "max-content",
						"margin-top": "auto",
						"margin-bottom": "auto",
						"padding-top": `${value}`,
						"padding-bottom": `${value}`,
					},
				}
			})
			addComponents(centerComponents)
		}),
		/**
		 * Center Horizontal Byflex Bycontainer Plugin
		 *
		 * Produces
		 * ```
		 *  .tw-center-h-byflex-bycon-4 {
		 *      box-sizing: content-box;
		 *      display: flex;
		 *      flex-direction: column;
		 *      align-items: center;
		 *      padding-left: 1rem;
		 *      padding-right: 1rem;
		 *  }
		 * ```
		 * for each value of config("theme.spacing")
		 *
		 * For the spacing scale, see
		 * https://tailwindcss.com/docs/customizing-spacing#default-spacing-scale
		 */ plugin(function ({ addComponents, e, prefix, config }) {
			const centerComponents = _.map(config("theme.spacing"), (value, key) => {
				return {
					[`.${prefix(`${e(`center-h-byflex-bycon-${key}`)}`)}`]: {
						"box-sizing": "content-box",
						display: "flex",
						"flex-direction": "column",
						"align-items": "center",
						"padding-left": `${value}`,
						"padding-right": `${value}`,
					},
				}
			})
			addComponents(centerComponents)
		}),
		/**
		 * Center Horizontal Byflex Bymargin Plugin
		 *
		 * Produces
		 * ```
		 *  .tw-center-h-byflex-bymar-4 {
		 *      box-sizing: content-box;
		 *      display: flex;
		 *      flex-direction: column;
		 *      padding-left: 1rem;
		 *      padding-right: 1rem;
		 *      "text-align": "center"
		 *  }
		 *  [class*="tw-center-h-byflex-bymar] > * {
		 *      margin-left: auto;
		 *      margin-right: auto;
		 *  }
		 * ```
		 * for each value of config("theme.spacing")
		 *
		 * For the spacing scale, see
		 * https://tailwindcss.com/docs/customizing-spacing#default-spacing-scale
		 */ plugin(function ({ addComponents, e, prefix, config }) {
			const centerComponents = _.map(config("theme.spacing"), (value, key) => {
				return {
					[`.${prefix(`${e(`center-h-byflex-bymar-${key}`)}`)}`]: {
						"box-sizing": "content-box",
						display: "flex",
						"flex-direction": "column",
						"padding-left": `${value}`,
						"padding-right": `${value}`,
						"text-align": "center" /*for text-only node*/,
					},
				}
			})
			const centerComponentElements = {
				[`[class*="${prefix(`${e(`center-h-byflex-bymar`)}`)}"] > *`]: {
					"margin-left": "auto",
					"margin-right": "auto",
				},
			}
			addComponents([centerComponents, centerComponentElements])
		}),
		/**
		 * Center Vertical Byflex Bycontainer Plugin
		 *
		 * Produces
		 * ```
		 *  .tw-center-v-byflex-bycon-4 {
		 *      box-sizing: content-box;
		 *      display: flex;
		 *      flex-direction: column;
		 *      justify-content: center
		 *      padding-top: 1rem;
		 *      padding-bottom: 1rem;
		 *  }
		 * ```
		 * for each value of config("theme.spacing")
		 *
		 * For the spacing scale, see
		 * https://tailwindcss.com/docs/customizing-spacing#default-spacing-scale
		 */ plugin(function ({ addComponents, e, prefix, config }) {
			const centerComponents = _.map(config("theme.spacing"), (value, key) => {
				return {
					[`.${prefix(`${e(`center-v-byflex-bycon-${key}`)}`)}`]: {
						"box-sizing": "content-box",
						display: "flex",
						"flex-direction": "column",
						"justify-content": "center",
						"padding-top": `${value}`,
						"padding-bottom": `${value}`,
					},
				}
			})
			addComponents(centerComponents)
		}),
		/**
		 * Center Vertical Byflex Bymargin Plugin
		 *
		 * Produces
		 * ```
		 *  .tw-center-v-byflex-bymar-4 {
		 *      box-sizing: content-box;
		 *      display: flex;
		 *      flex-direction: column;
		 *      padding-top: 1rem;
		 *      padding-bottom: 1rem;
		 *  }
		 *  [class*="tw-center-v-byflex-bymar-"] > .tw-center-v-byflex-bymar-principal {
		 *      margin-top: auto;
		 *      margin-bottom: auto;
		 *   }
		 * ```
		 * for each value of config("theme.spacing")
		 *
		 * For the spacing scale, see
		 * https://tailwindcss.com/docs/customizing-spacing#default-spacing-scale
		 */ plugin(function ({ addComponents, e, prefix, config }) {
			const centerComponents = _.map(config("theme.spacing"), (value, key) => {
				return {
					[`.${prefix(`${e(`center-v-byflex-bymar-${key}`)}`)}`]: {
						"box-sizing": "content-box",
						display: "flex",
						"flex-direction": "column",
						"padding-top": `${value}`,
						"padding-bottom": `${value}`,
					},
				}
			})
			let cssSelector = prefix(".center-v-byflex-bymar-").substr(1)
			const centerComponentElements = {
				[`[class^='${cssSelector}'] > .${prefix(
					`${e(`center-v-byflex-bymar-principal`)}`,
				)}, [class*=' ${cssSelector}'] > .${prefix(
					`${e(`center-v-byflex-bymar-principal`)}`,
				)}`]: {
					"margin-top": "auto",
					"margin-bottom": "auto",
				},
			}
			// for a node only containing text
			const centerMe = {
				[`.${prefix(`${e(`center-v-byflex-bymar-me`)}`)}`]: {
					"margin-top": "auto",
					"margin-bottom": "auto",
				},
			}
			addComponents([centerComponents, centerComponentElements, centerMe])
		}),
		/**
		 * Stack Horizontal Plugin
		 *
		 * Produces
		 * ```
		 *  .tw-stack-h-1 > * + * {
		 *      margin-left: 0.25rem;
		 *  }
		 * ```
		 * for each value of config("theme.spacing")
		 *
		 * For the spacing scale, see
		 * https://tailwindcss.com/docs/customizing-spacing#default-spacing-scale
		 */ plugin(function ({ addComponents, e, prefix, config }) {
			const stackComponents = _.map(config("theme.spacing"), (value, key) => {
				return {
					[`.${prefix(`${e(`stack-h-${key}`)}`)} > * + *`]: {
						"margin-left": `${value}`,
					},
				}
			})
			addComponents(stackComponents)
		}),
		/**
		 * Stack Vertical Plugin
		 *
		 * Produces
		 * ```
		 *  .tw-stack-v-1 > * + * {
		 *      margin-top: 0.25rem;
		 *  }
		 * ```
		 * for each value of config("theme.spacing")
		 *
		 * For the spacing scale, see
		 * https://tailwindcss.com/docs/customizing-spacing#default-spacing-scale
		 */ plugin(function ({ addComponents, e, prefix, config }) {
			const stackComponents = _.map(config("theme.spacing"), (value, key) => {
				return {
					[`.${prefix(`${e(`stack-v-${key}`)}`)} > * + *`]: {
						"margin-top": `${value}`,
					},
				}
			})
			addComponents(stackComponents)
		}),
		/**
		 * Stack Vertical Byflex Pull-Up and Spring-After Plugin
		 *
		 * Produces
		 * ```
		 *  .tw-stack-v-byflex-pull-up {
		 *    display: flex;
		 *    flex-direction: column;
		 *    justify-content: start;
		 *    }
		 * ```
		 * Plus
		 * ```
		 *    .tw-stack-v-byflex-pull-up.tw-stack-v-byflex-spring-after-1 > :nth-child(1) {
		 *    margin-bottom: auto;
		 *    }
		 *    ... for 1..4
		 * ```
		 * for each value of 1..4
		 *
		 */
		// @ts-ignore
		plugin(function ({ addComponents, e, prefix, config }) {
			const stackSpringParent = {
				".stack-v-byflex-pull-up": {
					display: "flex",
					"flex-direction": "column",
					"justify-content": "start",
				},
			}
			const stackSpringElements = _.map([1, 2, 3, 4], (value) => {
				return {
					[`.${prefix(`stack-v-byflex-pull-up`)}.${prefix(
						`${e(`stack-v-byflex-spring-after-${value}`)}`,
					)} > :nth-child(${value})`]: {
						"margin-bottom": "auto",
					},
				}
			})
			addComponents([stackSpringParent, ...stackSpringElements])
		}),
	],
}
