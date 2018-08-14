$(document).ready(function() {

// global Variables
// -----------------------------------------------------------------------------------


// Functions
// -----------------------------------------------------------------------------------

var searchPokemon = function(searchTerm) {
    var queryUrl = '/api/pokemon/name/' + searchTerm + '/';
    console.log(queryUrl)
    $.get({
        url: queryUrl,
    }).done(function(data) {
        console.log('got something back');
        console.log(data);
    }).fail(function(err){
        if (err) {
            console.log('something went wrong');
        }
    });
}

// Main Process
// -----------------------------------------------------------------------------------
    
$('#pokemonSubmit').on('click', function() {
    event.preventDefault();
    var searchTerm = $('#pokemonSearch').val();
    searchPokemon(searchTerm);
});

// $(document).ready closing tag
});
// -----------------------------