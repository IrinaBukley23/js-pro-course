
// initial data for calculation
let salaryEl = document.querySelector('.salary-sum') as HTMLInputElement;
let currencyEl = document.querySelector('#currency') as HTMLSelectElement;
let chosenEl = document.querySelectorAll('.chosen');
let dayWorkedEl = document.querySelector('#week-worked') as HTMLSelectElement;
let timeWorkedEl = document.querySelector('#time-worked') as HTMLSelectElement;
let vocationDaysEl = document.querySelector('.vocation-days') as HTMLInputElement;

// calculated data
let resultSumEl: NodeListOf<Element> = document.querySelectorAll('.result-sum');
let yearSumyEl = document.querySelector('#year');
let vocationSumEl = document.querySelector('#vocation');
let weekSumEl = document.querySelector('#week');
let daySumEl = document.querySelector('#day');
let hourSumEl = document.querySelector('#hour');
let minuteSumyEl = document.querySelector('#minute');
let nowSumEl = document.querySelector('#now');

// const currency = {
//     'rub': 1,
//     'euro': 3.1,
//     'dollar': 2.5,
//     'hryvnia': 0.093,
//   };

  // currency change in text
  currencyEl.addEventListener( 'change', () => {
    chosenEl.forEach(elem => elem.textContent = currencyEl.options[currencyEl.selectedIndex].text)
  } );

  const enum Period {
        year,
        vocation,
        week,
        day,
        hour,
        minute,
        now
  }

  //count result block период согнать в enum и переписать код + строгий режим  + заменить на Number/ parseInt + попробовать конвертацию валюты???????
const countSum = (period: Period) => {
    let dayEarned: number = Number(salaryEl.value) / (Number(dayWorkedEl.value) * 4);
    let hourEarned: number = dayEarned / Number(timeWorkedEl.value);

    if(period === Period.year) { Number(salaryEl.value) * 12; }
    if(period === Period.vocation){ dayEarned * Number(vocationDaysEl.value); }
    if(period === Period.week) { return Math.round( Number(salaryEl.value) / 4 ); }
    if(period === Period.day) { return ( dayEarned ).toFixed(0); }
    if(period === Period.hour) { return Number(( hourEarned ).toFixed(2)); }
    if(period === Period.minute) { return Number(( hourEarned / 60 ).toFixed(2)); }
    if(period === Period.now) { return Number(( hourEarned / (60 * 60) ).toFixed(3));
    }
}

 // recording results after DOM loaded
document.addEventListener('DOMContentLoaded', () => {
    resultSumEl.forEach(elem => elem.textContent = countSum(elem).toString());
});

// update rusults when started data was changed
document
    .querySelectorAll('.start')
    .forEach(elem => elem.addEventListener('input', () => {
        resultSumEl.forEach(elem => elem.textContent = countSum(elem).toString());
    } ));
    
// update point "now" every second
    let nowUp = parseInt(countSum(Period.now));
    setInterval( () => {
        nowUp += parseInt(countSum(Period.now));
        nowSumEl.textContent = nowUp.toFixed(3);
    }, 1000 );