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
    <p class="bear-attack">Attack: ${bear.attack} damage</p>
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


const chooseBear = (id) => {
    if (player.length === 1) {
      return alert("You can only choose one bear!");
    }
    let index = choices.findIndex((bear) => bear.id === id);
    player.push(choices[index]);
    choices.splice(index, 1);
    renderChoices();
    renderPlayer();
    if (player.length === 1) {
      duelBtn.classList.remove("hide");
    }
  };

  const duel = () => {
    resultsText.textContent = "Dueling...";
    duelBtn.classList.add("hide");
    choicesDiv.innerHTML = "";
    chooseHeader.classList.add("hide");
    renderCompDuo();
    document
      .querySelectorAll(".bear-btn")
      .forEach((btn) => btn.classList.add("hide"));
    setTimeout(() => {
      axios.post("/api/duel", { comp, player }).then(({ data }) => {
        resultsText.textContent = data;
        playAgainBtn.classList.remove("hide");
        getPlayerStats();
      });
    }, 1500);
  };

form.addEventListener('submit', submitHandler)
duelBtn.addEventListener("click", duel);


getAllBears()