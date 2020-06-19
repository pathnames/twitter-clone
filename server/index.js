const express = require('express');
const cors = require('cors');
const monk = require('monk');
const Filter = require('bad-words');
filter = new Filter();
const rateLimit = require('express-rate-limit');

const app = express();
const db = monk(process.env.MONGO_URI || 'localhost/meower');
const mews = db.get('mews');

app.use(cors());
app.use(express.json());
app.use(express.static('client'));


app.get('/', (req, res) => {
    res.sendFile(__dirname + 'client/index.html');
});

function isValidMew(mew){
    return mew.name && mew.name.toString().trim() !== '' && mew.content && mew.content.toString().trim() !== '';
}
// app.use(rateLimit({
//     windowMs: 30 * 1000, // 30 seconds
//     max: 1 // limit each IP to 1 requests per 30 seconds
//   }));

app.post('/mews', (req, res) => {
    console.log(req.body);
    if(isValidMew(req.body)){
        //insert into db...
        const mew = {
            name: filter.clean(req.body.name.toString()),
            content: filter.clean(req.body.content.toString()),
            created: new Date()
        }
        mews
            .insert(mew)
            .then(createdMew => {
                res.json(createdMew);
            });
     }else{
        res.status(422);
        res.json({
            message: 'Name and content are required!'
        });
    }
});

app.get('/mews', (req, res) => {
    mews
        .find()
        .then(mews => {
            res.json(mews);
        });
});

app.listen(5000, () => {
    console.log("Listening on port 5000!");
});