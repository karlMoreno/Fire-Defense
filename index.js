const canvas = document.querySelector('canvas')
canvas.width = innerWidth // window.innerWidth you dont need window
canvas.height = innerHeight //same thing

const c = canvas.getContext('2d') //context for canvas api to do graphics for a 2d game

console.log(c)


class Player {
    constructor(x,y,radius,color) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
    } // end of constructor

    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()

    }// end of draw
} // end of player

const x = canvas.width / 2
const y = canvas.height / 2


const player = new Player(x,y,30,'blue')
player.draw()
console.log(player)