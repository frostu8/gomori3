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
        this.modFs = this._selectFs(modPath);

        this.meta = null;
    }
    
    /**
     * Constructs a mod and loads it.
     */
    static load(modPath) {
        const mod = new Mod(modPath);
        mod.loadMeta();
        return mod;
    }

    /**
     * Loads the meta from the modFs.
     */
    loadMeta() {
        const metaFile = this.modFs.getFile('mod.json');

        if (!metaFile) throw new Error('mod.json not found!');

        this.meta = JSON.parse(metaFile.toString());
    }

    /** @private */
    _selectFs(modPath) {
        const stats = fs.statSync(modPath);

        // use directory mod fs if this is a directory
        if (stats.isDirectory()) return new DirModFs(modPath);
        // use zip mod fs if this is a zip file
        if (stats.isFile() && path.extname(modPath) === '.zip') return new ZipModFs(modPath);

        // throw if there was no fs found
        throw new Error(`Unsupported mod format: ${modPath}`);
    }

    /**
     * The unique identifier of the mod.
     */
    get id() {
        return this.meta?.id;
    }
}

export default Mod;
