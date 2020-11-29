const tailwindcss = require("tailwindcss")
const autoprefixer = require("autoprefixer")

const plugins = {
	tailwindcss: { config: "./tailwind.config.js" },
	autoprefixer,
}

/**
 * purge: See https://tailwindcss.com/docs/controlling-file-size#basic-usage
 */
module.exports = {
	plugins,
}
