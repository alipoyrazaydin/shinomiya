module.exports = function(infoObject, obj){
    let cssOutput = [
        "/*",
        "       " + infoObject.name + " Theme",
        "       by " + infoObject.author,
        "*/\n\n"
    ].join("\n");

    cssOutput += ":root {\n";
    Object.entries(obj).forEach(([key, value]) => {
        cssOutput += ["  ",key,": ",value,";","\n"].join("");
    });
    cssOutput += "}";
    return cssOutput;
}