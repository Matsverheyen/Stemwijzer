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
  CreateQuestion()
}

var back = () => {
  if (counter !== 0) {
    counter--;
    CreateQuestion();
  }
}

var toOnderwerpen = () => {
  document.getElementById('onderwerpenselect').hidden = false;
  document.getElementById('partijenselect').hidden = true;
}

var toQuestions = () => {
  counter--;
  init();
}

var toPartijen = () => {
  document.getElementById('onderwerpenselect').hidden = true;
  document.getElementById('partijenselect').hidden = false;
  document.getElementById('vragen').hidden = true;
  document.getElementById('results').hidden = true;
}

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

var fillPartijen = () => {
  document.getElementById('parties').innerHTML = "";
  parties.forEach(item => {
    party = `<input type="checkbox" name="party" id="${item.name}"><label for="${item.name}">${item.name}</label>`
    var div = document.createElement("div");
    div.innerHTML = party
    document.getElementById('parties').appendChild(div);
  });
}

var fillOnderwerpen = () => {
    document.getElementById('onderwerpen').innerHTML = "";
  subjects.forEach(item => {
    onderwerp = `<input type="checkbox" id="${item.title}"><label for="${item.title}">${item.title}</label>`
    var div = document.createElement("div");
    div.innerHTML = onderwerp
    document.getElementById('onderwerpen').appendChild(div);
  });
}

var deselectAll = (source) => {
  checkboxes = document.getElementsByName('party');
  for (var i = 0, n = checkboxes.length; i < n; i++) {
    checkboxes[i].checked = false;
  }
}

var selectAll = (source) => {
  checkboxes = document.getElementsByName('party');
  for (var i = 0, n = checkboxes.length; i < n; i++) {
    checkboxes[i].checked = true;
  }
}

var answer = (answer) => {
  subjects[counter].answer = answer;
  counter++;
  CreateQuestion();
}

var myFunc = (total, num) => {
  return total - num;
}

var getWinner = () => {
  const arr = parties.filter(item => item.enabled !== false);
  return arr.find(el => el.counter == Math.max(...arr.map(o => o.counter), 0))
}

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