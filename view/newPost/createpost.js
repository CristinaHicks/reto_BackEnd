/*TOOLTIPS - MENSAJES HOVER DE LOS BOTONES*/
const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);

/*FORMULARIO CREAR POST*/
let title = document.getElementById("postTitleTxt");
let tags = document.getElementById("tagInputPost");
let postimg = document.getElementById("coverImgBtn");
let txt = document.getElementById("textAreaPost");
let comments = document.getElementById("commentInputPost");
let date = document.getElementById("dateInputPost");
let id = document.getElementById("idInputPost");
let userName = document.getElementById("userNameInputPost");
let userImg = document.getElementById("userImgInputPost");

let postsArray = [];

const savePost = async (post) => {
  let response = await fetch(
    "https://javascript-cha./llenge-f0392-default-rtdb.firebaseio.com/posts/.json",
    {
      method: "POST",
      body: JSON.stringify(post),
    }
  );
  let data = await response.json();
  return data;
};

let publishPostButton = document.getElementById("publishBtn");

publishPostButton.addEventListener("click", async (event) => {
  event.preventDefault();

  let title = postTitleTxt.value;
  let tags = tagInputPost.value;
  let postimg = coverImgBtn.value;
  let txt = textAreaPost.value;
  let comments = commentInputPost.value;
  let date = dateInputPost.value;
  let id = idInputPost.value;
  let userName = userNameInputPost.value;
  let userImg = userImgInputPost.value;

  if (
    title ||
    tags ||
    postimg ||
    txt ||
    comments ||
    date ||
    id ||
    userName ||
    userImg
  ) {
    let post = {
      title,
      tags,
      postimg,
      txt,
      comments,
      date,
      id,
      userName,
      userImg,
    };
    let result = await savePost(post);
    console.log(result);
  } else {
    alert("Por favor, complete los cambios obligatorios");
    return;
  }

  window.open("../index.html", "_self");
});
