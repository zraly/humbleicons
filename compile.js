'use strict';

var SVGSpriter = require('svg-sprite'),
    path = require('path'),
    fs = require('fs'),
    File = require('vinyl'),
    glob = require('glob'),
    spriter = new SVGSpriter({
        dest: 'out',
        mode: {
            css: {
                render: {
                    css: true
                }
            }
        }
    }),
    cwd = path.resolve('src/icons');

// Find SVG files recursively via `glob`
glob.glob('*.svg', { cwd: cwd }, function (err, files) {
    files.forEach(function (file) {

        // Create and add a vinyl file instance for each SVG
        spriter.add(new File({
            path: path.join(cwd, file),                      // Absolute path to the SVG file
            base: cwd,                                       // Base path (see `name` argument)
            contents: fs.readFileSync(path.join(cwd, file))  // SVG file contents
        }));
    })

    spriter.compile(function (error, result, data) {
        for (var type in result.css) {
            fs.mkdirSync(path.dirname(result.css[type].path), { recursive: true });
            fs.writeFileSync(result.css[type].path, result.css[type].contents);
        }
    });
});