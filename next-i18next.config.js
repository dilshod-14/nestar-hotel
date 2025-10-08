// next-i18next.config.js
module.exports = {
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'kr', 'ru', 'uz'], // ← uz ni qo‘shing
		localeDetection: false,
	},
	// (ixtiyoriy, lekin ko‘p muammoni oldini oladi)
	localePath: typeof window === 'undefined' ? require('path').resolve('./public/locales') : '/public/locales',
	trailingSlash: true,
};
