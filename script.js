let counter = 0;
let points = 0;

var init = () => {
  console.log(subjects)
  question()
}

var question = () => {
  item = subjects[counter]
  if (item === undefined) {
    console.log(points)
    checkPartij(points)
  } else {
    document.getElementById('question').innerHTML = item.statement
  }
}

var answer = (answer) => {
  switch (answer) {
    case 'eens':
      points++;
      counter++;
      question();
      break;
    case 'geen':
      console.log('niks')
      counter++;
      question();
      break;
    case 'oneens':
      points--;
      counter++;
      question();
      break;

    default:
      console.log('error')
      break;
  }
}

var checkPartij = (punten) => {
  //-30 tot 30
  if (punten >= -30 && punten <= -25) {
    
  } else if (punten >= -30 && punten <= -25) {

  } else if (punten > -25 && punten <= -20) {

  } else if (punten > -20 && punten <= -15) {

  } else if (punten > -15 && punten <= -10) {

  } else if (punten > -10 && punten <= -5) {

  } else if (punten > -5 && punten <= 0) {

  } else if (punten > 0 && punten <= 5) {

  } else if (punten > 5 && punten <= 10) {

  } else if (punten > 10 && punten <= 15) {

  } else if (punten > 15 && punten <= 20) {

  } else if (punten > 20 && punten <= 25) {

  } else if (punten > 25 && punten <= 30) {

  } else {
    return 'error'
  }
}