const main = document.getElementById("main");
const addUserBtn = document.getElementById("add_user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];

async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();
  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 10000000),
  };
  addData(newUser);
}

function addData(obj) {
  data.push(obj);
  updateDOM();
}
function updateDOM(provideData = data) {
  main.innerHTML = "<h2><strong>Person</strong>Wealth</h2>";

  provideData.forEach((person) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${person.name}</strong>${formatMoney(
      person.money
    )}`;
    main.appendChild(element);
  });
}
getRandomUser();
getRandomUser();
getRandomUser();

function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,"); // 12,345.67
}

addUserBtn.addEventListener("click", getRandomUser);

function doubleWealth() {
  data.map((elem) => {
    return (elem.money = 2 * elem.money);
  });
  updateDOM();
}

function sortFunction() {
  data.sort((a, b) => b.money - a.money);
  updateDOM();
}
function showMillionaires() {
  const millionaires = data.filter((user) => user.money > 1000000);
  updateDOM(millionaires);
}
function calculateWealth(){
    const wealth=data.reduce((acc, user)=>(acc+user.money), 0)
    const wealthElem=document.createElement('div')
    wealthElem.innerHTML=`<h2>Total Wealth:<strong>${formatMoney(wealth)}</strong></h2>`
    main.appendChild(wealthElem);
}


doubleBtn.addEventListener("click", doubleWealth);
sortBtn.addEventListener("click", sortFunction);
showMillionairesBtn.addEventListener("click", showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth)
