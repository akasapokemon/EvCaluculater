let index = 0;
const save = () => {
  let titleText = document.getElementById("title").value;
  if (titleText === "") {
    alert("タイトルを入力してください");
    location.reload();
    return;
  }
  let resultText = document.getElementById("result").textContent;
  localStorage.setItem(index,JSON.stringify({title:titleText,result:resultText}));
  index++;
}