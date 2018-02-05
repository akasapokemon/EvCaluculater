const createList = () => {
  let items = document.getElementById("items");
  for (let i = 0; i < localStorage.length; i++) {
    let li = document.createElement('li');
    items.appendChild(li);
    items.children[i].innerHTML = localStorage.getItem(i);
  }
}

window.onload = () => {
  createList();
}