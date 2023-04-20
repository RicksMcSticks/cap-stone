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
    },

    updateBear: (req, res) => {
        let { id } = req.params
        let { type } = req.body
        let index = bears.findIndex(elem => +elem.id === +id)

        if (bears[index].attack <= 5 && type === 'minus') {
            bears[index].attack = 0
            res.status(200).send(bears)
        } else if (type === 'plus') {
            bears[index].attack += 5
            res.status(200).send(bears)
        } else if (type === 'minus') {
            bears[index].attack -= 5
            res.status(200).send(bears)
        } else {
            res.sendStatus(400)
        }
    }
}
