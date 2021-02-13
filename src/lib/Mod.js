/**
 * A class representing a single mod.
 */
class Mod {
    /**
     * Create a new mod, using a file or folder as the base of the mod.
     *
     * @param {string} path - The path to the mod file/folder.
     */
    constructor(path) {
        this.path = path;
        this.meta = null;
    }

    /**
     * The unique identifier of the mod.
     */
    get id() {
        return this.meta?.id;
    }
}

export default Mod;
