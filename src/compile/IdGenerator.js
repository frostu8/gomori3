/**
 * Takes a list of ids, and allows the efficient generation of new, 
 * unallocated ids
 */
class IdGenerator {
    constructor(allocated) {
        // For some reason, we have to pass a sorting callback to Array.sort(),
        // because you don't deserve nice things.
        this._allocated = allocated.sort((a, b) => a - b);

        // Initial value of last_id is based off of the first id of each 
        // database model in RPGMV minus one. The first id of database models
        // is always 1, so this value starts as zero.
        this._last_id = 0;
    }

    /**
     * Returns a new id from the pool.
     *
     * This depends on this.allocated to be sorted properly.
     */
    new_id() {
        // Assuming that the list is sorted (which it should be), we can take
        // the next id from the list and compare it with our next id
        while (this._allocated.length > 0) {
            // set last id to test
            this._last_id++;

            // get next id
            let next_id = this._allocated[0];
            this._allocated = this._allocated.slice(1);

            // doesn't hurt to test
            if (next_id < this._last_id) throw new Error('improperly sorted id list!');

            if (next_id > this._last_id) {
                // this id (should) is not in the list!
                return this._last_id;
            }
        }

        // if we run out of allocated values, then just start returning new ids
        return this._last_id++;
    }
}
