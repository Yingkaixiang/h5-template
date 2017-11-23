module.exports = {
    "extends": "airbnb-base",
    "rules": {
        "import/no-extraneous-dependencies": 0,
    },
    "globals": {
        $: true,
        Hammer: true,
        document: true,
        window: true,
        navigator: true,
        Common: true,
        JSBridge: true,
    }
};