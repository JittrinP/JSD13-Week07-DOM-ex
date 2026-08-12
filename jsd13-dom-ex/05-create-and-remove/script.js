// Creating & Removing Elements
// Open index.html and work through these in order.

// TODO 1: Select #item-input, #add-item-btn, #items (the <ul>), and
// #item-count (the <span>).

const element = document.querySelectorAll(
  "#item-input, #add-item-btn, #items, #item-count",
);
element.forEach((e) => {
  console.log(e);
});
// TODO 2: Write a function updateCount() that sets item-count's textContent
// to the number of <li> elements currently in the list (items.children.length).

function updateCount() {
  element[0].textContent = element[3].children.length;
}

// TODO 3: Add a "click" listener on #add-item-btn. Inside it:
//   - read and trim the input's value; if empty, do nothing
//   - create a new <li>, set its textContent to the value
//   - add a "click" listener on the <li> that removes it (li.remove())
//     and then calls updateCount() again
//   - add the <li> to the TOP of the list using items.prepend(li)
//   - clear the input
//   - call updateCount()

element[2].addEventListener("click", () => {
const item = element[1].value.trim()
  //read and trim the input's value; if empty, do nothing
  
  if (item === "") {
    return;
  } else {
    console.log(item);

    //create a new <li>, set its textContent to the value
    const li = document.createElement(`li`);
    li.textContent = `${item}`;

    //add a "click" listener on the <li> that removes it (li.remove()) and then calls updateCount() again
    li.addEventListener("click", () => {
      li.remove();
      updateCount();
    });

    //add the <li> to the TOP of the list using items.prepend(li)
    element[3].prepend(li);

    //clear the input
    element[1].value = "";

    //   - call updateCount()
    updateCount();

  }
});
