"use strict";
const main = document.querySelector("main");
const article = document.createElement("article");
//recuperar personajes
const createCard = (personaje) => {
  const drawCard = personaje.map((char) => {
    return `
    <p>${char.character}</p>
    <img src = "${char.image}"  />
    <p>${char.quote}</p>
`;
  });

  main.append(article);
  article.innerHTML = drawCard;
};



const form = document.forms.formulario;
const doSearch = async (e) => {
  e.preventDefault();

  const containCloud = document.getElementById("cloud");
  const values = new FormData(form);
  const nameChar = values.get("searchChar");
  try {
    const url = `https://thesimpsonsquoteapi.glitch.me/quotes?count=1&character=${nameChar}`;
    const response = await fetch(url);

    const data = await response.json();
    if (data.length === 0) {
      console.log("ups");
      main.append(article);
      article.innerHTML = `<img src="../imgs/homer-brain.gif" />
      <p>UPS!!!</p>
      <p>NO HEMOS ENCONTRADO EL PERSONAJE</p>`
      containCloud.style.cssText = ` margin : 100px 5px;`


    } else {
      createCard(data);
      containCloud.style.cssText = ` margin : 100px 5px;`

    }
  } catch (error) {
    console.log("Ha surgido un error", error.messege);
  }
};
form.addEventListener("submit", doSearch);
