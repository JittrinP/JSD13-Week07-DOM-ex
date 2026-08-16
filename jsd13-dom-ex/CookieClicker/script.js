const story = document.querySelector(".story");
const shop = document.querySelector(".shop");
const upgrade = document.querySelector(".upgrade");

const EP = document.querySelector("#EP");
const shopContainer = document.querySelector(".shop_container");

//สร้าง EP point ออกมา เตรียมแสดงไว้
let points = 0;

//สร้างพื้นที่สำหรับ click ใน story โดยการ add div click เข้ามา
const clickedArea = document.createElement(`div`);
clickedArea.classList.add("clickedArea", "bg-[rgb(110,252,165)]", "w-full", "h-full", "cursor-pointer");
clickedArea.textContent = "Cliked me please";
story.append(clickedArea);

//สร้าง function ที่รับการ click ของ user มา แล้วบวกค่า
story.addEventListener("click", () => {
  points++;
  EP.textContent = `Evolution points(EP) : ${points} points`;

  // add itemshop 1 เมื่อ point >10
  if (points >= 10 && shopContainer.children.length < 1) {
    const shopItem1 = document.createElement(`div`);
    shopItem1.classList.add(
      "shopItem",
      "bg-[rgb(129,59,59)]",
      "w-full",
      "h-[60px]",
      "rounded-xl",
      "p-[5px]",
      "border",
      "border-black",
      "flex",
      "shadow-[3px_3px_10px_1px_black]",
      "mb-[7px]",
      "items-center",
      "justify-between"
    );

    //เอา image เข้าไป shopItem1
    const imgShopitem1 = document.createElement(`img`);
    imgShopitem1.src =
      "https://imgv3.fotor.com/images/gallery/cartoon-character-generated-by-Fotor-ai-art-creator.jpg";
    console.log(imgShopitem1);
    imgShopitem1.classList.add("imgItem", "h-full", "p-[2px]");
    shopItem1.append(imgShopitem1);

    // เพิ่ม detail ลงไปใน item
    const detailShop1 = document.createElement(`div`);
    detailShop1.classList.add("detailShop", "bg-white", "w-3/5", "mx-2.5");
    detailShop1.textContent ="Topic_test"
    shopItem1.append(detailShop1);

    //เพิ่ม button สำหรับการ Buy , upgrade
    const buttonAdd1 = document.createElement(`button`)
    const buttonUpgrade1 = document.createElement(`button`)
    buttonAdd1.classList.add("btn", "w-[5em]", "h-[3em]", "bg-[blanchedalmond]", "rounded-[10px]", "cursor-pointer")
    buttonAdd1.textContent = "Add"
    buttonUpgrade1.classList.add("btn", "w-[5em]", "h-[3em]", "bg-[blanchedalmond]", "rounded-[10px]", "cursor-pointer")
    buttonUpgrade1.textContent = "Upgrade"
    
    shopItem1.append(buttonAdd1);
    shopItem1.append(buttonUpgrade1);

    //เอา shopItem1 กับ detailShop1 เข้าไป shopContainer
    shopContainer.append(shopItem1);
    

    console.log(shopContainer.children.length);
  }
});
