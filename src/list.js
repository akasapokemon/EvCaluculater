const createList = () => {
  let items = document.getElementById("items");
  if (localStorage.length != 0) {
    for (let index = 0; index < localStorage.length; index++) {
      // Element作成
      let li = document.createElement("li");
      li.setAttribute("id",index);

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
      items.appendChild(li);
      li.appendChild(title);
      li.appendChild(item);
      items.appendChild(editBtn);
      items.appendChild(saveBtn);
      items.appendChild(removeBtn);
    }
  }
}


window.onload = () => {
  createList();
}