const createList = () => {
  let items = document.getElementById("items");
  if (localStorage.length != 0) {
    for (let index = 0; index < localStorage.length; index++) {
      
      let div = document.createElement("div");
      div.setAttribute("class","border border-secondary w-25 p-3 mb-2");
      div.setAttribute("id",index);

      let value = JSON.parse(localStorage.getItem(index));

      let title = document.createElement("h5");
      title.setAttribute("class","ml-2");
      title.textContent = value.title;

      let item = document.createElement("p");
      item.setAttribute("class","ml-3");
      let result = value.result;
      result = result.slice(0,result.indexOf(" ")) + " " + value.currentTimes + " 回";
      item.textContent = result;

      let changers = document.createElement("div");
      changers.setAttribute("class","btn-toolbar ml-2 mb-2");
      let incrementGroup = document.createElement("div");
      incrementGroup.setAttribute("class","btn-group mr-2");
      let decrementGroup = document.createElement("div");
      decrementGroup.setAttribute("class","btn-group");
      

      let incrementBtn = document.createElement("button");
      incrementBtn.setAttribute("class","btn btn-outline-primary btn-sm");
      incrementBtn.setAttribute("type"," button");
      incrementBtn.setAttribute("id","increment-button" + index);
      incrementBtn.setAttribute("name", "change");
      incrementBtn.setAttribute("onclick","increment(this)");
      incrementBtn.textContent = "+";
      isEnabled(incrementBtn,"increment",value.currentTimes);

      let decrementBtn = document.createElement("button");
      decrementBtn.setAttribute("class","btn btn-outline-danger btn-sm");
      decrementBtn.setAttribute("type"," button");
      decrementBtn.setAttribute("id","decrement-button" + index);
      decrementBtn.setAttribute("name", "change");
      decrementBtn.setAttribute("onclick","decrement(this)");
      decrementBtn.textContent = "-";
      isEnabled(decrementBtn,"decrement",value.currentTimes);

      let buttons = document.createElement("div");
      buttons.setAttribute("class","btn-toolbar ml-2");
      let saveGroup = document.createElement("div");
      saveGroup.setAttribute("class","btn-group mr-2");
      let editGroup = document.createElement("div");
      editGroup.setAttribute("class","btn-group mr-2");
      let deleteGroup = document.createElement("div");
      deleteGroup.setAttribute("class","btn-group");


      let saveBtn = document.createElement("button");
      saveBtn.setAttribute("type","button");
      saveBtn.setAttribute("id","save-button" + index);
      saveBtn.setAttribute("class","btn btn-outline-success");
      saveBtn.setAttribute("onclick","save(this);");
      saveBtn.textContent = "save";
      saveBtn.disabled = true;

      let editBtn = document.createElement("button");
      editBtn.setAttribute("type","button");
      editBtn.setAttribute("id","edit-button" + index);
      editBtn.setAttribute("class","btn btn-outline-secondary");
      editBtn.setAttribute("onclick","edit(this);");
      editBtn.textContent = "edit";

      let deleteBtn = document.createElement("button");
      deleteBtn.setAttribute("type","button");
      deleteBtn.setAttribute("id","delete-button" + index);
      deleteBtn.setAttribute("class","btn btn-outline-danger");
      deleteBtn.setAttribute("onclick","deleteElement(this);");
      deleteBtn.textContent = "delete";

      if (!document.getElementById("delete-all-button")) {
        let h2 = document.getElementsByTagName("h2")[2];
        let deleteAllBtn = document.createElement("button");
        deleteAllBtn.setAttribute("class","btn btn-danger btn-sm ml-2");
        deleteAllBtn.setAttribute("id","delete-all-button");
        deleteAllBtn.setAttribute("type","button");
        deleteAllBtn.setAttribute("onclick","deleteAll(this);");
        deleteAllBtn.textContent = "deleteAll";
        h2.appendChild(deleteAllBtn);
      }

      // 各要素をitems(ol)の子要素として追加
      items.appendChild(div);
      div.appendChild(title);
      div.appendChild(item);
      div.appendChild(changers);
      changers.appendChild(incrementGroup);
      changers.appendChild(decrementGroup);
      incrementGroup.appendChild(incrementBtn);
      decrementGroup.appendChild(decrementBtn);
      div.appendChild(buttons);
      buttons.appendChild(saveGroup);
      buttons.appendChild(editGroup);
      buttons.appendChild(deleteGroup);
      saveGroup.appendChild(saveBtn);
      editGroup.appendChild(editBtn);
      deleteGroup.appendChild(deleteBtn);
    }
  }
}

const isEnabled = (element,type,value) => {
  if (type === "increment" && value === 252) {
    element.disabled = true;
  } else if (type === "decrement" && value === 0) {
    element.disabled = true;
  } else {
    element.disabled = false;
  }
}

window.onload = () => {
  createList();
}