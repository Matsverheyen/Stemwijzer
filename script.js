let counter = 0;
let points = [];
let selectedParties = [];


//roept wat standaard functies aan en zet de schermen op hidden
var init = () => {
  fillPartijen();
  fillOnderwerpen();
  document.getElementById('onderwerpenselect').hidden = true;
  document.getElementById('partijenselect').hidden = true;
  document.getElementById('results').hidden = true;
  document.getElementById('vragen').hidden = false;
  CreateQuestion()
}

//Hiet ga je een vraag terug dus gaat de counter ook 1tje terug
var back = () => {
  if (counter !== 0) {
    counter--;
    CreateQuestion();
  }
}

//hier ga je naar het selecteren van onderwerpen
var toOnderwerpen = () => {
  document.getElementById('onderwerpenselect').hidden = false;
  document.getElementById('partijenselect').hidden = true;
}

//hier ga je terug naar de vragen
var toQuestions = () => {
  counter--;
  init();
}

//hier ga je naar het selecteren van partijen
var toPartijen = () => {
  document.getElementById('onderwerpenselect').hidden = true;
  document.getElementById('partijenselect').hidden = false;
  document.getElementById('vragen').hidden = true;
  document.getElementById('results').hidden = true;
}

//hier ga je naar de resultaten en wordt de winnaar bekent gemaakt
var toResults = () => {
  selectedParties = [];
  var checkboxes = document.querySelectorAll('input[name=party]:checked')
  for (var i = 0; i < checkboxes.length; i++) {
    selectedParties.push(checkboxes[i].id)
  }
  checkPartij();
  var winner = partyConfig.parties.find(x => x.name == getWinner().name);
  document.getElementById('imgWinner').src = `https://tweedekamer2017.stemwijzer.nl/${winner.logo}`
  document.getElementById('winner').innerHTML = "1. " + winner.name
  document.getElementById('onderwerpenselect').hidden = true;
  document.getElementById('partijenselect').hidden = true;
  document.getElementById('vragen').hidden = true;
  document.getElementById('results').hidden = false;
}

//dit is een zoekfuncties voor objecten in arrays
var search = (nameKey, myArray) => {
  for (var i = 0; i < myArray.length; i++) {
    if (myArray[i].name === nameKey) {
      return i;
    }
  }
}

//Dit is een functie om te kijken of er een item in een array zit
var inArray = (item, array) => {
  if (array.indexOf(item) !== -1) {
    return true;
  } else {
    return false;
  }
}


//deze functie maakt de vragen aan en zet de vragen in het beeld
var CreateQuestion = () => {
  item = subjects[counter]
  if (item === undefined) {
    document.getElementById('onderwerpenselect').hidden = false;
    document.getElementById('vragen').hidden = true;
  } else {
    document.getElementById('questionTitle').innerHTML = (counter + 1) + ". " + item.title
    document.getElementById('question').innerHTML = item.statement
  }
}

//dit zorgt ervoor dat de checkboxes worden gevuld met de partijen
var fillPartijen = () => {
  document.getElementById('parties').innerHTML = "";
  parties.forEach(item => {
    party = `<input type="checkbox" name="party" id="${item.name}"><label for="${item.name}">${item.name}</label>`
    var div = document.createElement("div");
    div.innerHTML = party
    document.getElementById('parties').appendChild(div);
  });
}
//dit zorgt ervoor dat de checkboxes worden gevuld met de onderwerpen
var fillOnderwerpen = () => {
    document.getElementById('onderwerpen').innerHTML = "";
  subjects.forEach(item => {
    onderwerp = `<input type="checkbox" id="${item.title}"><label for="${item.title}">${item.title}</label>`
    var div = document.createElement("div");
    div.innerHTML = onderwerp
    document.getElementById('onderwerpen').appendChild(div);
  });
}

//deze functie is om alle partijen te deselecteren
var deselectAll = () => {
  checkboxes = document.getElementsByName('party');
  for (var i = 0, n = checkboxes.length; i < n; i++) {
    checkboxes[i].checked = false;
  }
}


//hiermee select je alle partijen
var selectAll = () => {
  checkboxes = document.getElementsByName('party');
  for (var i = 0, n = checkboxes.length; i < n; i++) {
    checkboxes[i].checked = true;
  }
}

//dit slaat het antwoord op
var answer = (answer) => {
  subjects[counter].answer = answer;
  counter++;
  CreateQuestion();
}


//dit haal een nummer van het totaal af
var myFunc = (total, num) => {
  return total - num;
}


//dit laat de winnaar zien
var getWinner = () => {
  const arr = parties.filter(item => item.enabled !== false);
  return arr.find(el => el.counter == Math.max(...arr.map(o => o.counter), 0))
}


//hier wordt gekeken wie de winaar is
var checkPartij = () => {
  points = [];
  subjects.forEach(x => {
    points.push(x.answer)
  })
  parties.forEach(x => {
    x.counter = 0
    x.enabled = false
  })
  selectedParties.forEach(x => {
    parties[search(x, parties)].enabled = true;
  })
  for (let x = 0; x < subjects.length; x++) {
    for (let j = 0; j < subjects[x].parties.length; j++) {
      if (points[x] === subjects[x].parties[j].position) {
        if (parties[search(subjects[x].parties[j].name, parties)].enabled) {
          parties[search(subjects[x].parties[j].name, parties)].counter++;
        }
      }
    }
  }
}