const express = require("express")
const cors = require("cors")
const monk = require("monk")
const app = express()

// const PORT = "https://tryithalid.herokuapp.com//"

const db = monk(process.env.MONGODB_URI || "localhost/score")
const score = db.get("score")


app.enable('trust proxy');

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.json({
        message: "Miyaw aspist heyyo hey🐈"
    })
})



app.get("/score", (req, res) => {
    score
        .find()
        .then(score => {
            res.json(score)
        })
})


app.post("/score", (req, res) => {


    const data = {
        PlayerName: req.body.playerName.toString(),
        GameScore: req.body.score.toString(),
        Created: new Date()
    }

    score
        .insert(data)
        .then(createdScore => {
            res.json(createdScore)
        })



}
)

let port = process.env.PORT;
if (port == null || port == "") {
    port = 5000;
}
app.listen(port);

// app.listen(PORT, () => {
//     console.log("Listening on http://localhost:PORT");

// })