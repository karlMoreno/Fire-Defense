const canvas = document.querySelector('canvas')
canvas.width = innerWidth // window.innerWidth you dont need window
canvas.height = innerHeight //same thing

const c = canvas.getContext('2d') //context for canvas api to do graphics for a 2d game

console.log(c)