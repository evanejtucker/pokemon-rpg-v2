$(document).ready(function() {

// global Variables
// -----------------------------------------------------------------------------------
var allPokemon = [];

// Functions
// -----------------------------------------------------------------------------------

    // hits the api and returns a list of every pokemom, also adds the names to the datalist
    var getAllPokemon = function() {
        console.log('getting pokemon...')
        allPokemon = [];
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
                for (var i=0; i<data.results.length; i++) {
                    allPokemon.push(data.results[i].name);
                }
                addDataListOption(allPokemon);   
            }
        });
    }

    // hits the backend api and returns one pokemon object
    var searchPokemon = function(searchTerm) {
        resetDex();
        var queryUrl = '/api/pokemon/name/' + searchTerm + '/';
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
                updatePokedex(data);
            }
        });
    }

    // get the list of pokemon and create a datalist option for each
    var addDataListOption = function(pokemonList) {
        for (var i=0; i<pokemonList.length; i++) {
            var newOption = $("<option>");
            newOption.attr('value', pokemonList[i]);
            $('#pokemon-list').append(newOption);
        } 
    }

    // add datalist options
    var addDataList = function(inputLength) {
        if (inputLength > 1) {
            $('input#pokemonSearch').attr('list', 'pokemon-list');
        } else {
            $('input#pokemonSearch').removeAttr('list');
        }    
    }

    var resetDex = function() {
        $('img.pokeImage').attr('src', 'images/loading-bulbasaur.gif');

    }

    var updatePokedex = function(pokeObject) {
        $('.main-screen').html('');
        // add pokemon image
        var pokeImage = $('<img>');
        pokeImage.attr('src', pokeObject.sprites.front_default);
        pokeImage.attr('alt', pokeObject.name);
        pokeImage.addClass('pokeImage');
        $('.main-screen').html(pokeImage);

        // add pokemon ID
        pokeId = $('<div>');
        pokeId.text(pokeObject.id);
        pokeId.addClass('pokeId');
        $('.id-screen').html(pokeId);
    }

    


// Main Process
// -----------------------------------------------------------------------------------
    
    getAllPokemon();    

    $('#pokemonSubmit').on('click', function() {
        event.preventDefault();
        var searchTerm = $('#pokemonSearch').val();
        searchPokemon(searchTerm);
    });

    $('input#pokemonSearch').keyup(function(event) {
        var inputLength = $(this).val().length;
        addDataList(inputLength);
    });

// $(document).ready closing tag
});
// -----------------------------