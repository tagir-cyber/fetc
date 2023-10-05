// let el = document.createDocumentFragment();

// console.log(el);

// Мар и Set

// let mapi = new Map();

// let arr1 = [1, 2, 3, 4];

// let cars = [
//   {
//     name: "lambo",
//     model: "huracan",
//     year: 2019,
//     power: 600,
//   },
//   {
//     name: "ferrari",
//     model: "enzo",
//     year: 2022,
//     power: 400,
//   },
//   {
//     name: "jeep",
//     model: "cheroki",
//     year: 2010,
//     power: 140,
//   },
// ];

// mapi.set(cars, "В качестве ключа массив с объектами");
// mapi.set(1, "1");
// mapi.set("1", 2);
// mapi.set(arr1, "Здесь в качестве ключа используется массив");

// console.log(mapi.get(arr1));
// console.log(mapi.get(cars));
// console.log(mapi.get("1"));

// console.log(mapi.keys());

// for (const iterator of mapi.keys()) {
//   // console.log(iterator[0]);
//   iterator.forEach((element) => {
//     console.log(element);
//   });
// }
let count = 4;
let path = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
let pathDrowACard = "https://deckofcardsapi.com/api/deck/";
let pathEnd = "/draw/?count=" + count;
let list = createElement("ul", "list");

function getApi(myPath) {
  async function func() {
    let res = await fetch(myPath);
    let json = await res.json();

    console.log(json);

    async function getCard() {
      let resNew = await fetch(pathDrowACard + json.deck_id + pathEnd);
      let peremenn = await resNew.json();
      let cards = peremenn.cards.concat(peremenn.cards);

      //Функция чтобы перемешать получившийся массив из карт. 
      const shuffle = (array) => {
        let m = array.length,
          t,
          i;

        // Пока есть элементы для перемешивания
        while (m) {
          // Взять оставшийся элемент
          i = Math.floor(Math.random() * m--);

          // И поменять его местами с текущим элементом
          t = array[m];
          array[m] = array[i];
          array[i] = t;
        }

        return array;
      };
      cards = shuffle(cards);

      console.log(peremenn);
      console.log(cards);

      render(cards);
    }
    getCard();
  }

  func();
}

function render(cards) {
  list.innerHtml = "";
  let li;
  cards.forEach((element) => {
    li = createElement("li", "item");
    li.addEventListener("click", function(){
        // console.log(this.closest(".list"));
    })
    li.style.background = `url("${element.image}")`;
    list.append(li);
  });

  document.body.append(list);
}

// function createImage(className, attr, attrValue, altValue) {
//   let img = document.createElement("img");
//   img.setAttribute("alt", altValue);
//   img.setAttribute(attr, attrValue);
//   img.classList.add(className);
//   return img;
// }

function createElement(tagName, className) {
  let element = document.createElement(tagName);
  element.classList.add(className);
  return element;
}

getApi(path);
