const express = require("express")
const cors = require("cors")
const monk = require("monk")
const app = express()


const db = monk('mongodb+srv://Halid:4534Mongo.@cluster0.7e6me.mongodb.net/score?retryWrites=true&w=majority')
db.then(() => {
    console.log("connected")
}
).catch((err) => {
    console.log("database connection failed")
    console.log(err)
})

const score = db.get("score")


app.enable('trust proxy');

app.use(cors())
app.use(express.json())


app.get("/score", (req, res) => {

    res.json({
        message: "Miyaw hi haloo asd heyyy🐈"
    })
})



app.get("/", (req, res, next) => {
    console.log("HI!")

    score
        .find({})
        .then(score => {
            console.log("HI wieder!")
            res.json(score)
            console.table(score)
        }).catch((err) => {
            console.log("Fehler:" + err)
            next()
        });



})


const createScore = (req, res, next) => {


    const data = {
        PlayerName: req.body.playerName.toString(),
        GameScore: req.body.score.toString(),
        Created: new Date()
    }

    score
        .insert(data)
        .then(createdScore => {
            res.json(createdScore)
        }).catch(next);



}


app.post('/', createScore)

app.use((error, req, res, next) => {
    res.status(500);
    res.json({
        message: error.message
    });
});

const PORT = process.env.PORT || 5000;


const server = app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))

server.timeout = 1000