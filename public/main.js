const form = document.querySelector('form')


const baseURL = `http://localhost:4004/api/bears`


const getAllBears = () => {
    axios.get(baseURL)
    .then((res) => {
        displayBears(res.data)
    })
    .catch((err) => {
        console.log(err)
    })
}

const deleteBear = (id) => {
    axios.delete(`${baseURL}/${id}`)
    .then((res) => {
        displayBears(res.data)
    })
    .catch((err) => {
        console.log(err)
    })
}

const updateBear = (id, type) => {
    axios.put(`${baseURL}/${id}`, {type})
        .then((res) => {
            displayBears(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
}

const createBear = (body) => {
    axios.post(baseURL, body)
    .then((res) => {
        displayBears(res.data)
    })
    .catch((err) => {
        console.log(err)
    })
}

const submitHandler = (e) => {
    e.preventDefault()

    let bearType = document.querySelector(`#bearType`)
    let attack = document.querySelector(`#attack`)
    let health = document.querySelector(`#health`)
    let imageURL = document.querySelector(`#img`)

    let bodyObj = {
        bearType: bearType.value,
        attack: attack.value,
        health: health.value,
        imageURL: imageURL.value
    }
    
    createBear(bodyObj)
    
    bearType.value= ''
    attack.value = ''
    health.value = ''
    imageURL.value = ''
}

const createBearCard = (bear) => {

    const bearsContainer = document.querySelector('#bears-container')

    const bearCard = document.createElement('div')

    bearCard.classList.add('bear-card')

    bearCard.innerHTML = `
    <img alt='bear cover image' src=${bear.imageURL} class="bear-cover-image"/>
    <h3>${bear.bearType}</h3>
    <div class="btns-container">
    <button onclick="updateBear(${bear.id}, 'minus')">-</button>
    <p class="bear-attack">Attack: ${bear.attack} damage</p>
    <button onclick="updateBear(${bear.id}, 'plus')">+</button>
    </div>
    <p class="bear-health">Health: ${bear.health}</p>
    <button onclick="deleteBear(${bear.id})">delete</button>
    `

    bearsContainer.appendChild(bearCard)
}

const displayBears = (arr) => {
    const bearsContainer = document.querySelector('#bears-container')

    bearsContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createBearCard(arr[i])
    }
}


form.addEventListener('submit', submitHandler)


getAllBears()