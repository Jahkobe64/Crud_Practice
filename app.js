const express = require('express');
const app = express();
const { v4: uuid } = require('uuid');
const methodOverride = require('method-override');

app.use(methodOverride('_method'));
app.use(express.urlencoded({extended : true}));
app.set('view engine', 'ejs');

let characters = [
    {
        id: uuid(),
        name: "Luke Skywalker",
        Lightsaber: "Yes",
        Lightsabercolor: "green"
    },
    {
        id: uuid(),
        name: "Anakin Skywalker",
        Lightsaber: "Yes",
        Lightsabercolor: "red"
    },
    {
        id: uuid(),
        name: "Yoda",
        Lightsaber: "Yes",
        Lightsabercolor: "green"
    }

];

app.get('/starwars', (req, res) => {
    res.render("home.ejs", {characters})
});

app.get('/starwars/new' , (req, res) => {
    res.render("new.ejs");
})

app.post('/starwars', (req, res) => {
    console.log(req.body);
    const newCharacter = req.body;
    characters.push({...newCharacter, id: uuid()});
    console.log(characters);
    res.redirect("/starwars");
})

app.get('/starwars/:id', (req, res) => {
    const {id} = req.params;
    const foundCharacter = characters.find(c => c.id === id);
    res.render("show.ejs", {foundCharacter});
})

app.get('/starwars/:id/edit', (req, res) => {
    const {id} = req.params;
    const character =  characters.find(c => c.id === id);
    res.render('edit.ejs', {character});
})

app.patch('/starwars/:id', (req, res) => {
    const {id} = req.params;
    const {name, Lightsaber, Lightsabercolor} = {...req.body};
    const character =  characters.find(c => c.id === id);
    character.name = name;
    character.Lightsaber = Lightsaber;
    character.Lightsabercolor = Lightsabercolor;
    res.redirect('/starwars')
})

app.delete('/starwars/:id', (req, res) => {
    const {id} = req.params;
    characters = characters.filter(c => c.id !== id);
    res.redirect('/starwars');
})

app.listen('3000', (req, res) => {
    console.log('listening on port 3000')
})