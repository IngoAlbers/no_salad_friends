#!/usr/bin/env node

// Adds lines to the Android Manifest if they are not already there

const LINES_TO_ADD = [
    {
        text: ' android:installLocation="auto"',
        after: '<manifest'
    }
];

const MANIFEST = 'platforms/android/AndroidManifest.xml';

var fs = require('fs'),
  manifestText = fs.readFileSync(MANIFEST).toString();

LINES_TO_ADD.forEach(function(lineToAdd) {
  if(manifestText.indexOf(lineToAdd.text) === -1) {
    manifestText = manifestText.replace(lineToAdd.after, lineToAdd.after + lineToAdd.text);
  }
});

fs.writeFileSync(MANIFEST, manifestText);