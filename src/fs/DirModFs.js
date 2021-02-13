import ModFs from './ModFs'

const path = require('path');
const fs = require('fs');

/**
 * `ModFs` implementation for a transparent directory.
 */
class DirModFs extends ModFs {
    constructor(modPath) {
        super();

        this.path = modPath;
    }

    getFile(filePath) {
        try {
            // try to read file
            return fs.readFileSync(path.resolve(this.path, filePath));
        } catch (_) {
            // return null if it couldn't be read
            return null;
        }
    }

    getFolder(folderPath) {
        try {
            // try to read directory
            return fs.readdirSync(path.resolve(this.path, folderPath));
        } catch (_) {
            // return null if it couldn't be read
            return null;
        }
    }
}

export default DirModFs;
