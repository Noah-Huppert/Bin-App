//Code from: https://github.com/rxaviers/cldr
/* Setup namespace */
var binApp = {};
binApp.helpers = {};

binApp.helpers.merge = {};

binApp.helpers.merge.do = function(){
  var destination = {},
      sources = [].slice.call( arguments, 0 );
  sources.forEach(function( source ) {
      var prop;
      for ( prop in source ) {
          if ( prop in destination && Array.isArray( destination[ prop ] ) ) {

              // Concat Arrays
              destination[ prop ] = destination[ prop ].concat( source[ prop ] );

          } else if ( prop in destination && typeof destination[ prop ] === "object" ) {

              // Merge Objects
              destination[ prop ] = binApp.helpers.merge.do( destination[ prop ], source[ prop ] );

          } else {

              // Set new values
              destination[ prop ] = source[ prop ];

          }
      }
  });
  return destination;
};
module.exports = binApp.helpers.merge;
