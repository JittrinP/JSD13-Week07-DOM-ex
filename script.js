// Write your demo code here, section by section.
// The HTML file has matching ids/classes for each topic:
//
// 1. Selecting Elements   -> #main-title, .submit-btn, .task

console.log(document.getElementById("main-title"));
console.log(document.getElementsByClassName("submit-btn"));
console.log(document.getElementsByClassName("task"));

// 2. Modifying Content    -> .label, #msg, #card
const label = document.querySelector(".label");
label.textContent = "You was hacked";
const msg = document.getElementById("msg");
msg.innerText = "test test";

// 3. classList            -> #themeBtn, .card
const themeBtn = document.querySelector("#themeBtn");
const card = document.querySelector(".card");
themeBtn.classList.toggle("DarkMode");
card.classList.remove(".card");

// 4. Create & Remove      -> #addTaskBtn, #resetTasksBtn, #tasks

const task = document.querySelector("#tasks");
const addBtn = document.getElementById("addTaskBtn");
const resetBtn = document.getElementById("resetTasksBtn");
addBtn.addEventListener("click", () => {
  addElement();
});
function addElement() {
  const Elements = document.createElement("div");
  Elements.textContent = "test";
  task.append(Elements);
}

resetBtn.addEventListener("click", () => {
  task.innerHTML = "";
});

// 5. Events               -> #click-me, #list, #signupForm, #email, .error

const clickBtn = document.getElementById("click-me");
const list = document.getElementById("list");
const signUpForm = document.getElementById("signupForm");
const email = document.getElementById("email");
const error = document.querySelector(".error");

clickBtn.addEventListener("click", () => {
  addList();
});

let i = 4;
function addList() {
  const item = document.createElement("li");
  item.textContent = `Item ${i}`;
  list.append(item);
  i++;
}

list.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    e.target.remove();
  }
});

signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const value = email.value.trim();

  if (value === "") {
    error.textContent = "Please fill your email";
    return;
  }

  error.textContent = "";
});
// 6. Pokémon Card Fetcher -> #fetchBtn, #resetBtn, #gallery
const fetchBtn = document.getElementById("fetchBtn");
const clearBtn = document.getElementById("resetBtn");
const gallery = document.getElementById("gallery");

fetchBtn.addEventListener("click", async () => {
  const random = Math.floor(Math.random() * 1350) + 1;
  let url = `https://pokeapi.co/api/v2/pokemon/${random}`;
  const response = await fetch(url);
  const data = await response.json();

  const div = document.createElement(`div`);

  // สร้าง img tag
  const img = document.createElement(`img`);
  img.src = data.sprites.front_default;

  //สร้าง p tag เป็นชื่อ pokemon
  const name = document.createElement(`p`);
  name.textContent = `Pokemon name : ${data.name}`;

  //สร้างปุ่มสำหรับการ cancel div นั้น
  const btn_delete = document.createElement(`button`);
  btn_delete.classList.add("btn_delete");
  btn_delete.textContent = "Delete";
  console.log(btn_delete);

  //สร้าง function การ delete สำหรับกดปุ่ม
  btn_delete.addEventListener("click", () => {
    div.remove();
  });


  div.classList.add("pokeDiv");
  console.log(div);

  div.append(img);
  div.append(name);
  div.append(btn_delete);
  gallery.append(div);
});

clearBtn.addEventListener("click",()=>{
    gallery.innerHTML=""
})
