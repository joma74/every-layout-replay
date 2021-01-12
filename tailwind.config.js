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
		 * In Center Pad Horizonzal And/Or Vertical My Plugin
		 *
		 * Produces
		 * ```
		 *  .tw-center-h-byflex-my.tw-p-4-my > *, .tw-center-h-bymar-my.tw-p-4-my > * {
		 *      padding-left: 1rem;
		 *      padding-right: 1rem;
		 *  }
		 *  .tw-center-v-byflex-my.tw-p-4-my > *, .tw-center-v-bymar-my.tw-p-4-my > * {
		 *      padding-top: 1rem;
		 *      padding-bottom: 1rem;
		 *  }
		 * 	.tw-center-vh-byflex-my.tw-p-4-my > *, .tw-center-vh-bymar-my.tw-p-4-my > * {
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
		 * Flex Pull Up or Pull Left and Spring-After Plugin
		 *
		 * Produces
		 * ```
		 *  .tw-flex-h.tw-dist-v-pull-up-my, .tw-flex-v.tw-dist-h-pull-left-my  {
		 *      justify-content: start;
		 *  }
		 * ```
		 * Plus
		 * ```
		 *  .tw-flex-h.tw-dist-v-pull-up-my.tw-dist-spring-after-2 > :nth-child(2), .tw-flex-v.tw-dist-h-pull-left-my.tw-dist-spring-after-2 > :nth-child(2) {
		 *      margin-bottom: auto;
		 *  }
		 * ```
		 * for each value of 1..4
		 *
		 */
		// @ts-ignore
		plugin(function ({ addComponents, e, prefix, config }) {
			const flexPullParents = {
				[`.${prefix(`flex-h`)}.${prefix(`dist-v-pull-up-my`)}, .${prefix(
					`flex-v`,
				)}.${prefix(`dist-h-pull-left-my`)}`]: {
					"justify-content": "start",
				},
			}
			const flexSpringElements = _.map([1, 2, 3, 4], (value) => {
				return {
					[`.${prefix(`flex-h`)}.${prefix(`dist-v-pull-up-my`)}.${prefix(
						`${e(`dist-spring-after-${value}`)}`,
					)} > :nth-child(${value}), .${prefix(`flex-v`)}.${prefix(
						`dist-h-pull-left-my`,
					)}.${prefix(
						`${e(`dist-spring-after-${value}`)}`,
					)} > :nth-child(${value})`]: {
						"margin-bottom": "auto",
					},
				}
			})
			addComponents([flexPullParents, flexSpringElements])
		}),
	],
}
