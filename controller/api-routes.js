
module.exports = (app, request)=> {
    // get pokemon by name or id
    app.get('/api/pokemon/name/:id', (req, res, next)=> {
        console.log("parameter: " + req.params);
        var pokemon;
        var queryUrl = 'https://pokeapi.co/api/v2/pokemon/' + req.params.id + "/";
        console.log(queryUrl);
        request({
            uri: queryUrl
        }, function(error, response, body) {
            console.log('requesting...');
            if (!error && response.statusCode === 200) {
                pokemon = JSON.parse(body);
                console.log('done');
                res.send(pokemon)
            } else {
                console.log('something went wrong');
                // if no results are found
                res.send('error');
            }      
        });
    });

    app.get('/api/pokemon/all', (req, res, next)=> {
        var pokemon;
        var queryUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=949';
        console.log(queryUrl);
        request({
            uri: queryUrl
        }, function(error, response, body) {
            console.log('requesting...');
            if (!error && response.statusCode === 200) {
                pokemon = JSON.parse(body);
                console.log('done');
                res.send(pokemon)
            } else {
                console.log('something went wrong');
                // if no results are found
                res.send('error');
            }      
        });
    });

    // get pokemon move by name or id
    app.get('/api/pokemon/move/:id', (req, res, next)=> {
        console.log("parameter: " + req.params);
        var move;
        var queryUrl = 'https://pokeapi.co/api/v2/pokemon/' + req.params.id + "/";
        console.log(queryUrl);
        request({
            uri: queryUrl
        }, function(error, response, body) {
            console.log('requesting...');
            if (!error && response.statusCode === 200) {
                move = JSON.parse(body);
                console.log('done');
                res.send(move)
            } else {
                console.log('something went wrong');
                // if no results are found
                res.send('error');
            }
            
        });
    });

    
};


