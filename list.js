const createList = () => {
  let items = document.getElementById("items");
  if (localStorage.length != 0) {
    for (let index = 0; index < localStorage.length; index++) {
      // Element作成
      let div = document.createElement("div");
      div.setAttribute("id",index);

      let title = document.createElement("p");
      title.textContent = JSON.parse(localStorage.getItem(index)).title;

      let item = document.createElement("p");
      item.textContent = JSON.parse(localStorage.getItem(index)).result;

      let editBtn = document.createElement("button");
      editBtn.setAttribute("type","button");
      editBtn.setAttribute("id","edit-button" + index);
      editBtn.setAttribute("onclick","edit(this);");
      editBtn.textContent = "edit";

      let saveBtn = document.createElement("button");
      saveBtn.setAttribute("type","button");
      saveBtn.setAttribute("id","save-button" + index);
      saveBtn.setAttribute("onclick","save(this);");
      saveBtn.textContent = "save";
      saveBtn.disabled = true;

      let removeBtn = document.createElement("button");
      removeBtn.setAttribute("type","button");
      removeBtn.setAttribute("id","remove-button" + index);
      removeBtn.setAttribute("onclick","remove(this);");
      removeBtn.textContent = "remove";

      // 各要素をitems(ol)の子要素として追加
      items.appendChild(div);
      div.appendChild(title);
      div.appendChild(item);
      div.appendChild(editBtn);
      div.appendChild(saveBtn);
      div.appendChild(removeBtn);
    }
  }
}


window.onload = () => {
  createList();
}