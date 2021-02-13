import DirModFs from './fs/DirModFs';
import ZipModFs from './fs/ZipModFs';

const path = require('path');
const fs = require('fs');

/**
 * A class representing a single mod.
 */
class Mod {
    /**
     * Create a new mod, using a file or folder as the base of the mod.
     *
     * @param {string} modPath - The path to the mod file/folder.
     */
    constructor(modPath) {
        this.path = modPath;
        this.modFs = null;

        this.meta = null;
    }

    /**
     * Selects a mod filesystem.
     *
     * @returns {boolean} - If a mod filesystem was successfully selected.
     */
    loadFs() {
        const stats = fs.statSync(this.path);

        if (stats.isDirectory()) {
            // use directory mod fs if this is a directory
            this.modFs = new DirModFs(this.path);
        } else if (stats.isFile() && path.extname(this.path) === '.zip') {
            // use zip mod fs if this is a zip file
            this.modFs = new ZipModFs(this.path);
        } 

        return !!this.modFs;
    }

    /**
     * Loads the meta from the modFs. This will throw if there is an error in
     * the JSON.
     *
     * @returns {boolean} - If a mod.json was located.
     */
    loadMeta() {
        const metaFile = this.modFs.getFile('mod.json');

        if (metaFile) {
            this.meta = JSON.parse(metaFile.toString());
        }

        return !!this.meta;
    }

    /**
     * The unique identifier of the mod.
     */
    get id() {
        return this.meta?.id;
    }
}

export default Mod;
