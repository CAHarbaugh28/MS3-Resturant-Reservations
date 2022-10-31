'use strict'
class StringHelpers {
    static isNullOrWhitespace( input ) {
        return !input || !input.trim();
    }
    static isNull( input ) {
        return input === null;
    }
}

module.exports = StringHelpers;