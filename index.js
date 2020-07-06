const express = require("express")
const cors = require("cors")
const monk = require("monk")
const app = express()

const PORT = "https://my-app.m-halid.vercel.app/"

const db = monk(process.env.MONGODB_URI || "localhost/Scores")
const GameScores = db.get("GameScores")


app.enable('trust proxy');

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.json({
        message: "Miyaw heyyo hey🐈"
    })
})

// function isValidMew(mew) {
//     return mew.name && mew.name.toString().trim() !== "" &&
//         mew.content && mew.content.toString().trim() !== ""
// }

app.get("/score", (req, res) => {
    GameScores
        .find()
        .then(scores => {
            res.json(scores)
        })
})


app.post("/score", (req, res) => {


    const data = {
        PlayerName: req.body.playerName.toString(),
        GameScore: req.body.score.toString(),
        Created: new Date()
    }

    GameScores
        .insert(data)
        .then(createdScore => {
            res.json(createdScore)
        })



}
)

app.listen(PORT, () => {
    console.log("Listening on http://localhost:5000");

})