'use strict';

// cahcing some jQuery references
// ------------------------------
var $news = $('.news')

// hacking into jQuery ajax to be notified 
// once the pagination ajax completed
, onPaginationComplete = function() {
    getAvatarsForUsers( function( data ) {
        printImages( data.items );
    });
}

// generate search url for a 
// list of github usernames
// ------------------------
, generateUrl = function( array, pagination ) {
    for( var i in array ) {
        array[ i ] = 'user%3A' + array[ i ];
    }
    return '//api.github.com/search/users?q=' + array.join( '+' ) + ( pagination ? '&per_page=' + pagination : '' );
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

// get new users
// -------------
, prepareNewUsersOnPage = function() {
    var users = $news.find('.alert').not('.push, .public, .issues_comment, .avatar-ready').find('.title a:eq(0)').map(function() {
        var $self = $(this)
        , username = $self.text();
        
        $self.addClass(username);

        $self.parent().addClass('avatar-container')
        
        // store username
        $self.closest('.alert')
            .attr('data-username', username);
        
        return username;
    }).toArray();

    return unique( users );
}
 
// print all users gravatars into DOM
// ----------------------------------
, printImages = function( items ) {
    for( var item in items ) {
        var $img = $('<img />').addClass('github-avatar').attr( 'src', items[ item ].avatar_url );

        $('.alert:not(.avatar-ready,.issues_opened) .' + items[ item ].login ).each(function() {
            var $self = $(this);

            $img.clone().insertBefore( $self );
            $self.closest( '.alert' ).addClass('avatar-ready');
        });
    }
}

, getAvatarsForUsers = function( callback ) {
    $.get( generateUrl( prepareNewUsersOnPage(), 31 ), callback );
}

// tricking first element in feed
// ------------------------------
, $first = $('.news .alert').eq(0)
, $clone;

$first.clone().insertBefore($first);
$clone = $first.prev();
$first.css('border', 'none');
$clone.css({
      height: 0
    , padding: 0
});

 
// query github API
// ----------------
getAvatarsForUsers( function( data ) { 
    printImages( data.items ); 
});

// hacking into pagination calls
// -----------------------------
// since we don't have access to github's 
// jQuery object, we'll do a workaround here
var buttonSelector = '.js-events-pagination, .ajax-pagination-btn';
$news.on('click', buttonSelector, function() {
    
    console.info('waiting for a pagination to complete');

    var id = setInterval(function() {
        var $button = $( buttonSelector );
        if( $button.closest( '.loading' ).length === 0 ) {
            clearInterval(id);
            onPaginationComplete();
            console.info('pagination completed');
        } else {
            console.info('waiting...');
        }
        
    }, 500);
});

// analytics
// ---------
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-72567125-1']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();