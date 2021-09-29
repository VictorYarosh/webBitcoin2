config = {

    // Translation files
    i18nFilesLocation: 'i18n/',

    // API locations
    api: {
        local: 'http://localhost:8000/',
        test: '',
        live: 'https://api.wickedtrack.com/'
    },

    // Phone number field settings
    preferredAreaCodes: ["us", "gb", "au", "ca"],

    // Funnel config
    funnel: 'bitcoin-billionaire-autopass',

    // Assign random version for A/B testing
    version: 'A',

    vwoPushNotification: {
        account_id: 438994,
        settings_tolerance: 2000,
        library_tolerance: 2500,
        use_existing_jquery: false,
        is_spa: 1,
        hide_element: 'body',
    },
    autoPass: true

}