/**
 * The Gomori Mod Loader, the supervisor of all modding activities.
 *
 * @class
 */
ModLoader = function() {
    throw new Error('This is a static class');
}

/**
 * A list of all of the currently loaded mods.
 *
 * @type {Array.<Mod>}
 */
ModLoader.mods

/**
 * Load all mods into the mod loader.
 */
ModLoader.load = function() {
}

/**
 * Injects a Steam stub script so mods do not interfere with Steam, and allows
 * use in the NW.js sdk.
 *
 * @param {Window} window - The browser context window, unavailable to us in 
 * Node context.
 */
ModLoader.bypass = function(window) {
    window.PluginManager = class extends window.PluginManager {
        static setup(plugins) {
            // call super function
            super.setup(plugins);

            // stub out steamworks
            const url = 'gomori/bypass.js';
            const script = window.document.createElement('script');

            script.type = 'text/javascript';
            script.src = url;
            script.onerror = this.onError.bind(this);
            script._url = url;

            window.document.body.appendChild(script);
        }
    }
}

module.exports = ModLoader;
