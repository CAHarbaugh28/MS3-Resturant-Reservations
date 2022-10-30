'use strict'
class StringHelpers {
    static isNullOrWhitespace( input ) {
        return !input || !input.trim();
    }
}

module.exports = StringHelpers;