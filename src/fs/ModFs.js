/**
 * An accessor to a mod's contents. Calls to extenders of this class must 
 * should use posix-style paths.
 */
class ModFs {
    /**
     * Get the contents of a mod file.
     *
     * @param {string} path - The path of the mod file.
     *
     * @returns {(Buffer|null)} - The file's contents, or null if it doesn't
     * exist.
     */
    getFile(path) {
        throw new Error('Not implemented!');
    }

    /**
     * Get a list of all of the files in a folder. This should return the
     * basenames of the folder's contents.
     *
     * @param {string} path - The path of the mod folder.
     *
     * @return {(Array.<string>|null)} - The folder's contents, or null if it
     * doesn't exist.
     */
    getFolder(path) {
        throw new Error('Not implemented!');
    }
}

export default ModFs;
