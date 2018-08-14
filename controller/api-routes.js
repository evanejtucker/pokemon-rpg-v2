
module.exports = (app, request)=> {
    // get pokemon by name or id
    app.get('/api/pokemon/name/:id', (req, res, next)=> {
        console.log(req.params);
        var pokemon;
        var queryUrl = 'https://pokeapi.co/api/v2/pokemon/' + req.params.id + "/";
        console.log(queryUrl);
        console.log('waiting ...')
        request({
            uri: queryUrl
        }, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                pokemon = JSON.parse(body);
                console.log('done');
                res.send(pokemon)
            }
        });
    });

    // get pokemon move by name or id
    app.get('/api/pokemon/move/:id', (req, res, next)=> {
        console.log(req.params);
        var move;
        var queryUrl = 'https://pokeapi.co/api/v2/pokemon/' + req.params.id + "/";
        console.log(queryUrl);
        // console.log('waiting ...')
        request({
            uri: queryUrl
        }, function(error, response, body) {
            console.log('requesting...');
            console.log('error ' + error);
            console.log('response ' + response);
            console.log('body ' + body);
            if (!error && response.statusCode === 200) {
                move = JSON.parse(body);
                console.log('done');
                res.send(move)
            }
            res.send('well shit')
        });
    });

    
};


