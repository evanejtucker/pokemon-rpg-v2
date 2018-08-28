
module.exports = (app)=> {
    app.get('/', (req, res, next)=> {
        res.render('pokedex');
    });

    app.get('/pokedex', (req, res, next)=> {
        res.render('pokedex',  {name: 'Evan'});
    });
};