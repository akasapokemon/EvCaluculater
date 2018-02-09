let index = 0;
const add = () => {
  let title = document.getElementById("title");
  if (title.value === "") {
    alert("タイトルを入力してください");
    return;
  }
  let result = document.getElementById("result");
  localStorage.setItem(index,JSON.stringify({title:title.value,result:result.textContent}));
  location.reload();
  index++;
}