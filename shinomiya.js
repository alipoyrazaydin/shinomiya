process.title = "shinomiya-gen";

const cssGenerate = require("./utils/genCSS");
const fluteGenerate = require("./utils/genFlute");
const h2c = require("./utils/h2c");
const fs = require("fs");

Object.prototype.with = function(obj) { Object.assign(this,obj); return this; };
const obj2objC = function(ary,tokenAction) { let tokens = {}; Object.entries(ary).forEach(([k,v]) => { let kd = tokenAction.call(this,k,v); tokens[kd.k] = kd.v; }); return tokens; }

const Shinomiya = {
    Info: {
        name: "Shinomiya",
        author: "Ali Poyraz AYDIN (KIGIPUX)"
    },
    ColorTablePrimate: {
        primary: 0xd33682,
        primaryDim: 0x56283f,
        secondary: 0x426189,
        secondaryDim: 0x111924,
    },
    ColorTableExtended: {
        Black: 0x23292B,
        Red: 0xcc0000,
        Green: 0x4e9a06,
        Yellow: 0xc4a000,
        Blue: 0x3465a4,
        Magenta: 0x75507b,
        Cyan: 0x06989a,
        White: 0xd3d7cf,
        BrightBlack: 0x474F57,
        BrightRed: 0xef2929,
        BrightGreen: 0x8ae234,
        BrightYellow: 0xfce94f,
        BrightBlue: 0x426189,
        BrightMagenta: 0xd33682,
        BrightCyan: 0x34e2e2,
        BrightWhite: 0xEEEEEC
    }
}

fs.mkdirSync("dist",{recursive:true});

// Render Colors as FluentTerminal Theme
fs.writeFileSync("dist/shinomiya.flutecolors", fluteGenerate({
    "EncodedImage": "",
    "Name": Shinomiya.Info.name,
    "Author": Shinomiya.Info.author,
    "BackgroundImage": null,
    "Colors":{
        "Foreground": h2c(Shinomiya.ColorTableExtended.BrightWhite).hex.toString(),
        "Background": h2c(Shinomiya.ColorTablePrimate.secondaryDim).hex.toString(),
        "Cursor": "#FFFFFF",
        "CursorAccent": "#000000",
        "Selection": "rgba(158, 195, 255, 0.41015625)",
        "SelectionForeground": null,
        "SelectionBackground": null,
    }.with(obj2objC(Shinomiya.ColorTableExtended, (kd,vd) => { return {k: kd, v: h2c(vd).hex.toString()} }))
}));
console.log("Rendered FluentTerminal Theme!");

// Render Colors as CSS Theme
fs.writeFileSync("dist/shinomiya.css", cssGenerate(Shinomiya.Info,{
    "--primary-color": h2c(Shinomiya.ColorTablePrimate.primary).hex,
    "--secondary-color": h2c(Shinomiya.ColorTablePrimate.secondary).hex,
    "--primary-color-dim": h2c(Shinomiya.ColorTablePrimate.primaryDim).hex,
    "--secondary-color-dim": h2c(Shinomiya.ColorTablePrimate.secondaryDim).hex,
}.with(obj2objC(Shinomiya.ColorTableExtended, (kd,vd) => { return {k: "--color-" + kd.toLowerCase(), v: h2c(vd).hex} }))));
console.log("Rendered CSS Theme!");

// Render Colors as JSON Colors
fs.writeFileSync("dist/shinomiya.json", JSON.stringify({
    "Name": Shinomiya.Info.name,
    "Author": Shinomiya.Info.author,
    "ColorTable":{
        "Primary": h2c(Shinomiya.ColorTablePrimate.primary).hex.toString(),
        "PrimaryDim": h2c(Shinomiya.ColorTablePrimate.secondary).hex.toString(),
        "Secondary": h2c(Shinomiya.ColorTablePrimate.primaryDim).hex.toString(),
        "SecondaryDim": h2c(Shinomiya.ColorTablePrimate.secondaryDim).hex.toString(),
    }.with(obj2objC(Shinomiya.ColorTableExtended, (kd,vd) => { return {k: kd, v: h2c(vd).hex.toString()} }))
}));
console.log("Rendered JSON Theme!");