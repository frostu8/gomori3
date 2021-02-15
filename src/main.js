import ModLoader from './ModLoader';
import * as preprocessor from './compile/preprocessor';

try {
    // inject bypass scripts
    ModLoader.bypass();

    // load mods
    ModLoader.load();
} catch (err) {
    alert(`GOMORI encountered a critical error: ${err.stack}`);
}

// inject some testing functions
ModLoader.p_parse = preprocessor.parse;
ModLoader.p_inject = preprocessor.inject;

export default ModLoader;
