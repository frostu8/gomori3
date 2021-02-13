import ModLoader from './lib/ModLoader';

(() => {
    try {
        // inject bypass scripts
        ModLoader.bypass();

        // load mods
        ModLoader.load();
    } catch (err) {
        alert(`GOMORI encountered a critical error: ${err.stack}`);
    }
})();
