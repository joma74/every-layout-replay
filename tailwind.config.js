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
		}), // @ts-ignore
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
		 * Stack Plugin
		 *
		 * Produces
		 * ```
		 *  .tw-stack-1 > * + * {
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
					[`.${prefix(`${e(`stack-${key}`)}`)} > * + *`]: {
						"margin-top": `${value}`,
					},
				}
			})
			addComponents(stackComponents)
		}),
		/**
		 * Stack Justify At Start and Stack-Spring Plugin
		 *
		 * Produces
		 * ```
		 *  .tw-stack-byflex-pull-up {
		 *    display: flex;
		 *    flex-direction: column;
		 *    justify-content: start;
		 *    }
		 * ```
		 * Plus
		 * ```
		 *    .tw-stack-byflex-pull-up.tw-stack-byflex-spring-after-1 > :nth-child(1) {
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
				".stack-byflex-pull-up": {
					display: "flex",
					"flex-direction": "column",
					"justify-content": "start",
				},
			}
			const stackSpringElements = _.map([1, 2, 3, 4], (value) => {
				return {
					[`.${prefix(`stack-byflex-pull-up`)}.${prefix(
						`${e(`stack-byflex-spring-after-${value}`)}`,
					)} > :nth-child(${value})`]: {
						"margin-bottom": "auto",
					},
				}
			})
			addComponents([stackSpringParent, ...stackSpringElements])
		}),
	],
}
