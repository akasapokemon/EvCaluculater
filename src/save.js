let indexNumber = 0;
const save = () => {
  let resultText = document.getElementById("result").innerHTML;
  localStorage.setItem(indexNumber,resultText);
  indexNumber++;
}