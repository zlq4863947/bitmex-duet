const glob = require("glob");
const path = require( 'path' );

var args = process.argv.splice(2);
if(args.length != 0) {
    name = args[0];
}

glob.sync(`dist/bitmex-duet-*.js`).forEach( function( file ) {
    require(path.resolve(file));
});