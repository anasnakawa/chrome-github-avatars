// generate search url for a 
// list of github usernames
// ------------------------
var generateUrl = function( array, pagination ) {
    for( var i in array ) {
        array[ i ] = 'user%3A' + array[ i ];
    }
    return url = 'https://api.github.com/search/users?q=' + array.join( '+' ) + ( pagination ? '&per_page=' + pagination : '' );
}
 
// drop duplicated items from an array
// -----------------------------------
, unique = function( array ) {
    var temp = {};
    for( var i in array ) {
        temp[ array[i] ] = {};
    }
    return Object.keys( temp );
}
 
// for debugging
// print all users gravatars into DOM
// ----------------------------------
, printImages = function( items ) {
    for( var item in items ) {
        $('<img />').attr( 'src', items[ item ].avatar_url ).appendTo('body');
    }
}
 
// get user names from github feed page
// ------------------------------------
, users = unique( $('.news .alert').not('.push').find('.title a:eq(0)').map(function() {
    var username = $(this).text();
    // store username
    $(this).closest('.alert').attr('data-username', username);
    return username;
}).toArray() );
 
// query github API
// ----------------
$.get( generateUrl( users ), function( data ) {
    printImages( data.items ); 
});