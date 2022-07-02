/*
 * @Author: Chaoyue
 * @Date: 2022-01-25 10:11:41
 * @LastEditors: Chaoyue
 * @LastEditTime: 2022-02-16 16:00:08
 * @FilePath: \myDemo\canvas-demo\javascript\canvas-II.js
 */

class Particle {
    constructor(x, y, cell_w, cell_h, cell_index, imageData, s_x, s_y, e_x, e_y) {
        this.p_w = 1;
        this.p_h = 1;
        this.s_x = s_x;
        this.s_y = s_y;
        this.c_x;
        this.c_y;
        this.e_x = e_x + ((Math.random() - 0.5) * 10);
        this.e_y = e_y + ((Math.random() - 0.5) * 10);
        this.x = x * cell_w + ((Math.random() - 0.5) * 20);
        this.y = y * cell_h + ((Math.random() - 0.5) * 20);
        this.c_t = Math.floor((Math.random() - 0.5) * 200);
        this.style =
            `rgba(255, 0, 0)`
    }
}

const canvasView = document.getElementById('canvas-one');
const ctx = canvasView.getContext('2d');

ctx.beginPath();
ctx.arc(30, 100, 10, 0, 2 * Math.PI);
ctx.fillStyle = "#FFFF00"
ctx.fill()
ctx.closePath()

let frameId;
let count = 0;
function ctxDraw () {
    console.log('gogogo');
    count++
    frameId = window.requestAnimationFrame(ctxDraw.bind(this));
    if (count == 20) {
        console.log('end');
        cancelAnimationFrame(frameId);
        return
    }
}
// ctxDraw()

