let topButton = document.getElementById("top-button");
let latestButton = document.getElementById("latest-button");
let relevantButton = document.getElementById("relevant-button");
let cardsList = document.getElementById("cards-list");
let programmingList = document.getElementById("programming-list");
let opensourceList = document.getElementById("opensource-list");
let productivityList = document.getElementById("productivity-list");
let postsData;
let token = localStorage.getItem("token");

const getPosts = async () => {
  let response = await fetch(
    "https://javascript-challenge-f0392-default-rtdb.firebaseio.com/.json"
  );
  let data = await response.json();
  console.log(data.posts);
  postsData = data.posts;
  printAllPosts(postsData);
  getPostsByTag(postsData);
};

getPosts();

const printAllPosts = (postsData) => {
  let cardsHtml = Object.keys(postsData).map((post) => {
    let { date, postimg, tags, userName, userImg, title, randomRating, comments } =
      postsData[post];
      console.log(post)

    if (randomRating === undefined || randomRating === null) {
      randomRating = (Math.random() * 10).toFixed(2);
      postsData[post].randomRating = randomRating;
    }

    return `<div class="card posts" style="width: 100%; border-radius: 5px">
        ${
          postimg
            ? `<img
        class="card-img-top"
        src="${postimg}"
        alt="..."
        />
        `
            : ""
        } 
        <div class="poster">
        <img
            class="rounded-5 post__photo"
            alt="algo"
            src="${userImg}"
            alt=""
        />
        <div class="post__info">
            <p class="post__name">${userName}</p>
            <br />
            <p class="post__date">Jan ${date}</p>
        </div>
        </div>
        <h1 class="post__title post-title" data-post-key =${post} >
        ${title}
        </h1>
        <div class="post__prog__lang">
        <div><button href="#" class="post__language">${Object.values(tags).join(
          "  "
        )}</button></div>
        </div>
        <div class="post__reactions d-flex d-row">
        <img src="sources/images/reactions.png" alt="" />
        <span class="reactions__number">Rating : ${randomRating} ⭐</span>
        <span class="comments__number"
            ><img src="sources/images/comments.png" alt="" />3
            Comments</span
        >
        <span class="time__read"
            >3 min read <i class="bi bi-bookmark"></i
        ></span>
        </div>
        <p class="reply__see__more">See all ${comments} comments</p>
    </div>`;
  });
  cardsList.innerHTML = cardsHtml.join("");


  let postTitle = document.querySelectorAll(".post-title");

  postTitle.forEach((button) => {
    button.addEventListener("click", (event) => {
      let postKey = event.currentTarget.dataset.postKey;
      window.open(`post/post-detail.html?postKey=${postKey}`, "_self");
    });
  });
};

const getPostsByTag = () => {
  const maxPostsPerTag = 3;
  const addedPostsCount = { productivity: 0, opensource: 0, programming: 0 };

  Object.keys(postsData).map((postKey) => {
    const { tags, title, comments } = postsData[postKey];
    if (Array.isArray(tags)) {
      const hasProductivityTag = tags.some(
        (tag) => tag && tag.includes("#productivity")
      );
      const hasOpenSourceTag = tags.some(
        (tag) => tag && tag.includes("#opensource")
      );
      const hasProgrammingTag = tags.some(
        (tag) => tag && tag.includes("#programming")
      );

      if (hasProductivityTag && addedPostsCount.productivity < maxPostsPerTag) {
        productivityList.innerHTML += `
                    <a class="listing__type" href="#" class="my-2 text-dark text-decoration-none">
                        ${title}
                        <div>
                            <a class="comment__vinc" href="#">${comments} comments</a>
                        </div>
                    </a>
                    <hr class="my-2" />
                `;
        addedPostsCount.productivity++;
      }
      if (hasOpenSourceTag && addedPostsCount.opensource < maxPostsPerTag) {
        opensourceList.innerHTML += `
                    <a class="listing__type" href="#" class="my-2 text-dark text-decoration-none">
                        ${title}
                        <div>
                            <a class="comment__vinc" href="#">${comments} comments</a>
                        </div>
                    </a>
                    <hr class="my-2" />
                `;
        addedPostsCount.opensource++;
      }
      if (hasProgrammingTag && addedPostsCount.programming < maxPostsPerTag) {
        programmingList.innerHTML += `
                    <a class="listing__type" href="#" class="my-2 text-dark text-decoration-none">
                        ${title}
                        <div>
                            <a class="comment__vinc" href="#">${comments} comments</a>
                        </div>
                    </a>
                    <hr class="my-2" />
                `;
        addedPostsCount.programming++;
      }
    }
  });
};

topButton.addEventListener("click", () => {
  cardsList.innerHTML = "";
  let postsArray = Object.entries(postsData); // Usar Object.entries para obtener [clave, valor]
  postsArray.sort(([, a], [, b]) => b.randomRating - a.randomRating);
  const postsObject = postsArray.reduce((acc, [postKey, post]) => {
    acc[postKey] = post;
    return acc;
  }, {});
  printAllPosts(postsObject);
});

relevantButton.addEventListener("click", () => {
  cardsList.innerHTML = "";
  let postsArray = Object.entries(postsData);
  postsArray.sort(([, a], [, b]) => a.id - b.id);
  const postsObject = postsArray.reduce((acc, [postKey, post]) => {
    acc[postKey] = post;
    return acc;
  }, {});
  printAllPosts(postsObject);
});

latestButton.addEventListener("click", () => {
  cardsList.innerHTML = "";
  let postsArray = Object.entries(postsData);
  const lastDate = postsArray.reduce((maxDate, [, post]) => {
    return post.date > maxDate ? post.date : maxDate;
  }, 0);
  const lastDayPosts = postsArray.filter(([, post]) => post.date === lastDate);
  const lastDayPostsObject = lastDayPosts.reduce((acc, [postKey, post]) => {
    acc[postKey] = post;
    return acc;
  }, {});
  printAllPosts(lastDayPostsObject);
});

document.getElementById("login-btn").addEventListener("click", () => {
  window.open("/enter.html", "_self");
});

if (token) {
  let buttonElement = document.getElementById("login-btn");
  buttonElement.innerHTML = "Logout";
  buttonElement.id = "log-out";
  let buttonCreatePost = document.getElementById("create-account")
  buttonCreatePost.innerHTML = "Create Post";
  buttonCreatePost.id = "create-post";
}

document.getElementById("log-out").addEventListener("click", () => {
  localStorage.removeItem("token");
  window.open("../index.html", "_self");
  printAllPosts(postsData);
});

document.getElementById("create-post").addEventListener("click", () => {
  window.open("../newPost/createpost.html", "_self");
});

/*SEARCH*/
//document.addEventListener("keyup", (e) => {
  //if (e.target.matches("#buscador")) {
    //document.querySelectorAll(".posts").forEach((word) => {
      //word.textContent.toLowerCase().includes(e.target.value)
        //? word.classList.remove("filtro")
        //: word.classList.add("filtro");
   // });
 // }
//});

postTitle.addEventListener("click", (event) => {
   console.log(event.target);
   console.log(event.target.dataset.postKey);
   let postKey = event.target.dataset.postKey;

   window.open(`views/char-detail.html?postId=${postKey}`);
 });

/*fin*/


