// Form Events
// Open index.html and work through these in order.

// TODO 1: Select #signup-form, #name-input, #char-count, and #feedback.

const element = document.querySelectorAll(
  "#signup-form, #name-input, #char-count, #feedback",
);

element.forEach((e) => {
  console.log(e);
});

// TODO 2: Add an "input" listener on #name-input. Every time the user types,
// set char-count's textContent to the current length of the input's value
// (name-input.value.length).
let count = 0;
element[1].addEventListener("input", () => {
  count++;
  element[2].textContent = count;
  console.log(element[1].value.length);
});

// TODO 3: Add a "submit" listener on #signup-form. Inside it:
//   - call event.preventDefault() so the page doesn't reload
//   - read and trim the name input's value
//   - if it's empty, set feedback's textContent to "Name required"
//   - otherwise, set feedback's textContent to `Welcome, ${name}!`

element[0].addEventListener("submit", () => {
  event.preventDefault();
    if(element[1].value.length===0){
        element[3].textContent = "Name require"
    } else{
        console.log(element[1].value.trim())
        element[3].textContent = `Welcome,${element[1].value.trim()}!`
    }
});
