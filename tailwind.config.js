const colors = require("tailwindcss/colors")
const _ = require("lodash")
const plugin = require("tailwindcss/plugin")

module.exports = {
	prefix: "tw-",
	purge: [],
	darkMode: false, // or 'media' or 'class'
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
		 * Stack Plugin
		 *
		 * Produces
		 * ```
		 *  .tw-stack-1 > * + * {
		 *      margin-top: 1.25rem;
		 *  }
		 * ```
		 * for each value of config("theme.spacing")
		 *
		 * For the spacing scale, see
		 * https://tailwindcss.com/docs/customizing-spacing#default-spacing-scale
		 */ // @ts-ignore
		plugin(function ({ addComponents, e, prefix, config }) {
			const stackBase = _.map(config("theme.spacing"), (value, key) => {
				return {
					[`.${prefix(`${e(`stack-${key}`)}`)} > * + *`]: {
						"margin-top": `${value}`,
					},
				}
			})
			addComponents(stackBase)
		}),
	],
}
