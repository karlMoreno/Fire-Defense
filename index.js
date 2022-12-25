const canvas = document.querySelector('canvas')
canvas.width = innerWidth // window.innerWidth you dont need window
canvas.height = innerHeight //same thing

const c = canvas.getContext('2d') //context for canvas api to do graphics for a 2d game

console.log(c)


//------------------------------

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

class Enemy {
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

//-------------------------------

const x = canvas.width / 2
const y = canvas.height / 2


const player = new Player(x,y,30,'blue')
console.log(player)

const projectiles = []
const enemies = []


//---------------------------------

function spawnEnemies() {
    setInterval(() => {
        const radius = Math.random() * (30 - 10) + 10
        let x
        let y
        if(Math.random() < 0.5) {
            x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius   //condition ? exprIfTrue : exprIfFalse
            y = Math.random() * canvas.height
            // y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius
        } else {
            x = Math.random() * canvas.width
            y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius
        }
        

        const color = 'green'
        const angle = Math.atan2(player.y - y, player.x - x)
        const velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }  
        enemies.push(new Enemy(x,y,radius,color,velocity))
    }, 1000)
}


let animationID

function animate() {
    animationID = requestAnimationFrame(animate)
    c.fillStyle = 'rgba(0,0,0,0.1)'
    c.fillRect(0,0,canvas.width,canvas.height)

    player.draw()
    projectiles.forEach((projectile, index) => {
        projectile.update()

        if(projectile.x + projectile.radius < 0 || 
            projectile.x - projectile.radius > canvas.width ||
            projectile.y + projectile.radius < 0 ||
            projectile.y - projectile.radius >canvas.height
            ){
            setTimeout(() => {
                projectiles.splice(index,1)
            }, 0)
        }
    })

    enemies.forEach((enemy, index) => {
        enemy.update()
        const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y)

        //end game
        if(dist - enemy.radius - player.radius < 1 ) {
            cancelAnimationFrame(animationID)
        }



        projectiles.forEach( (projectile, projectileIndex) => {
            const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y)

            //objects touch
            if(dist - enemy.radius - projectile.radius < 1 ) {
                setTimeout(() => {
                    enemies.splice(index,1)
                    projectiles.splice(projectileIndex,1)
                }, 0)
            }

        })
    })

}

window.addEventListener('click', (event) => { // the click is translated into the event object that has many properties like the client x and y properties
    console.log(projectiles)
    const angle = Math.atan2(event.clientY - player.y, event.clientX - player.x)
    const velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle)
    }    

    projectiles.push(new Projectile(player.x,player.y,5,'red',velocity))
    console.log("PEW")
})

animate()
spawnEnemies()