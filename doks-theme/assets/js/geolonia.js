( function( $ ) {

  if ( $( '.geolonia-styles' ).length ) {
    var imgUrl = 'https://styles.geolonia.com/:style/screenshot.png'
    $.ajax( { url: 'https://api.geolonia.com/v1/styles' } )
      .done( function( data ) {
        for ( var key in data ) {
          var style = $( '<div class="style"></div>' )
          var img = $('<div><img src="' + imgUrl.replace( ':style', key ) + '" /></div>')
          var name = $('<div>' + key + '</div>')
          style.append( img )
          style.append( name )

          $( '.geolonia-styles' ).append( style )
        }
      } )
  }

  if ( document.querySelector( '#my-map-09' ) ) {
    var map = new geolonia.Map( document.querySelector( '#my-map-09' ) );
    setInterval( function() {
      map.rotateTo( map.getBearing() + 90 )
    }, 3000 );
  }

  var msl = document.getElementById('marker-symbol-list');
  if (msl) {
    console.log('loading marker symbol list...');
    var spritesheet = 'https://cdn.geolonia.com/sprites/basic@2x.png';
    fetch('https://cdn.geolonia.com/sprites/basic@2x.json')
      .then(function (body) { return body.json(); })
      .then(function (body) {
        var keys = Object.keys(body).filter(function(key) {
          return !key.match(/^(default_|highway-|national-|prefectural-).*/);
        });
        keys.sort();

        var $tbody = $(msl).find('tbody');

        for (const key of keys) {
          var def = body[key];
          var width = def.width;
          var height = def.height;
          var transform = '';
          if (def.pixelRatio > 1) {
            transform = `transform: scale(${1 / def.pixelRatio});`;
          }
          var image = `<div style="width: ${width}px; height: ${height}px; background: url(${spritesheet}) -${def.x}px -${def.y}px; margin: 0 auto; ${transform}"></div>`;
          $tbody.append(`<tr><td><code>${key}</code></td><td>${image}</td></tr>`);
        }
      });
  }

} )( jQuery );
