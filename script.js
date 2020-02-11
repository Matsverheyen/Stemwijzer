let counter = 0;
let points = [];

var init = () => {
  document.getElementById('onderwerpenselect').hidden = true;
  document.getElementById('partijenselect').hidden = true;
  document.getElementById('results').hidden = true;
  document.getElementById('vragen').hidden = false;
  console.log(subjects)
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

var question = () => {
  console.log(subjects)
  item = subjects[counter]
  if (item === undefined) {
    document.getElementById('onderwerpenselect').hidden = false;
    document.getElementById('vragen').hidden = true;
    fillOnderwerpen();
    document.getElementById('winner').innerHTML = checkPartij()
  } else {
    document.getElementById('question').innerHTML = item.statement
  }
}

var fillOnderwerpen = () => {
  subjects.forEach(item => {
    onderwerp = `<div><label for="${item.title}">${item.title}</label><input type="checkbox" id="${item.title}"><hr /></div>`
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
  //-30 tot 30
  points = [];
  subjects.map(x => points.push(x.answer))
  punten = points.reduce(myFunc)
  console.log(punten)
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