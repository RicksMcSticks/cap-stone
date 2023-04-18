const bears = require('./db.json');
let globalId = 8

module.exports = {
    getBears: (req, res) => {
        res.status(200).send(bears)
    },

    deleteBear: (req, res) => {
        let index = bears.findIndex(elem => elem.id === +req.params.id)
        bears.splice(index, 1)
        res.status(200).send(bears)
    },

    createBear: (req, res) => {
        let { bearType, attack, health, imageURL} = req.body
        let newBear = {
            id: globalId,
            bearType,
            attack,
            health,
            imageURL
        }
        bears.push(newBear)
        globalId++
        res.status(200).send(bears)
    }
}
