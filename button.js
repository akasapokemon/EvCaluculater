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
  let title = div.children[1];
  title.textContent = input.value;
  let result = div.children[2];
  // ストレージに保存
  localStorage.setItem(id,JSON.stringify({title:title.textContent,result:result.textContent}));
  // タイトルの表示、要素の削除
  title.hidden = false;
  div.removeChild(input);
  // 二回以上のクリックを防ぐ
  element.disabled = true;
  editBtn.disabled = false;
}

const remove = (element) => {
  let id = element.id.replace(/remove-button/g,"");
  let div = document.getElementById(id);
  let isRemove = confirm("本当に削除しますか？");
  if (isRemove) {
    localStorage.removeItem(id);
    div.parentNode.removeChild(div);
  } else {
    return;
  }
}