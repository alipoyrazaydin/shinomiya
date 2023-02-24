module.exports = function(obj){
    let ident = (this.ident ? "  " + this.ident : "  ");
    let cssOutput = "{\n";
    Object.entries(obj).forEach(([key, value],indis,ary) => {
        var isLast = (indis === ary.length - 1);
        if (value !== null && value !== undefined && typeof value == "object") cssOutput += ident + `"${key}"` + ": " + module.exports.call({ident:ident + "  "},value);
        else cssOutput += [ident,"\"",key,"\": ",(value === null || value === undefined ? "null" : `"${value}"`),(isLast ? "" : ","),"\n"].join("");
    });
    cssOutput += "}";
    return cssOutput;
}