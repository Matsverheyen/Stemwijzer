let counter = 0;
let points = [];
let selectedParties = [];

var init = () => {
  fillPartijen();
  fillOnderwerpen();
  document.getElementById('onderwerpenselect').hidden = true;
  document.getElementById('partijenselect').hidden = true;
  document.getElementById('results').hidden = true;
  document.getElementById('vragen').hidden = false;
  question()
}

var back = () => {
  counter--;
  question();
}

var toOnderwerpen = () => {
  document.getElementById('onderwerpenselect').hidden = false;
  document.getElementById('partijenselect').hidden = true;
}

toQuestions = () => {
  counter = 29;
  init();
}

var toPartijen = () => {
  document.getElementById('onderwerpenselect').hidden = true;
  document.getElementById('partijenselect').hidden = false;
  document.getElementById('vragen').hidden = true;
  document.getElementById('results').hidden = true;
}

var toResults = () => {
  document.getElementById('onderwerpenselect').hidden = true;
  document.getElementById('partijenselect').hidden = true;
  document.getElementById('vragen').hidden = true;
  document.getElementById('results').hidden = false;
}

var search = (nameKey, myArray) => {
  for (var i = 0; i < myArray.length; i++) {
    if (myArray[i].name === nameKey) {
      return i;
    }
  }
}

var inArray = (item, array) => {
  if (array.indexOf(item) !== -1) {
    return true;
  } else {
    return false;
  }
}

var question = () => {
  item = subjects[counter]
  if (item === undefined) {
    let winner;
    var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')
    for (var i = 0; i < checkboxes.length; i++) {
      selectedParties.push(checkboxes[i].value)
    }
    document.getElementById('onderwerpenselect').hidden = false;
    document.getElementById('vragen').hidden = true;
    document.getElementById('imgWinner').src = checkPartij().img
    document.getElementById('winner').innerHTML = "1. " + checkPartij().name
    let index = search(checkPartij().name, parties);
    if (index === 23) {
      var second = parties[index - 1]
      var third = parties[index + 2]
    } else if (index === 0) {
      var second = parties[index + 1]
      var third = parties[index + 2]
    } else {
      var second = parties[index - 1]
      var third = parties[index + 1]
    }
    document.getElementById('second').innerHTML = "2. " + second.name
    document.getElementById('third').innerHTML = "3. " + third.name
  } else {
    document.getElementById('questionTitle').innerHTML = (counter +1)+". " + item.title
    document.getElementById('question').innerHTML = item.statement
  }
}

var fillPartijen = () => {
  parties.forEach(item => {
    party = `<input type="checkbox" id="${item.name}"><label for="${item.title}">${item.name}</label>`
    var div = document.createElement("div");
    div.innerHTML = party
    document.getElementById('parties').appendChild(div);
  });
}

var fillOnderwerpen = () => {
  subjects.forEach(item => {
    onderwerp = `<input type="checkbox" id="${item.title}"><label for="${item.title}">${item.title}</label>`
    var div = document.createElement("div");
    div.innerHTML = onderwerp
    document.getElementById('onderwerpen').appendChild(div);
  });
}

var skip = () => {
  counter++;
  question();
}

var answer = (answer) => {
  subjects[counter].answer = answer;
  counter++;
  question();
}

function myFunc(total, num) {
  return total - num;
}

var checkPartij = () => {
  points = [];
  subjects.map(x => points.push(x.answer))
  punten = points.reduce(myFunc)
  if (punten >= -30 && punten <= -28) {
    return { "name": "VVD", "img": "https://tweedekamer2017.stemwijzer.nl/logos/vvd.svg"};
  } else if (punten > -28 && punten <= -26) {
    return { "name": "CDA", "img": "https://tweedekamer2017.stemwijzer.nl/logos/cda.svg" };
  } else if (punten > -26 && punten <= -24) {
    return { "name": "PVV", "img": "https://tweedekamer2017.stemwijzer.nl/logos/pvv.svg" };
  } else if (punten > -24 && punten <= -22) {
    return { "name": "D66", "img": "https://tweedekamer2017.stemwijzer.nl/logos/d66.svg" };
  } else if (punten > -22 && punten <= -20) {
    return { "name": "GroenLinks", "img": "https://tweedekamer2017.stemwijzer.nl/logos/groenlinks.svg" };
  } else if (punten > -20 && punten <= -18) {
    return { "name": "SP", "img": "https://tweedekamer2017.stemwijzer.nl/logos/sp.svg" };
  } else if (punten > -18 && punten <= -16) {
    return { "name": "PvDa", "img": "https://tweedekamer2017.stemwijzer.nl/logos/pvda.svg" };
  } else if (punten > -16 && punten <= -14) {
    return { "name": "ChristenUnie", "img": "https://tweedekamer2017.stemwijzer.nl/logos/christenunie.svg" };
  } else if (punten > -14 && punten <= -12) {
    return { "name": "Partij voor de Dieren", "img": "https://tweedekamer2017.stemwijzer.nl/logos/pvdd.svg" };
  } else if (punten > -12 && punten <= -9) {
    return { "name": "SGP", "img": "https://tweedekamer2017.stemwijzer.nl/logos/sgp.svg" };
  } else if (punten > -9 && punten <= -7) {
    return { "name": "Forum voor Democratie", "img": "https://tweedekamer2017.stemwijzer.nl/logos/forumvoordemocratie.png" };
  } else if (punten > -7 && punten <= -4) {
    return { "name": "Lokaal in de Kamer", "img": "https://tweedekamer2017.stemwijzer.nl/logos/lokaalindekamer.svg" };
  } else if (punten > -4 && punten <= 0) {
    return { "name": "OndernemersPartij", "img": "https://tweedekamer2017.stemwijzer.nl/logos/ondernemerspartij.png" };
  } else if (punten > 0 && punten <= 2) {
    return { "name": "VNL", "img": "https://tweedekamer2017.stemwijzer.nl/logos/vnl.svg" };
  } else if (punten > 3 && punten <= 5) {
    return { "name": "Nieuwe Wegen", "img": "https://tweedekamer2017.stemwijzer.nl/logos/nieuwewegen.png" };
  } else if (punten > 5 && punten <= 7) {
    return { "name": "De Burger Beweging", "img": "https://tweedekamer2017.stemwijzer.nl/logos/burgerbeweging%20(2).png" };
  } else if (punten > 7 && punten <= 10) {
    return { "name": "Piratenpartij", "img": "https://tweedekamer2017.stemwijzer.nl/logos/piratenpartij.svg" };
  } else if (punten > 10 && punten <= 15) {
    return { "name": "Artikel 1", "img": "https://tweedekamer2017.stemwijzer.nl/logos/artikel1.png" };
  } else if (punten > 15 && punten <= 18) {
    return { "name": "Libertarische Partij", "img": "https://tweedekamer2017.stemwijzer.nl/logos/libertarischepartij.svg" };
  } else if (punten > 18 && punten <= 20) {
    return { "name": "50Plus", "img": "https://tweedekamer2017.stemwijzer.nl/logos/50plus.svg" };
  } else if (punten > 20 && punten <= 24) {
    return { "name": "Vrijzinnige Partij", "img": "https://tweedekamer2017.stemwijzer.nl/logos/vrijzinnigepartij.png" };
  } else if (punten > 24 && punten <= 27) {
    return { "name": "Libertarische Partij", "img": "https://tweedekamer2017.stemwijzer.nl/logos/libertarischepartij.svg" };
  } else if (punten > 27 && punten <= 30) {
    return { "name": "Niet Stemmers", "img": "https://tweedekamer2017.stemwijzer.nl/logos/nietstemmers.svg" };
  } else {
    return 'error'
  }

}