let form = document.querySelector('form')
let btn = document.querySelector('button')
let field = document.querySelectorAll('fieldset')

let dist1 = document.getElementsByName('dist1')
let distance1
let dist2 = document.getElementsByName('dist2')
let distance2

let hrs1 = document.querySelector('#hours1')
let mins1 = document.querySelector('#mins1')
let secs1 = document.querySelector('#secs1')
let hrs2 = document.querySelector('#hours2')
let mins2 = document.querySelector('#mins2')
let secs2 = document.querySelector('#secs2')

const mara = 26.2188

let display = document.querySelector('.display')
let results = document.createElement('span')
let riegelTime = document.createElement('span')

//function calculating mean, will help with other calculations later

function average(a, b) {
  return (a + b) / 2
}

//handle click event, assign variables from inputs, do some math

function makePrediction(e) {

  //assign initial distance values from inputs

  for (let i = 0; i < dist1.length; i++) {
    if(dist1[i].checked) {
      distance1 = dist1[i].value
    }
  }
  for (let i = 0; i < dist2.length; i++) {
    if(dist2[i].checked) {
      distance2 = dist2[i].value
    }
  }

  //determine 'k' based on mileage - will refine this later
  let k = 1.1 //default


  //assign initial time values from inputs, standardize all to seconds, add them together

  let h1 = Number(hrs1.value * 3600)
  let m1 = Number(mins1.value * 60)
  let s1 = Number(secs1.value)
  let tot1 = h1 + m1 + s1

  let h2 = Number(hrs2.value * 3600)
  let m2 = Number(mins2.value * 60)
  let s2 = Number(secs2.value)
  let tot2 = h2 + m2 + s2

  //make string with zeroes if min or sec less than 10 for display later
  let dispHr1 = h1 / 3600
  let dispHr2 = h2 / 3600
  let dispMin1 = m1 / 60
  let dispMin2 = m2 / 60
  let dispSec1 = s1
  let dispSec2 = s2

  dispMin1 < 10 ? dispMin1 = '0' + dispMin1 : ''
  dispMin2 < 10 ? dispMin2 = '0' + dispMin2 : ''
  dispSec1 < 10 ? dispSec1 = '0' + dispSec1 : ''
  dispSec2 < 10 ? dispSec2 = '0' + dispSec2 : ''

  //assign mile values to distance input values

  switch (distance1) {
    case '5k':
      distMiles1 = 3.10686
      break;
    case '10k':
      distMiles1 = 6.21371
      break;
    case '10 mile':
      distMiles1 = 10
      break;
    case 'half marathon':
      distMiles1 = 13.1094
      break;
    default:
      distMiles1 = 0
  }
  switch (distance2) {
    case '5k':
      distMiles2 = 3.10686
      break;
    case '10k':
      distMiles2 = 6.21371
      break;
    case '10 mile':
      distMiles2 = 10
      break;
    case 'half marathon':
      distMiles2 = 13.1094
      break;
    default:
      distMiles2 = 0
  }

  //averaging time and distance inputs

  let t1
  let d1

  if (tot2 !== 0) {
    t1 = average(tot1, tot2)
    d1 = average(distMiles1, distMiles2)
  }
  else {
    t1 = tot1
    d1 = distMiles1
  }

  //riegel formula

  let riegel = Number(Math.round((t1 * Math.pow((mara / d1), k))))

  //converting output of riegel formula back to hrs, mins, secs

  let riegelHrs = Math.floor((riegel / 3600))
  let riegelMins = Math.floor(((riegel - (riegelHrs * 3600))/60))
  let riegelSecs = Math.floor((riegel % 60))

  //add leading zeroes to single-digit mins & secs

  riegelMins < 10 ? riegelMins = '0' + riegelMins : ''
  riegelSecs < 10 ? riegelSecs = '0' + riegelSecs : ''

  //pace

  let pace = riegel / mara
  let paceMins = Math.floor((pace/60))
  let paceSecs = Math.round((pace%60))
  paceSecs < 10 ? paceSecs = '0' + paceSecs : ''


  //create text to display
  let display1 = `With a  ${distance1}  time of <span class="prevTime">${dispHr1}:${dispMin1}:${dispSec1}</span>`
  let display2 = ` and a ${distance2} time of <span class = "prevTime">${dispHr2}:${dispMin2}:${dispSec2}</span>`
  let display3 = `, you could expect to run a marathon in: </br><span class="raceTime">${riegelHrs}:${riegelMins}:${riegelSecs}</span></br><span class="pace">(${paceMins}:${paceSecs}/mile pace)</span>`


  tot2 !== 0 && distance2 !== '' ? results.innerHTML = display1 + display2 + display3 : results.innerHTML = display1 + display3


  //if there's a valid input from the form, show the results

  t1 != 0 ? showResult() : ''



  //console.log(riegelHrs + ":" + riegelMins + ":" + riegelSecs)
  e.preventDefault()
}

function showResult() {
  for (let i = 0; i < field.length; i++) {
    field[i].classList.toggle('slideOut')
    field[i].classList.contains('slideOut') ? btn.innerHTML = 'Reset' : btn.innerHTML = 'Submit'
  }
  display.classList.toggle('active')
  display.appendChild(results)

  display.classList.contains('active') ? btn.onclick = function(event) {window.location.reload(true)} : ''

}


form.addEventListener('submit', makePrediction)
