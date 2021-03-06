import Mod from './Mod';

const fs = require('fs');
const path = require('path');

const MODS_DIR = 'www/mods';

/**
 * @class
 *
 * @classdesc 
 * The Gomori Mod Loader, the supervisor of all modding activities. It is
 * directly responsible for compiling and injecting mod content into the game.
 * To load mods, the Mod Loader processes each mod through 3 stages: the
 * `load`, `compile` and `inject` stages.
 *
 * The `load` stage recognizes mods in the `mods/` directory, and loads their
 * metadata.
 *
 * The `compile` stage loads all database entries from the mods, and organizes
 * them in a way that they will not conflict with each other. This also 
 * corrects any reference to database entries in event pages. This is where
 * most conflicts are caught.
 *
 * The `inject` stage takes the model delta created by the `compile` stage and
 * applies it to the game.
 */
function ModLoader() {
    throw new Error('This is a static class');
}

/**
 * A list of all of the currently loaded mods.
 *
 * @type {Array.<Mod>}
 */
ModLoader.mods = [];

/**
 * Load all mods into the mod loader.
 */
ModLoader.load = function() {
    // Attempt to create a mod folder if it doesn't exist
    if (!fs.existsSync(MODS_DIR)) fs.mkdirSync(MODS_DIR);

    fs.readdirSync(MODS_DIR)
        .map(filename => path.resolve(MODS_DIR, filename))
        .forEach(modPath => {
            const mod = new Mod(modPath);

            // load files
            if (!mod.loadFs()) {
                console.warn(`Did not load ${modPath} because it is not a supported mod format.`);
                return;
            }

            // load manifest
            try {
                if (!mod.loadMeta()) {
                    console.warn(`Did not load ${modPath} because it does not contain a mod.json`);
                    return;
                }
            } catch (err) {
                console.error(`Failed to load mod ${modPath} because of invalid JSON: ${err.message}`);
                return;
            }

            // check if our id exists
            if (!mod.id)
                console.error(`Failed to load mod ${modPath} because it is missing an id.`);

            // check if a mod with the same id already exists
            if (this.mods.some(otherMod => mod.id === otherMod.id))
                console.error(`Failed to load mod ${modPath} because of conflicting id "${mod.id}"`);

            this.mods.push(mod);
        });
}

/**
 * Injects a Steam stub script so mods do not interfere with Steam, and allows
 * use in the NW.js sdk.
 */
ModLoader.bypass = function() {
    window.PluginManager = class extends window.PluginManager {
        static setup(plugins) {
            // call super function
            super.setup(plugins);

            // stub out steamworks
            const url = 'js/bypass.js';
            const script = window.document.createElement('script');

            script.type = 'text/javascript';
            script.src = url;
            script.onerror = this.onError.bind(this);
            script._url = url;

            window.document.body.appendChild(script);
        }
    }
}

export default ModLoader;
