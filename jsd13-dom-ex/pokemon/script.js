const pokeDiv = document.querySelector("#pokedex");
const btnPokemon = document.querySelector("#btn-newPokemon");

btnPokemon.addEventListener("click", async () => {
  try {
    //เพิ่ม random ตัว
    const random = Math.floor(Math.random() * 1350) + 1;
    let url = `https://pokeapi.co/api/v2/pokemon/${random}`;
    const response = await fetch(url);
    console.log(response);

    // if(!response.ok){}
    const data = await response.json();
    console.log(data);
    
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

    //เพิ่ม add CSS เข้าไปใน เช่น พื้นหลังของ card
    // div.style.backgroundColor = "lightblue";
    div.classList.add("pokeDiv");
    console.log(div);

    div.append(img);
    div.append(name);
    div.append(btn_delete);
    pokeDiv.append(div);
    
  } catch (error) {
    console.error();
    const notFound = document.createElement(`div`);
    notFound.textContent = `Error not found :${error} \n please find new pokemon`;
    pokeDiv.append(notFound);


  }
});
