
const createList = () => {
  let items = document.getElementById("items");
  if (localStorage.length != 0) {
    for (let i = 0; i < localStorage.length; i++) {
      let title = document.createElement("h3");
      title.setAttribute("id",i);
      title.textContent = JSON.parse(localStorage.getItem(i)).title;
      // Element作成
      let li = document.createElement("li");
      li.textContent = JSON.parse(localStorage.getItem(i)).result;
      let editBtn = document.createElement("button");
      editBtn.setAttribute("type","button");
      title.setAttribute("id","button" + i);
      editBtn.setAttribute("onclick","edit();");
      editBtn.textContent = "edit";
      // 各要素をitems(ol)の子要素として追加
      items.appendChild(title);
      items.appendChild(li);
      items.appendChild(editBtn);
    }
  }
}

// タイトルのみ
const edit = () => {
  
  console.log(document.getElementById(id));
}

window.onload = () => {
  createList();
}