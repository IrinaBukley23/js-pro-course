
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

  enum Period {
        "inYear" = "year",
        "inVocation" = "vocation",
        "inWeek" = "week",
        "inDay" = "day",
        "inHour" = "hour",
        "inMinute" = "minute",
        "inNow" = "now"
  }

  //count result block период согнать в enum и переписать код + строгий режим  + заменить на Number/ parseInt + попробовать конвертацию валюты???????
const countSum = (period: Period): number => {
    let dayEarned: number = +salaryEl.value / (+dayWorkedEl.value * 4);
    let hourEarned: number = dayEarned / +timeWorkedEl.value;

    if(period === Period.inYear) { +salaryEl.value * 12; }
    if(period === Period.inVocation){ dayEarned * +vocationDaysEl.value; }
    if(period === Period.inWeek) { return Math.round( +salaryEl.value / 4 ); }
    if(period === Period.inDay) { return Math.round( dayEarned ); }
    if(period === Period.inHour) { return +( hourEarned ).toFixed(2); }
    if(period === Period.inMinute) { return +( hourEarned / 60 ).toFixed(2); }
    if(period === Period.inNow) { return +( hourEarned / (60 * 60) ).toFixed(3); }
}

 // recording results after DOM loaded
document.addEventListener('DOMContentLoaded', () => {
    resultSumEl.forEach(elem => elem.textContent = countSum(elem.id).toString());
});

// update rusults when started data was changed
document
    .querySelectorAll('.start')
    .forEach(elem => elem.addEventListener('input', () => {
        resultSumEl.forEach(elem => elem.textContent = countSum(elem.id).toString());
    } ));
    
// update poin "now" every second
    let nowUp = +countSum('now');
    setInterval( () => {
        nowUp += +countSum('now');
        nowSumEl.textContent = nowUp.toFixed(3);
    }, 1000 );