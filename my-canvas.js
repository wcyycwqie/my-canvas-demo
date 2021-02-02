/*
 * @Author: 
 * @Date: 2021-02-02 17:56:53
 * @LastEditors: Chaoyue
 * @LastEditTime: 2021-02-02 18:16:47
 * @FilePath: \canvas-demo\my-canvas.js
 */
class CanvasImg {
    constructor(id, src) {
        this.canvas = document.getElementById(id);
        this.ctx = {};
        this.imageData = {};
        this.name = id;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.x = 0;
        this.y = 0;
        this.img = new Image();
        this.img.src = src;
        this.particleList = [];
        this.cell_w = 4;
        this.cell_h = 4;
        this.cols = parseInt(this.width / this.cell_w);
        this.rows = parseInt(this.height / this.cell_h);
        this.count = 0;
        this.animateTime = 280;
        this.frameId = '';
        this.init();
    }
    init() {
        console.log('init');
        this.ctx = this.canvas.getContext('2d');
        this.img.onload = () => {
            this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
            this.imageData = this.ctx.getImageData(this.x, this.y, this.width, this.height).data;
            console.log(this.imageData);
            this.caculate();
            this.step();
        }
    }
    caculate() {
        console.log('Caculate');
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                let cell_index = [(y * this.cell_h) * this.width + (x * this.cell_w)] * 4;
                let s_x = Math.floor(Math.random() * this.width * 1.5);
                let s_y = Math.floor(Math.random() * this.height * 1.5);
                s_x = this.width / 2;
                s_y = (this.height + Math.random() * this.height * 10);
                this.particleList.push(new Particle(x, y, this.cell_w, this.cell_h, cell_index, this.imageData,
                    (this.x + s_x), (this.y + s_y),
                    (this.x + x * this.cell_w), (this.y + y * this.cell_h)));
                if (x < 2 && y < 1) {
                    console.log(this.imageData.slice(0, cell_index));
                    console.log(cell_index);
                }
            }
        }

    }
    drawImg() {
        this.count++;
        this.ctx.clearRect(this.x, this.y, this.width, this.height);
        for (let i = 0; i < this.particleList.length; i++) {
            this.ctx.fillStyle = this.particleList[i].style;
            this.particleList[i].c_x = this.easeInOutExpo(this.count, this.particleList[i].s_x, this
                .particleList[i].e_x - this.particleList[i].s_x, this.animateTime);
            this.particleList[i].c_y = this.easeInOutExpo(this.count, this.particleList[i].s_y, this
                .particleList[i].e_y - this.particleList[i].s_y, this.animateTime);
            this.ctx.fillRect(this.particleList[i].c_x, this.particleList[i].c_y, 2, 2);
        }
    }
    step() {
        this.count++;
        this.drawImg();
        this.frameId = window.requestAnimationFrame(this.step.bind(this));
        if (this.count == this.animateTime) {
            cancelAnimationFrame(this.frameId);
        }

    }
    easeInOutExpo = (t, b, c, d) => {
        t /= d / 2;
        if (t < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        t--;
        return c / 2 * (-Math.pow(2, -10 * t) + 2) + b
    }
}

class Particle {
    constructor(x, y, cell_w, cell_h, cell_index, imageData, s_x, s_y, e_x, e_y) {
        this.s_x = s_x;
        this.s_y = s_y;
        this.c_x;
        this.c_y;
        this.e_x = e_x;
        this.e_y = e_y;
        this.x = x * cell_w + (Math.random() - 0.5) * 20;
        this.y = y * cell_h + (Math.random() - 0.5) * 20;
        this.style =
            `rgba(${imageData[cell_index]}, ${imageData[cell_index+1]}, ${imageData[cell_index+2]}, ${imageData[cell_index+3]})`
    }
}