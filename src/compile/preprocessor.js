const DIRECTIVE_START = '<!';
const DIRECTIVE_END = '>';

const DIRECTIVE_DIVIDER = ':';

/**
 * Parse preprocessor directives.
 *
 * The parser reads each line, and if a preprocessor directive is found 
 * (`<! ... >`), it includes it in the resulting object.
 *
 * @param {string} str - A note string to parse.
 *
 * @result {Object.<string, string>} - The resulting parsed object.
 */
function parse(str) {
    let result = {};

    let next = str.indexOf(DIRECTIVE_START);

    while (next >= 0) {
        // find end
        let end = str.indexOf(DIRECTIVE_END, next);

        if (end >= 0) {
            // substring beginning and end
            let directive = str.slice(next + DIRECTIVE_START.length, end) .trim();

            // find divider
            let divIdx = directive.indexOf(DIRECTIVE_DIVIDER);

            if (divIdx >= 0) {
                // a divider, get the value.
                let key = directive.slice(0, divIdx).trim();
                let value = directive.slice(divIdx + DIRECTIVE_DIVIDER.length).trim();

                result[key] = value;
            } else {
                // no divider, so treat this like a raised flag.
                result[directive] = true;
            }

            // set next iteration up
            next = str.indexOf(DIRECTIVE_START, end + DIRECTIVE_END.length);
        } else {
            // unterminated tag! for now we can just ignore it, but in the
            // future this would be nice to say.
            break;
        }
    }

    return result;
}

/**
 * Parses preprocessor directives from RPGMV models, placing them into a field
 * called "preprocessor." This operation is done **in place**.
 *
 * @param {Array.<Object>} objs - A list of RPGMV models.
 */
function inject(objs) {
    objs.forEach(model => {
        // if the model is null (typically the first element of an RPGMV model)
        // do not do anything to it
        if (!model) return;

        // pass the notes through a parser
        model.preprocessor = parse(model.note);
    });
}

export { parse, inject };
