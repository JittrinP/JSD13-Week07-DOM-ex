// Events Basics
// Open index.html and work through these in order.

// TODO 1: Select #box, #log, and #key-display.

const element = document.querySelectorAll("#box , #log , #key-display")
element.forEach((e)=>{
    console.log(e)
})


// TODO 2: Add a "click" listener on #box that sets log's textContent to
// "Box clicked!". Inside the same listener, console.log() the event's
// event.type and event.target (the event object is the first argument
// your listener function receives).
let count = 0
element[0].addEventListener("click",(e)=>{
    // console.log("1")
    count ++;
    element[0].textContent = "Box clicked!"
    element[1].textContent = `User click ${count} times`
    console.log(e)
})

// TODO 3: Add a "mouseover" listener on #box that adds the "hover" class
// to it, and a "mouseout" listener that removes the "hover" class.

element[0].addEventListener("mouseover",()=>{
    element[0].classList.add("hover");
    console.log(element[0])
})
element[0].addEventListener("mouseout",()=>{
     element[0].classList.remove("hover");
    console.log(element[0])
})

// TODO 4: Add a "keydown" listener on the whole document. Inside it, set
// key-display's textContent to event.key (the key that was pressed).

document.addEventListener("keydown",(e)=>{
    element[2].textContent = `${e.key}`
})