var alphabet, password_right, password_left, message, some_value;
var upperLeftArr = [], lowerRightArr, upperRightArr = [], lowerLeftArr = [];

alphabet = "abcdefghiklmnopqrstuvwxyz";
password_right = prompt("Password for upper-right table: ");
password_left = prompt("Password for lower-left table: ");
message = prompt("Input Message: ");
some_value = prompt("Enter what do you want:\n-a encrypt\n-b decrypt");

for (var i = 0; i < message.length; i++) {
  if(message[i] === " "){
    message =  message.replace(message[i],"");
  }else if(message[i] === "j"){
    message =  message.replace(message[i],"i");
  }
}

if (message.length % 2 !== 0) {
  message += "q";
}

password_right+=alphabet;
password_left+=alphabet;
password_right = trimString(password_right);
password_left = trimString(password_left);

lowerRightArr = upperLeftArr;
var index = 0;

for (var i = 0; i < 5; i++) {
  upperLeftArr[i] = [];
  upperRightArr[i] = [];
  lowerLeftArr[i] = [];
  for (var j = 0; j < 5; j++) {
      upperLeftArr[i][j] = alphabet[index];
      upperRightArr[i][j] = password_right[index];
      lowerLeftArr[i][j] = password_left[index];
      index++;
  }
}
var strA, strB;
switch (some_value) {
  case "a":
    var encryptStr = "";

    for (var i = 0; i < message.length; i+=2) {
       strA = getIndexOf2DArray(upperLeftArr, message[i]);
       strB = getIndexOf2DArray(lowerRightArr, message[i+1]);
       encryptStr += upperRightArr[strA[0]][strB[1]];
       encryptStr += lowerLeftArr[strB[0]][strA[1]];
      }

    document.querySelector("#rezult").innerHTML = encryptStr;
    break;
  case "b":
    var decryptStr = "";

    for (var i = 0; i < message.length; i+=2) {
      strA = getIndexOf2DArray(upperRightArr, message[i]);
      strB = getIndexOf2DArray(lowerLeftArr, message[i+1]);
      decryptStr += upperLeftArr[strA[0]][strB[1]];
      decryptStr += lowerRightArr[strB[0]][strA[1]];
    }

    document.querySelector("#rezult").innerHTML = decryptStr;
    break;
}

function getIndexOf2DArray(arr, elem){
  var strOfIndex = "";

  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr[i].length; j++) {
      if(arr[i][j] === elem){
        strOfIndex += i + "" + j;
      }
    }
  }

  return strOfIndex;
}

function trimString(str){
  str = str.split("").reverse().join("");
  var j = 0;

  for (var i = 0; i < str.length; i++) {
    j++;
    for (var k = j ; k < str.length; k++) {
      if(str[i] === str[k]){
        str = str.replace(str[k], " ");
      }
    }
  }

  str = str.replace("j","").replace(/\s/g,"").split("").reverse().join("");
  return str;
}
