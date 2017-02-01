#!/usr/bin/env node
var fs = require('fs');

if(fs.existsSync('platforms/android')) {
    const PERMISSIONS_TO_REMOVE = ['RECORD_AUDIO|MODIFY_AUDIO_SETTINGS|WRITE_EXTERNAL_STORAGE|READ_PHONE_STATE'],
        MANIFEST = 'platforms/android/AndroidManifest.xml';

        manifestLines = fs.readFileSync(MANIFEST).toString().split('\n'),
        newManifestLines = [];

    const permissions_regex = PERMISSIONS_TO_REMOVE.join('|');

    manifestLines.forEach(function(line) {
        if(!line.match(permissions_regex)) {
            newManifestLines.push(line);
        }
    });
    fs.writeFileSync(MANIFEST, newManifestLines.join('\n'));
}
