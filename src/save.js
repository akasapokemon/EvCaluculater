let index = 0;
const save = () => {
  let resultText = document.getElementById("result").innerHTML;
  localStorage.setItem(indexNumber,resultText);
  index++;
}