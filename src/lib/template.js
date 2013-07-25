#!/usr/bin/env node

/**
 *
 * @param param.from
 * @parma param.dest
 * @param param.data
 *
 */
exports.execute = function(param){

    var mustache = require('mustache'),
        ENCODING = 'utf-8',
        fs = require('fs');

    var html = mustache.to_html(fs.readFileSync(param.from, ENCODING), param.data);

    fs.writeFileSync(param.dest, html);

    console.log( param.dest + '\'s saved!');
}

