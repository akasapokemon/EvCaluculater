
// if this variable`s value is "2", a pokemon is infected.
let pokerusValue = 1;
let isInfected = false;

// if this variable`s value is "2", consider calling fellow.
let fellowValue = 1;
let isCallFellow = false;

// if this variable`s value is "8", a pokemon has EV-enhancing-item.
let evItemValue = 0;
let hasEvItem = false;

// caluculate関連
let appointedEvValue = 0;
let isCounterStop = false;
let evPokerusList = [36,18,4,2];
let evDefaultList = [18,9,2,1];
let resultsList= ['パワー系＆仲間呼び ','パワー系＆仲間呼び無し ',
                    'パワー系無し＆仲間呼び ','パワー系無し＆仲間呼び無し '];
let isAddedList = [false,false,false,false];

//------- Functions which are made for onclick Event. ----------

const setPokerus = () => {
  isInfected = true;
  pokerusValue = 2;
}

const setOption = (optionName,value) => {
  let pokerus = document.getElementById("pokerus");
  let callFellow = document.getElementById("call-fellow");
  let evItem = document.getElementById("Ev-Item");
  switch(optionName) {
    case "pokerus":
      if (pokerus.checked) {
        pokerusValue = value;
        isInfected = true;
      }
      break;
    case "fellow":
      if (callFellow.checked) {
        fellowValue = value;
        isCallFellow = true;
      }
      break;
    case "evItem":
      if (evItem.checked) {
        evItemValue = value;
        hasEvItem = true;
      }
      break;
  }
}

// Counter Stop　が押されていたらInputはoffに
const syncBtn = (bool) => {
  let counterStop = document.getElementById("counter-stop");
  let inputEv = document.getElementById("Ev-Value");
  isCounterStop = counterStop.checked;
  inputEv.disabled = bool;
}

const parseValue = (value) => {
  let counterStop = document.getElementById("counter-stop");
  if (value === "" && !counterStop.checked) {
    alert("値を指定してください");
    location.reload();
    return false;
  } else if (parseInt(value) <= 0 || parseInt(value) > 252) {
    alert("1~252の数値を指定してください");
    location.reload();
    return false;
  } else {
    return parseInt(value);
  } 
}

const showResult = (list) => {
  let showList = [];
  let resultTag = document.getElementsByTagName("h2")[0];
  let resultText = document.getElementById("result");
  let saveBtn = document.getElementById("save-button");
  resultTag.hidden = false;
  resultText.hidden = false;
  saveBtn.hidden = false;
  for (let i = 0; i < isAddedList.length; i++) {
    if(!isAddedList[i]) {
      list.splice(i,1,"");
    }
  }
  for (let result of list) {
    if (result != "") {
      showList.push(result);
    }
  }
  resultText.innerHTML = showList;
}

const disable = (element) => {
  element.disabled = true;
}

const caluculate = () => {
  let inputEv = document.getElementById("Ev-Value");
  // どの値を参照するか
  let evValueList = isInfected === true? evPokerusList : evDefaultList;
  let times = 0;
  let isSmall = false;
  let currentDevizer = 0;
  let lastDevizer = 0;
  let result;
  // 指定努力値にinputの値を格納
  appointedEvValue = parseValue(inputEv.value);
  if (appointedEvValue === 252) {
    isCounterStop = true;
  }
  setOption("pokerus",2);
  setOption("fellow",2);
  setOption("evItem",8);
  let canGetEv = ((1 + evItemValue) * pokerusValue * fellowValue);

  while (appointedEvValue != 0 && appointedEvValue != false) {
    // 指定努力値が252、もしくはCounterStopを選んだ状態
    if (isCounterStop) {
      let inputCalc = document.getElementById("caluculate");
      result =  252 / canGetEv;
      if (hasEvItem && isCallFellow) {
        resultsList.splice(0,1,resultsList[0] + `${result}回`);
        isAddedList[0] = true;
      } else if (hasEvItem) {
        resultsList.splice(1,1,resultsList[1] + `${result}回`);
        isAddedList[1] = true;
      } else if (isCallFellow) {
        resultsList.splice(2,1,resultsList[2] + `${result}回`);
        isAddedList[2] = true;
      } else {
        resultsList.splice(3,1,resultsList[3] + `${result}回`);
        isAddedList[3] = true;
      }
      showResult(resultsList);
      disable(inputCalc);
      break;
    }

    // 計算中の数値が指定数値より小さくなったら
    if (appointedEvValue < canGetEv && !isSmall) {
      isSmall = true;
      resultsList.splice(0,1,resultsList[0] + `${times}回`);
      isAddedList[0] = true;
      times = 0;
    } else if (!isSmall){
      appointedEvValue -= canGetEv;
      times++;
    }

    // 指定努力値外の計算
    if (isSmall) {
      for (let i = 0; i < evValueList.length; i++) {
        if (appointedEvValue >= evValueList[i]) {
          // appointedEvValueから引く値を格納しておく
          currentDevizer = evValueList[i];

          // currentとlastが一致しない　＝　引く値が変わった && 初期状態(lastDevizer=0)のみ回避
          if (currentDevizer != lastDevizer && lastDevizer != 0) {
            resultsList.splice(i - 1,1,resultsList[i - 1] + `${times}回`);
            isAddedList[i - 1] = true;
            times = 0;
          }
          
          // 比較用に格納しておく
          lastDevizer = currentDevizer;
          break;
        }
      }
      appointedEvValue -= currentDevizer;
      times++;
    }

    if (appointedEvValue < 0) {
      appointedEvValue = 0;
    }
  }

  // 計算終了時
  if (appointedEvValue === 0) {
    let inputCalc = document.getElementById("caluculate");
    resultsList.splice(3,1,resultsList[3] + `${times}回`);
    isAddedList[3] = true;
    showResult(resultsList);
    disable(inputCalc);
  }
}

