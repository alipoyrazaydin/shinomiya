module.exports = function(color){
    return {
        hex: {
            value: color.toString(16),
            toDefString(){
                return this.value;
            },
            toString(){
                return "#" + this.value;
            }
        },
        rgb: {
            r: (color >> 16) & 255,
            g: (color >> 8) & 255,
            b: color & 255,
            toDefString(){
                return [this.r,this.g,this.b].join(",");
            },
            toString(){
                return `rgb(${[this.r,this.g,this.b].join(" ")})`;
            }
        }
    }
}