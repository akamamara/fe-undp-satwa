function translateRaw(rawString) {
  // console.log(rawString);
  if (rawString.length > 1) {
    let str = rawString[0];
    let newStr = str.replace("_ID", "").replace("_", " ");
    return newStr;
  }
}

export default translateRaw;
