$(document).ready(function() {

// global Variables
// -----------------------------------------------------------------------------------


// Functions
// -----------------------------------------------------------------------------------

    // hits the backend api and returns one pokemon object
    var searchPokemon = function(searchTerm) {
        // var queryUrl = '/api/pokemon/name/' + searchTerm + '/';
        var queryUrl = '/api/pokemon/all';
        $.get({
            url: queryUrl,
        }).fail(function(err){
            if (err) {
                console.log('something went wrong');
                console.log(err);
            }     
        }).done(function(data) {
            // if the data retuns 'error', exit the function
            if (data === "error") {
                return console.log('no reuslts found');
            } else {
                console.log(data);
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