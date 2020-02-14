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
  var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')
  for (var i = 0; i < checkboxes.length; i++) {
    selectedParties.push(checkboxes[i].id)
  }
  checkPartij();
  console.log("asdasd", getWinner())
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
  parties.forEach(item => {
    party = `<input type="checkbox" id="${item.name}"><label for="${item.name}">${item.name}</label>`
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
  CreateQuestion();
}

var answer = (answer) => {
  subjects[counter].answer = answer;
  //console.log(subjects);
  counter++;
  CreateQuestion();
}

var myFunc = (total, num) => {
  return total - num;
}

var getWinner = () => {
const arr = parties.filter(item => item.enabled !== false);
    //console.log("123", arr)
    //console.log("231", Math.max(...arr.map(o => o.counter), 0))
  //console.log("aaa", arr.find(el => el.counter == Math.max(...arr.map(o => o.counter), 0)))
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
  //console.log("selected", selectedParties);
  for (let x = 0; x < subjects.length; x++) {
    for (let j = 0; j < subjects[x].parties.length; j++) {
      if (points[x] === subjects[x].parties[j].position) {
        if (parties[search(subjects[x].parties[j].name, parties)].enabled) {
         parties[search(subjects[x].parties[j].name, parties)].counter++;
        }
      }
    }
  }

  // for subject.answer : subject
  // for subject.parties : party
  //party.position == subject.answer
  //resultaten array


}