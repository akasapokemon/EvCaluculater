const createList = () => {
  let items = document.getElementById("items");
  if (localStorage.length != 0) {
    for (let index = 0; index < localStorage.length; index++) {

      let item = document.createElement("div");
      item.setAttribute("class", "border border-primary w-25 p-3 mt-4 ml-3");
      item.setAttribute("id", index);

      let value = JSON.parse(localStorage.getItem(index));

      let title = document.createElement("h5");
      title.setAttribute("class", "ml-2");
      title.textContent = "「" + value.title + "」";

      let status = document.createElement("p");
      status.setAttribute("class", "ml-3");
      status.textContent = "パラメーター: " + value.status;

      let result = document.createElement("p");
      result.setAttribute("class", "ml-3");
      let resultText = value.result;
      resultText = resultText.slice(0, resultText.indexOf(" ")) + " " + value.currentTimes + " 回";
      result.textContent = resultText;

      let changers = document.createElement("div");
      changers.setAttribute("class", "row ml-3 mb-2");
      changers.setAttribute("id","changers");

      let incrementBtn = document.createElement("button");
      incrementBtn.setAttribute("type", " button");
      incrementBtn.setAttribute("class", "btn btn-outline-primary col-xs-1");
      incrementBtn.setAttribute("id", "increment-button" + index);
      incrementBtn.setAttribute("onclick", "increment(this)");
      incrementBtn.textContent = "＋";

      let decrementBtn = document.createElement("button");
      decrementBtn.setAttribute("type", " button");
      decrementBtn.setAttribute("class", "btn btn-outline-danger col-xs-1 ml-2");
      decrementBtn.setAttribute("id", "decrement-button" + index);
      decrementBtn.setAttribute("onclick", "decrement(this)");
      decrementBtn.textContent = "ー";

      let buttons = document.createElement("div");
      buttons.setAttribute("class", "row ml-3 mt-3");

      let saveBtn = document.createElement("button");
      saveBtn.setAttribute("type", "button");
      saveBtn.setAttribute("class", "btn btn-outline-success col-sm-3");
      saveBtn.setAttribute("id", "save-button" + index);
      saveBtn.setAttribute("onclick", "save(this);");
      saveBtn.textContent = "save";
      saveBtn.disabled = true;

      let editBtn = document.createElement("button");
      editBtn.setAttribute("type", "button");
      editBtn.setAttribute("class", "btn btn-outline-secondary col-sm-3 ml-2");
      editBtn.setAttribute("id", "edit-button" + index);
      editBtn.setAttribute("onclick", "edit(this);");
      editBtn.textContent = "edit";

      let deleteBtn = document.createElement("button");
      deleteBtn.setAttribute("type", "button");
      deleteBtn.setAttribute("class", "btn btn-outline-danger col-sm-3 ml-2");
      deleteBtn.setAttribute("id", "delete-button" + index);
      deleteBtn.setAttribute("onclick", "deleteElement(this);");
      deleteBtn.textContent = "delete";

      if (!document.getElementById("delete-all-button")) {
        let h2 = document.getElementsByTagName("h2")[2];
        let deleteAllBtn = document.createElement("button");
        deleteAllBtn.setAttribute("type", "button");
        deleteAllBtn.setAttribute("class", "btn btn-danger btn-sm ml-2");
        deleteAllBtn.setAttribute("id", "delete-all-button");
        deleteAllBtn.setAttribute("onclick", "deleteAll(this);");
        deleteAllBtn.textContent = "deleteAll";
        h2.appendChild(deleteAllBtn);
      }

      // 各要素をitems(ol)の子要素として追加
      items.appendChild(item);
      item.appendChild(title);
      item.appendChild(status);
      item.appendChild(result);
      item.appendChild(changers);
      changers.appendChild(incrementBtn);
      changers.appendChild(decrementBtn);
      item.appendChild(buttons);
      buttons.appendChild(saveBtn);
      buttons.appendChild(editBtn);
      buttons.appendChild(deleteBtn);
    }
  }
}

const isEnabled = (element, type, value) => {
  if (type === "increment" && value === 252) {
    element.disabled = true;
  } else if (type === "decrement" && value === 0) {
    element.disabled = true;
  } else {
    element.disabled = false;
  }
}

const appendValue = (value) => {
  let hoge = document.getElementById("Ev-Value");
  while (value != 0) {
    let valueOption = document.createElement("option");
    valueOption.textContent = value;
    hoge.appendChild(valueOption);
    if (value != 4) {
      value = value - 8;
    } else {
      value = value - 4;
    }
  }
}

window.onload = () => {
  createList();
  appendValue(252);
}