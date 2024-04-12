/*construye un objeto del tipo searchParams, que contiene todos los parámetros que pasamos en la url*/
const urlParams = new URLSearchParams(window.location.search);

console.log(urlParams);

/*extraemos un parámetro específico y lo guardamos en una variable*/
const postKey = urlParams.get("postKey");

console.log(postKey);

const getPostByKey = async (postKey) => {
  let response = await fetch(
    `https://javascript-challenge-f0392-default-rtdb.firebaseio.com/posts/${postKey}.json`
  );
  let data = await response.json();
  let { postimg, title, userImg, date, userName } = data;

  postimg
    ? document.getElementById("post-img").setAttribute("src", postimg)
    : document
        .getElementById("post-img")
        .setAttribute(
          "src",
          "https://res.cloudinary.com/practicaldev/image/fetch/s--tEt0Xh96--/c_imagga_scale,f_auto,fl_progressive,h_420,q_66,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/byraqw5oiy8jr892fgzs.gif"
        );
  document.getElementById("post-user").innerText = userName;
  document.getElementById("post-userimg").setAttribute("src", userImg);
  document.getElementById("post-user2").innerText = userName;
  document.getElementById("post-userimg2").setAttribute("src", userImg);
  document.getElementById("post-date").innerText = `Posted on ${date} jan`;
  document.getElementById("post-title").innerText = title;
  console.log(title);
  console.log(data);
};

getPostByKey(postKey);
