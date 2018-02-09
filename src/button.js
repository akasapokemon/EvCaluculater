const edit = (element) => {
  let id = element.id.replace(/edit-button/g,"");
  let li = document.getElementById(id);
  let saveBtn = document.getElementById("save-button" + id);
  // タイトル
  li.firstElementChild.hidden = true;
  let input = document.createElement("input");
  input.setAttribute("type","text");
  input.setAttribute("name","input");
  li.insertBefore(input,li.firstElementChild);
  // 二回以上のクリックを防ぐ
  element.disabled = true;
  saveBtn.disabled = false;
}

const save = (element) => {
  let id = element.id.replace(/save-button/g,"");
  let li = document.getElementById(id);
  let editBtn = document.getElementById("edit-button" + id);
  let input = li.children[0];
  if (input.value === "") {
    alert("タイトルを入力してください");
    return;
  }
  // editを押した時点でのタイトルを取得
  let title = li.children[1];
  title.textContent = input.value;
  let result = li.children[2];
  // ストレージに保存
  localStorage.setItem(id,JSON.stringify({title:title.textContent,result:result.textContent}));
  // タイトルの表示、要素の削除
  title.hidden = false;
  li.removeChild(input);
  // 二回以上のクリックを防ぐ
  // element.disabled = true;
  element.disabled = true;
  editBtn.disabled = false;
}

const remove = () => {
}