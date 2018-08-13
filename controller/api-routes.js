
module.exports = (app, request)=> {
    app.get('/api/pokemon/:id', (req, res, next)=> {
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
                // res.json(pokemon); 
                res.render('pokedex', {pokemon: pokemon});
                // console.log(__dirname)
                console.log('done');
            }
        });
    });
};


