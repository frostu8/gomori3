const ModLoader = require('./gomori/lib/ModLoader');

(() => {
    try {
        // inject bypass scripts
        ModLoader.bypass(window);

        // load mods
        ModLoader.load();
    } catch (err) {
        alert(`GOMORI encountered a critical error: ${err.stack}`);
    }
})();
