const express = require("express")
const cors = require("cors")
const monk = require("monk")
const app = express()


const db = monk('mongodb+srv://Halid:Mongo4534.@cluster0.7e6me.mongodb.net/score?retryWrites=true&w=majority')
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
    score
        .find()
        .then(score => {
            res.json(score)
            console.table(score)
        }).catch((err) => {
            console.log("Fehler:" + err)
            next()
        });
})


const createScore = ("/", (req, res, next) => {


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
)

app.post('/', createScore)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))


