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

class Projectile {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }
    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()

    }// end of draw

    update() {
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y

    }

}

const x = canvas.width / 2
const y = canvas.height / 2


const player = new Player(x,y,30,'blue')
console.log(player)




const projectiles = []



function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0,0,canvas.width,canvas.height)
    player.draw()
    projectiles.forEach(projectile => {
        projectile.update()
    })

}

window.addEventListener('click', (event) => { // the click is translated into the event object that has many properties like the client x and y properties
    const angle = Math.atan2(event.clientY - player.y, event.clientX - player.x)
    const velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle)
    }    

    projectiles.push(new Projectile(player.x,player.y,5,'red',velocity))
    console.log("FIRE")
})

animate()