const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
	content: ["./**/*.tsx", "!./node_modules/*.tsx"],
	theme: {
		extend: {},
	},
	plugins: [],
});
