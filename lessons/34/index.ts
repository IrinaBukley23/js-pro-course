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
let nowSumEl: any = document.querySelector('#now');

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
    year,
    vocation,
    week,
    day,
    hour,
    minute,
    now
}

 //count result block + попробовать конвертацию валюты???????
const countSum = (period: Period): number | void => {
    let dayEarned: number = Number(salaryEl.value) / (Number(dayWorkedEl.value) * 4);
    let hourEarned: number = dayEarned / Number(timeWorkedEl.value);

    if(period === Period.year) { 
        return Number(salaryEl.value) * 12; 
    }
    if(period === Period.vocation){ 
        return dayEarned * Number(vocationDaysEl.value); 
    }
    if(period === Period.week) { 
        return Math.round( Number(salaryEl.value) / 4 ); 
    }
    if(period === Period.day) { 
        return Number( ( dayEarned ).toFixed(0)); 
    }
    if(period === Period.hour) { 
        return Number(( hourEarned ).toFixed(2)); 
    }
    if(period === Period.minute) { 
        return Number(( hourEarned / 60).toFixed(2)); 
    }
    if(period === Period.now) { 
        return Number(( hourEarned / (60 * 60)).toFixed(3));
    }
}

const printResult = (): void => {
    let yearEl: any = document.querySelector('#year');
    yearEl.textContent = String(countSum(Period.year)).toString();
    let vocationEl: any = document.querySelector('#vocation');
    vocationEl.textContent = String(countSum(Period.vocation)).toString();
    let weekEl: any = document.querySelector('#week');
    weekEl.textContent = String(countSum(Period.week)).toString();
    let dayEl: any = document.querySelector('#day');
    dayEl.textContent = String(countSum(Period.day)).toString();
    let hourEl: any = document.querySelector('#hour');
    hourEl.textContent = String(countSum(Period.hour)).toString();
    let minuteEl: any = document.querySelector('#minute');
    minuteEl.textContent = String(countSum(Period.minute)).toString();
    let nowEl: any = document.querySelector('#now');
    nowEl.textContent = String(countSum(Period.now)).toString();
}
document.addEventListener('DOMContentLoaded', printResult);
document.addEventListener('input', printResult);
    
// update point "now" every second
    let nowUp = Number(countSum(Period.now));
    setInterval( () => {
        nowUp += Number(countSum(Period.now));
        nowSumEl.textContent = nowUp.toFixed(3);
    }, 1000 );