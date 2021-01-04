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
		 * Center By Margins Plugin
		 *
		 * Produces
		 * ```
		 *  .tw-center-4 {
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
					[`.${prefix(`${e(`center-${key}`)}`)}`]: {
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
		 * Center Byflex Plugin
		 *
		 * Produces
		 * ```
		 *  .tw-center-4 {
		 *      box-sizing: content-box;
		 *      display: flex;
		 *      flex-direction: column;
		 *      align-items: center;
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
					[`.${prefix(`${e(`center-byflex-${key}`)}`)}`]: {
						"box-sizing": "content-box",
						display: "flex",
						"flex-direction": "column",
						"align-items": "center",
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
