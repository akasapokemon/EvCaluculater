const add = () => {
  let index = localStorage.length;
  let title = document.getElementById("title");
  if (title.value === "") {
    alert("タイトルを入力してください");
    return;
  }
  let result = document.getElementById("result");
  let pickedTimes = result.textContent.slice(result.textContent.indexOf(" ") + 1);
  let currentTimes = parseInt(pickedTimes.slice(0,pickedTimes.indexOf("回")));
  localStorage.setItem(index,JSON.stringify({
    title:title.value,
    result:result.textContent,
    currentTimes:currentTimes
  }));
  location.reload();
}

const edit = (element) => {
  let id = element.id.replace(/edit-button/g,"");
  let div = document.getElementById(id);
  let saveBtn = document.getElementById("save-button" + id);
  // タイトル
  div.firstElementChild.hidden = true;
  let input = document.createElement("input");
  input.setAttribute("type","text");
  input.setAttribute("name","input");
  div.insertBefore(input,div.firstElementChild);
  // 二回以上のクリックを防ぐ
  element.disabled = true;
  saveBtn.disabled = false;
}

const save = (element) => {
  let id = element.id.replace(/save-button/g,"");
  let div = document.getElementById(id);
  let editBtn = document.getElementById("edit-button" + id);
  let input = div.children[0];
  if (input.value === "") {
    alert("タイトルを入力してください");
    return;
  }
  // editを押した時点でのタイトルを取得
  let value = JSON.parse(localStorage.getItem(id));
  value.title = input.value;
  // ストレージに保存
  localStorage.setItem(id, JSON.stringify(value));
  div.removeChild(input);
  div.children[0].textContent = value.title;
  div.children[0].hidden = false;
  // 二回以上のクリックを防ぐ
  element.disabled = true;
  editBtn.disabled = false;
}

const deleteElement = (element) => {
  let id = element.id.replace(/delete-button/g,"");
  let div = document.getElementById(id);
  let isDelete = confirm("本当に削除しますか？");
  if (isDelete) {
    localStorage.removeItem(id);
    div.parentNode.removeChild(div);
  } else {
    return;
  }
}

const deleteAll = (element) => {
  if (localStorage.length != 0) {
    let items = document.getElementById("items");
    let isDeleteAll = confirm("全てのタスクを削除しますか？");
    if (isDeleteAll) {
      for (let index = 0; index < localStorage.length; index++) {
        localStorage.removeItem(index);
      }
      items.textContent = null;
      element.parentNode.removeChild(element);
    }
  }
}

const increment = (element) => {
  let id = element.id.replace(/increment-button/g,"");
  let div = document.getElementById(id);
  let value = JSON.parse(localStorage.getItem(id));
  let resultText = div.children[1].textContent;
  value.currentTimes++;
  div.children[1].textContent = resultText.slice(0,resultText.indexOf(" ")) + " " + value.currentTimes + " 回";
  localStorage.setItem(id, JSON.stringify(value));
}

const decrement = (element) => {
  let id = element.id.replace(/decrement-button/g,"");
  let div = document.getElementById(id);
  let value = JSON.parse(localStorage.getItem(id));
  let resultText = div.children[1].textContent;
  value.currentTimes--;
  div.children[1].textContent = resultText.slice(0,resultText.indexOf(" ")) + " " + value.currentTimes + " 回";
  localStorage.setItem(id, JSON.stringify(value));
}