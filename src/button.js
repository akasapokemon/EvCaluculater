const add = () => {
  console.log("pass");
  let index = localStorage.length;
  let status = document.getElementById("status");
  let result = document.getElementById("result");
  let move = document.getElementById("move");
  let movePP = document.getElementById("move-pp");
  let pickedTimes = result.textContent.slice(result.textContent.indexOf(" ") + 1);
  let killingTimes = parseInt(pickedTimes.slice(0,pickedTimes.indexOf("回")));
  if (move.value === "") {
    alert("戦闘に使用する技を入力してください");
    return;
  }
  if (movePP.value === "") {
    alert("現在のPPを入力してください");
    return;
  } else if (parseInt(movePP.value) < 1 || parseInt(movePP.value) > 64) {
    alert("技のPPを1~64の範囲で入力してください");
    return;
  }
  localStorage.setItem(index,JSON.stringify({
    title:title.value,
    status:status.value,
    result:result.textContent,
    maxTimes:killingTimes,
    currentTimes:killingTimes,
    move:move.value,
    movePP:parseInt(movePP.value)
  }));
  // location.reload();
}

const edit = (element) => {
  let id = element.id.replace(/edit-button/g,"");
  let div = document.getElementById(id);
  let value = JSON.parse(localStorage.getItem(id));
  let saveBtn = document.getElementById("save-button" + id);
  let incrementBtn = document.getElementById("increment-button" + id);
  let decrementBtn = document.getElementById("decrement-button" + id);
  // タイトル
  div.firstElementChild.hidden = true;
  let input = document.createElement("input");
  input.setAttribute("type","text");
  input.setAttribute("class","form-control ml-3 w-75");
  input.setAttribute("maxlength","10");
  input.setAttribute("name","input");
  input.value = value.title;
  div.insertBefore(input,div.firstElementChild);
  // 二回以上のクリックを防ぐ
  element.disabled = true;
  saveBtn.disabled = false;
  incrementBtn.disabled = true;
  decrementBtn.disabled = true;
}

const save = (element) => {
  let id = element.id.replace(/save-button/g,"");
  let div = document.getElementById(id);
  let editBtn = document.getElementById("edit-button" + id);
  let incrementBtn = document.getElementById("increment-button" + id);
  let decrementBtn = document.getElementById("decrement-button" + id);
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
  div.children[0].textContent = "「" + value.title + "」";
  div.children[0].hidden = false;
  // 二回以上のクリックを防ぐ
  incrementBtn.disabled = false;
  decrementBtn.disabled = false;
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
    location.reload();
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
      location.reload();
    }
  }
}

const increment = (element) => {
  let id = element.id.replace(/increment-button/g,"");
  let div = document.getElementById(id);
  let value = JSON.parse(localStorage.getItem(id));
  let resultText = div.children[2].textContent; 
  if (value.maxTimes === value.currentTimes || value.currentTimes === 252) {
    return;
  }
  value.currentTimes++;
  div.children[2].textContent = resultText.slice(0,resultText.indexOf(" ")) + " " + value.currentTimes + " 回";
  localStorage.setItem(id, JSON.stringify(value));
}

const decrement = (element) => {
  let id = element.id.replace(/decrement-button/g,"");
  let div = document.getElementById(id);
  let value = JSON.parse(localStorage.getItem(id));
  let resultText = div.children[2].textContent;
  if (value.currentTimes === 0) {
    return;
  }
  value.currentTimes--;
  div.children[2].textContent = resultText.slice(0,resultText.indexOf(" ")) + " " + value.currentTimes + " 回";
  localStorage.setItem(id, JSON.stringify(value));
}