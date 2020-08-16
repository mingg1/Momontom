const body = document.querySelector("body");
const ACCESS_KEY = "sX10RmJgl0KFXo_C_pACNLmESR8_Pr_dssy4B-Ao_L8";

function getRandomImg(img) {
  fetch(
    `https://api.unsplash.com/photos/random/?client_id=${ACCESS_KEY}&fit=scale`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      console.log(json);
      const imgUrl = json.urls.regular;
      const bgImg = new Image();
      bgImg.src = imgUrl;
      bgImg.classList.add("bgImage");
      body.appendChild(bgImg);
    });
}

function init() {
  getRandomImg();
}

init();
