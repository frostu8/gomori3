import ModFs from './ModFs'

const AdmZip = require('./js/libs/adm-zip/adm-zip');

/**
 * A `ModFs` implementation for zip files.
 */
class ZipModFs extends ModFs {
    constructor(zipPath) {
        super();

        this.zip = new AdmZip(zipPath);
    }

    getFile(filePath) {
        return this.zip.getEntry(filePath)?.getData();
    }

    getFolder(folderPath) {
        const folder = this.zip.getEntry();

        if (folder && folder.isDirectory) {
            return this.zip.getEntryChildren(folder).map(entry => entry.name);
        } else {
            return null;
        }
    }
}

export default ZipModFs;
