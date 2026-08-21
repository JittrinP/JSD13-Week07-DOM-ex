const story = document.querySelector(".story");
const shop = document.querySelector(".shop");
const upgrade = document.querySelector(".upgrade");
const shopTab = document.getElementById("shopTab");
const upgradeTab = document.getElementById("upgradeTab");
const statusTab = document.getElementById("statusTab");
const shopDisplay = document.querySelector(".shopDisplay");
const upgradeDisplay = document.querySelector(".upgradeDisplay");
const statusDisplay = document.querySelector(".statusDisplay");

const EP = document.querySelector("#EP");
const PPS = document.querySelector("#PPS");
const shopContainer = document.querySelector(".shopContainer");
const statusContainer = document.querySelector(".statusContainer");
const upgradeContainer = document.querySelector(".skillsContainer");

//สร้าง EP point ออกมา เตรียมแสดงไว้
let points = 0;

//อัตราการเพิ่ม point ต่อวินาที รวมจากไอเทมที่ซื้อไปแล้วทั้งหมด
let pointsPerSecond = 0;

//ค่าคงที่สำหรับปรับสมดุลเกม
const PRICE_GROWTH_RATE = 1.15; // ราคาซื้อไอเทมแพงขึ้น 15% ทุกครั้งที่ซื้อ (มาตรฐานเกมแนว incremental)
const UPGRADE_MULTIPLIER_STEP = 1.2; // อัพเกรด 1 ครั้ง เพิ่ม pps ของไอเทมนั้น 20%
const UPGRADE_COST_GROWTH_RATE = 2.5; // ราคาอัพเกรดครั้งถัดไปแพงขึ้น 2.5 เท่าทุกครั้งที่อัพเกรด

//คำนวณราคารวมสำหรับซื้อไอเทม quantity ชิ้น ต่อจากจำนวนที่ owned อยู่แล้ว
//ราคาต่อชิ้นแพงขึ้นแบบทวีคูณ (baseCost * rate^owned) จึงรวมเป็นอนุกรมเรขาคณิต
function getBuyCost(item, quantity) {
  const totalCost =
    (item.cost *
      Math.pow(PRICE_GROWTH_RATE, item.owned) *
      (Math.pow(PRICE_GROWTH_RATE, quantity) - 1)) /
    (PRICE_GROWTH_RATE - 1);
  return Math.ceil(totalCost);
}

//คำนวณราคาอัพเกรดครั้งถัดไปของไอเทม (แพงขึ้นตาม upgradeLevel ปัจจุบัน)
function getUpgradeCost(item) {
  return Math.ceil(
    item.upgradeBaseCost * Math.pow(UPGRADE_COST_GROWTH_RATE, item.upgradeLevel)
  );
}

//function กลางสำหรับอัปเดตข้อความ EP และ point/second บนหน้าจอ
//(points ตัดทศนิยมออกตอนแสดงผลด้วย Math.floor แต่ค่าจริงข้างในยังเป็นทศนิยมอยู่ เพื่อไม่ให้เสีย progress สะสมจาก pointsPerSecond ที่เป็นทศนิยมได้ เช่น 2.4 EP/s)
function updateEP() {
  EP.textContent = `Evolution points(EP) : ${Math.floor(points)} points`;
  PPS.textContent = `+${pointsPerSecond.toFixed(1)} EP/s`;
}

//function กลางสำหรับสร้าง img ของไอเทม ใช้ได้ทั้งใน Shop และ Status
//(สร้าง element ใหม่ทุกครั้งที่เรียก เพราะ node เดิมย้ายไปวางซ้ำที่อื่นไม่ได้ รับ src มาจาก item.img)
function createItemImage(src) {
  const img = document.createElement(`img`);
  img.src = src;
  img.classList.add("imgItem");
  return img;
}

//คำนวณ pointsPerSecond ใหม่ทั้งหมดจาก owned x pps x multiplier ของทุกไอเทม
//(คำนวณใหม่ทุกครั้งแทนการบวกสะสม เพื่อให้ตอนมี upgrade มาคูณ multiplier ทีหลัง ค่าย้อนไปคูณของเก่าที่ถืออยู่ได้ถูกต้อง)
function recalcPointsPerSecond() {
  pointsPerSecond = shopItems.reduce(
    (sum, item) => sum + item.owned * item.pps * item.multiplier,
    0
  );
}

//แสดงรายการไอเทมที่ถือครองอยู่ พร้อมจำนวนและ multiplier ปัจจุบัน ในแท็บ Status
function updateStatus() {
  statusContainer.innerHTML = "";
  shopItems
    .filter((item) => item.owned > 0)
    .forEach((item) => {
      const statusRow = document.createElement(`div`);
      statusRow.classList.add("statusRow");

      const imgStatus = createItemImage(item.img);
      statusRow.append(imgStatus);

      const detailStatus = document.createElement(`div`);
      const totalPps = item.owned * item.pps * item.multiplier;
      detailStatus.textContent = `${item.name} : owned x${item.owned} | multiplier x${item.multiplier.toFixed(2)} | +${totalPps.toFixed(1)} EP/s`;
      statusRow.append(detailStatus);

      statusContainer.append(statusRow);
    });
}

//ซื้อไอเทม quantity ชิ้น ถ้า point พอครบราคารวมเท่านั้น (ไม่พอ = ไม่หักอะไรเลย)
function buyItem(item, quantity, onPurchased) {
  const totalCost = getBuyCost(item, quantity);
  if (points < totalCost) return;

  points -= totalCost;
  item.owned += quantity;
  recalcPointsPerSecond();
  updateEP();
  updateStatus();
  renderUpgrades();
  if (onPurchased) onPurchased();
}

//แสดงปุ่ม Upgrade สำหรับไอเทมที่ owned > 0 เท่านั้น (ต้องมีของก่อนถึงอัพเกรดได้)
function renderUpgrades() {
  upgradeContainer.innerHTML = "";
  shopItems
    .filter((item) => item.owned > 0)
    .forEach((item) => {
      const upgradeRow = document.createElement(`div`);
      upgradeRow.classList.add("upgradeRow");

      const imgUpgrade = createItemImage(item.img);
      upgradeRow.append(imgUpgrade);

      const detailUpgrade = document.createElement(`div`);
      detailUpgrade.classList.add("detailUpgrade");
      detailUpgrade.textContent = `${item.name} : upgrade level ${item.upgradeLevel} | multiplier x${item.multiplier.toFixed(2)}`;
      upgradeRow.append(detailUpgrade);

      const upgradeCost = getUpgradeCost(item);
      const buttonUpgrade = document.createElement(`button`);
      buttonUpgrade.classList.add("btn");
      buttonUpgrade.textContent = "Upgrade";
      buttonUpgrade.dataset.price = `${upgradeCost} EP`;

      //กด Upgrade แล้วหัก point ตามราคา คูณ multiplier ของไอเทมนี้เพิ่มขึ้น แล้ว render ใหม่ (ราคาครั้งถัดไปแพงขึ้น)
      buttonUpgrade.addEventListener("click", () => {
        if (points < upgradeCost) return;
        points -= upgradeCost;
        item.multiplier *= UPGRADE_MULTIPLIER_STEP;
        item.upgradeLevel++;
        recalcPointsPerSecond();
        updateEP();
        updateStatus();
        renderUpgrades();
      });
      upgradeRow.append(buttonUpgrade);

      upgradeContainer.append(upgradeRow);
    });
}

//ทุก 1 วินาที บวก point ตามอัตรา pointsPerSecond (interval เดียว ทำงานตลอด ไม่สร้างซ้ำตอนซื้อของ)
setInterval(() => {
  points += pointsPerSecond;
  updateEP();
}, 1000);

//สร้างพื้นที่สำหรับ click ใน story โดยการ add div click เข้ามา
const clickedArea = document.createElement(`div`);
clickedArea.classList.add("clickedArea");
clickedArea.textContent = "Cliked me please";
story.append(clickedArea);

//function การเปลี่ยน tap
shopTab.addEventListener("click", () => {
  shopDisplay.style.display = "block";
  upgradeDisplay.style.display = "none";
  statusDisplay.style.display = "none";
});
upgradeTab.addEventListener("click", () => {
  shopDisplay.style.display = "none";
  upgradeDisplay.style.display = "block";
  statusDisplay.style.display = "none";
});
statusTab.addEventListener("click", () => {
  shopDisplay.style.display = "none";
  upgradeDisplay.style.display = "none";
  statusDisplay.style.display = "block";
});

//function การ add item ใส่ ชื่อ
function addItem(item) {
  const shopItem1 = document.createElement(`div`);
  shopItem1.classList.add("shopItem");

  //เอา image เข้าไป shopItem1
  const imgShopitem1 = createItemImage(item.img);
  shopItem1.append(imgShopitem1);

  // เพิ่ม detail ลงไปใน item
  const detailShop1 = document.createElement(`div`);
  detailShop1.classList.add("detailShop");
  detailShop1.textContent = `${item.name} (+${item.pps} EP/s)`;
  shopItem1.append(detailShop1);

  //เพิ่ม button สำหรับการ Buy x1 , Buy x10 , Buy x100
  const buttonBuy_1 = document.createElement(`button`);
  const buttonBuy_10 = document.createElement(`button`);
  const buttonBuy_100 = document.createElement(`button`);
  [buttonBuy_1, buttonBuy_10, buttonBuy_100].forEach((btn) =>
    btn.classList.add("btn")
  );

  buttonBuy_1.textContent = "Buy\nx 1";
  buttonBuy_10.textContent = "Buy\nx 10";
  buttonBuy_100.textContent = "Buy\nx 100";

  //อัปเดตราคาที่โชว์ตอน hover (data-price) ให้ตรงกับ owned ปัจจุบันของไอเทมนี้ (ราคาแพงขึ้นทุกครั้งที่ซื้อ)
  function refreshBuyButtons() {
    buttonBuy_1.dataset.price = `${getBuyCost(item, 1)} EP`;
    buttonBuy_10.dataset.price = `${getBuyCost(item, 10)} EP`;
    buttonBuy_100.dataset.price = `${getBuyCost(item, 100)} EP`;
  }
  refreshBuyButtons();

  //กด Buy แล้วหัก point ตามราคารวม (ต้องพอครบเท่านั้น) เพิ่มจำนวน owned แล้วคำนวณอัตรา point/second รวมใหม่
  buttonBuy_1.addEventListener("click", () => buyItem(item, 1, refreshBuyButtons));
  buttonBuy_10.addEventListener("click", () => buyItem(item, 10, refreshBuyButtons));
  buttonBuy_100.addEventListener("click", () => buyItem(item, 100, refreshBuyButtons));

  shopItem1.append(buttonBuy_1);
  shopItem1.append(buttonBuy_10);
  shopItem1.append(buttonBuy_100);

  //เอา shopItem1 กับ detailShop1 เข้าไป shopContainer
  shopContainer.append(shopItem1);

  console.log(shopContainer.children.length);
}

//function การ unlock ร้านค้า
function unlockShop() {
  shopItems.forEach((items) => {
    if (points >= items.unlockEP && !items.isUnlock) {
      addItem(items);
      items.isUnlock = true;
      console.log(items);
    }
  });
}

// ใส่ร้านตรงนี้
// cost = ราคาชิ้นแรกที่ต้องจ่าย (ราคาจริงที่ต้องจ่ายแพงขึ้นเรื่อยๆ ตาม owned ผ่าน getBuyCost())
// pps = point/second พื้นฐานต่อ 1 ชิ้นของไอเทมนี้
// owned = จำนวนที่ซื้อไปแล้ว
// multiplier = ตัวคูณ pps ปัจจุบันจากการ upgrade, upgradeLevel = จำนวนครั้งที่อัพเกรดไปแล้ว
// upgradeBaseCost = ราคาอัพเกรดครั้งแรก (แพงขึ้นเรื่อยๆ ตาม upgradeLevel ผ่าน getUpgradeCost())
// img = path รูปของไอเทม ใช้ได้ทั้งใน Shop, Status และ Upgrade ผ่าน createItemImage()
const shopItems = [
  {
    name: "Paramecium",
    unlockEP: "10",
    isUnlock: false,
    cost: 10,
    pps: 2,
    owned: 0,
    multiplier: 1,
    upgradeLevel: 0,
    upgradeBaseCost: 50,
    img: "assets/icon/Paramecium-icon.jpg",
  },
  {
    name: "Trilobite",
    unlockEP: "15",
    isUnlock: false,
    cost: 25,
    pps: 3,
    owned: 0,
    multiplier: 1,
    upgradeLevel: 0,
    upgradeBaseCost: 125,
    img: "assets/icon/Trilobite-icon.jpg",
  },
  {
    name: "Fish",
    unlockEP: "20",
    isUnlock: false,
    cost: 50,
    pps: 5,
    owned: 0,
    multiplier: 1,
    upgradeLevel: 0,
    upgradeBaseCost: 250,
    img: "assets/icon/Fish-icon.jpg",
  },
];

//สร้าง function ที่รับการ click ของ user มา แล้วบวกค่า
story.addEventListener("click", () => {
  points++;
  updateEP();
  unlockShop();
});
