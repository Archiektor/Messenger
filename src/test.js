function isIsogram(str) {
    if (str.length === 0) return true;
    const newStr = str.toLowerCase();
    let newObj = {};
    for (let i = 0; i < str.length; i++) {
        if (newObj[newStr[i]] === undefined) {
            newObj[newStr[i]] = 1;
        } else {
            return false;
        }
    }
    return true
}

console.log(isIsogram("Dermatoglyphics"));
console.log(isIsogram("isogram"));
console.log(isIsogram("aba"));
console.log(isIsogram("moOse"));
console.log(isIsogram("isIsogram"));
console.log(isIsogram(""));