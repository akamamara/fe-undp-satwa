function translateRaw(rawString) {
  // console.log(rawString);
  if (rawString.length > 1) {
    let str = rawString[0];
    let newStr = str.replace("_ID", "").replace("_", " ").replace("_", " ");

    let replaceHerpeto = newStr.replace("herpeto", "herpetofauna");

    let has = replaceHerpeto.replace("has", "mempunyai");

    let replaceMammals = has.replace("mammals", "Mamalia");

    let replaceThirdAtr = replaceMammals.replace(
      "third attribute",
      "Ciri fisik utama"
    );
    return replaceThirdAtr;
  }
}

export default translateRaw;
