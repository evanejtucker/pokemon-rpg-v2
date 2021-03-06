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
                noResults();
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

        $('#large-main-screen').css('background-image', "url('/images/pokedex-backgrounds/grass-background.png')");

        // add loading gif before search results appear
        var loadingImage = $("<img>")
        loadingImage.addClass('pokeImage');
        loadingImage.attr('src', 'images/loading-bulbasaur.gif');
        $('.main-screen').html(loadingImage);

        // clear pokemon name
        $('.pokeName').html('Loading...');
        // clear height and weight
        $('.pokeDataTable').html('')
        // clear id
        $('.pokeId').html('');
    }

    var updatePokedex = function(pokeObject) {

        $('.main-screen').html('');
        $('#large-main-screen').css('background-image', "url('/images/pokedex-backgrounds/search-background.png')")
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
        checkPokeIdLength();

        // add pokemon Name
        $('.pokeName').html(pokeObject.name);

        // add pokeData
        var newTRow = $('<tr>')
        var pokeWeight = $('<td>').text('height: ' + pokeObject.height);
        var pokeHeight = $('<td>').text('weight: ' + pokeObject.weight);
        newTRow.append(pokeWeight, pokeHeight);
        $('.pokeDataTable').append(newTRow);

        // add pokeTypes
        $('.pokeType-1').css('background-image', "url('/images/type-symbols/"+ getPokeType(pokeObject)[0] +"-type.png')");
        $('.pokeType-2').css('background-image', "url('/images/type-symbols/"+ getPokeType(pokeObject)[1] +"-type.png')");
    }

    // if the Id is longer than 3 digits,
    // decrease font size so it fits in the div
    var checkPokeIdLength = function() {
        var idNum = $('.pokeId').html();
        if( idNum.length > 3) {
            $('.pokeId').css('font-size', '1em');
        } else {
            $('.pokeId').css('font-size', '1.3em');
        }
    }

    // if there are no search results
    // update the dex to represent this
    var noResults = function() {
        var undefinedImage = $("<img>")
        undefinedImage.addClass('pokeImage');
        undefinedImage.attr('src', 'images/undefined-psyduck.gif');
        $('.main-screen').html(undefinedImage);

        $('.pokeName').html("No Results Found");
    }

    // returns an array of all the searched pokemons types
    var getPokeType = function(pokeObject) {
        var types = []
        for (var i=0; i<pokeObject.types.length; i++) {
            types.push(pokeObject.types[i].type.name);
        }
        if (types.length === 1) {
            types.push(types[0]);
        }
        return types;
    }

    // cycle through pokemon index's and updates the pokedex
    function cyclePokemon(cycleDirection, currentId) {

        if (!currentId) {
            currentId = 0;
        }

        if(cycleDirection === 'prev') {
            newId = parseInt(currentId) - 1;
            if (newId === -1  || newId === 0) {
                newId = 802;
            }
            searchPokemon(newId);
        } else if (cycleDirection === 'next') {
            newId = parseInt(currentId) + 1;
            if (newId === 803) {
                newId = 1;
            }
            searchPokemon(newId);
        }
        
    }

    


// Main Process
// -----------------------------------------------------------------------------------
    
    getAllPokemon();    

    $('#pokemonSubmit').on('click', function() {
        event.preventDefault();
        var searchTerm = $('#pokemonSearch').val();
        resetDex();
        searchPokemon(searchTerm);
    });

    $('input#pokemonSearch').keyup(function(event) {
        var inputLength = $(this).val().length;
        addDataList(inputLength);
    });

    $('.cycleBtn').on('click', function() {
        var direction = $(this).attr('direction');
        var id = $('.pokeId').html();
        cyclePokemon(direction, id);
    })

// $(document).ready closing tag
});
// -----------------------------