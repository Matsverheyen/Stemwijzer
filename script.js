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
  console.log(subjects)
  item = subjects[counter]
  if (item === undefined) {
    let winner;
    var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')
    for (var i = 0; i < checkboxes.length; i++) {
      selectedParties.push(checkboxes[i].value)
    }
    document.getElementById('onderwerpenselect').hidden = false;
    document.getElementById('vragen').hidden = true;
    document.getElementById('winner').innerHTML = checkPartij()
    let index = search(checkPartij(), parties);
    console.log(index);
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
    document.getElementById('second').innerHTML = second.name
    document.getElementById('third').innerHTML = third.name
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
    return 'VVD';
  } else if (punten > -28 && punten <= -26) {
    return 'CDA';
  } else if (punten > -26 && punten <= -24) {
    return 'PVV';
  } else if (punten > -24 && punten <= -22) {
    return 'D66';
  } else if (punten > -22 && punten <= -20) {
    return 'GroenLinks';
  } else if (punten > -20 && punten <= -18) {
    return 'SP';
  } else if (punten > -18 && punten <= -16) {
    return 'PvdA';
  } else if (punten > -16 && punten <= -14) {
    return 'ChristenUnie';
  } else if (punten > -14 && punten <= -12) {
    return 'Partij voor de Dieren';
  } else if (punten > -12 && punten <= -9) {
    return 'SGP';
  } else if (punten > -9 && punten <= -7) {
    return 'Forum voor Democratie';
  } else if (punten > -7 && punten <= -4) {
    return 'Lokaal in de Kamer';
  } else if (punten > -4 && punten <= 0) {
    return 'OndernemersPartij';
  } else if (punten > 0 && punten <= 2) {
    return 'VNL';
  } else if (punten > 3 && punten <= 5) {
    return 'Nieuwe Wegen';
  } else if (punten > 5 && punten <= 7) {
    return 'De Burger Beweging';
  } else if (punten > 7 && punten <= 10) {
    return 'Piratenpartij';
  } else if (punten > 10 && punten <= 15) {
    return 'Artikel 1';
  } else if (punten > 15 && punten <= 18) {
    return 'Libertarische Partij';
  } else if (punten > 18 && punten <= 20) {
    return '50Plus';
  } else if (punten > 20 && punten <= 24) {
    return 'Vrijzinnige Partij';
  } else if (punten > 24 && punten <= 27) {
    return 'Libertarische Partij';
  } else if (punten > 27 && punten <= 30) {
    return 'Niet Stemmers';
  } else {
    return 'error'
  }

}