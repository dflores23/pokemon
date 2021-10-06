const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const pokemon = require('./models/pokemon.js');


app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());


// GET all pokemon
app.get('/', (req, res) => {
    res.render('index', {data: Pokemon});
});
// GET pokemon form to enter new pokemon data
app.get('/new', (req, res) => {
    res.render('new');
});
// GET pokemon form to edit pokemon data
app.get('/:id/edit', (req, res) => {
    let Pokemon = pokemon.find(poke => {
        return poke.id === req.params.id;
    })

    res.render('edit', {data: Pokemon});
});
// GET pokemon by id
app.get('/:id', (req, res) => {
    console.log('this route works');
    let Pokemon = pokemon.find(pokemon => {
        return pokemon.id === req.params.id;
    })
    if (Pokemon) {
        res.render('show', {data: Pokemon});
    } else {
        res.send("pokemon does not exist");
    }
    ;
});
// POST new pokemon data
app.post('/', (req, res) => {
    pokemon.push(req.body);
    res.render('index', {data: pokemon});
});
// PUT update pokemon data by id
app.put("/:id", (req, res) => {
    console.log(req.body);
    let Pokemon = pokemon.find(pokemon => {
        return pokemon.id === req.params.id;
    })
    if (Pokemon) {
        let updatedPokemon = Object.assign(Pokemon, req.body);
        pokemon[Pokemon] = updatedPokemon;
        res.redirect(`/${updatedPokemon.id}`)
    } else {
        res.send('pokemon does not exist');
    }
    ;

});
// DELETE delete pokemon by id
app.delete('/:id', (req, res) => {
    console.log(req.body);
    let Pokemon = pokemon.find(pokemon => {
        return pokemon.id === req.params.id;
    })
    if (Pokemon) {
        const pokemonIndex = pokemon.indexOf(Pokemon)
        pokemon.splice(pokemonIndex, 1);
        res.render('index', {data: pokemon})
    } else {
        res.send('pokemon does not exist');
    }
    ;

});


app.listen(port, () => {
    console.log(`app is listening on port: ${port}`);
});