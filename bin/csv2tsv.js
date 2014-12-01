#!/usr/bin/env node
var fs = require('fs');
var parse = require('csv-parse');
var transform = require('stream-transform');

var parser = parse({delimiter:','});
var input = process.argv.length == 3 ? fs.createReadStream(process.argv[2]) : process.stdin;
var transformer = transform(function(records, cb){
  cb(null, records.join('\t') + '\n');
});
input.pipe(parser).pipe(transformer).pipe(process.stdout);
