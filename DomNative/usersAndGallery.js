/*
<section id="user-section" aria-live="polite"></section>

<template id="card-template">
  <article class="card-container">
    <h3 class="user-name"></h3>
    <p class="user-address"></p>
    <p class="user-email"></p>
  </article>
</template>
*/

const URL = "https://jsonplaceholder.typicode.com/users";

async function getUsers(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
}

function renderUsers(users, domRoot) {
  if (!Array.isArray(users) || !domRoot) return;

  const template = document.getElementById("card-template");
  const fragment = document.createDocumentFragment();

  users.forEach((user) => {
    const cardInstance = template.content.cloneNode(true);
    cardInstance.querySelector(".user-name").textContent = user.name;
    cardInstance.querySelector(".user-address").textContent =
      user.address?.city ?? "N/A";
    cardInstance.querySelector(".user-email").textContent = user.email;

    fragment.append(cardInstance);
  });

  domRoot.replaceChildren(fragment);
}

async function init() {
  const root = document.getElementById("user-section");
  try {
    const users = await getUsers(URL);
    renderUsers(users, root);
  } catch (error) {
    console.error("Failed to load users:", error);
    root.textContent = "Unable to load user cards at this time.";
  }
}

init();
