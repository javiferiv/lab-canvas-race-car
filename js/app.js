const drawingBoard = {

    name: 'Drawing Board',
    description: 'Canvas app for drawing the game board',
    version: '1.0.0',
    licensed: undefined,
    author: 'Javier Fernández',
    canvasTag: undefined,
    car: undefined,
    ctx: undefined,
    obs: undefined,
    frames: 0,
    keys: {
        left: 37,
        right: 39
    },
    canvasSize: {
        w: '500',
        h: '700'
    },


    init(id) {
        this.canvasTag = document.getElementById(id)
        this.ctx = this.canvasTag.getContext('2d')
        this.setDimensions()
        this.drawAll()
        this.drawCar()
        this.createObstacle()
        this.setEventListeners()
    },

    setDimensions() {
        this.canvasSize = {
            w: window.innerWidth,
            h: window.innerHeight
        }
    },

    drawCar() {
        this.car = new Car(this.ctx, 200, 500, 100, 200, '../images/car.png')
    },

    createObstacle() {
        this.obs = new Obstacle(this.ctx, this.canvasSize, 50, 50, 100, 100,)
    },


    drawHighway() {
        this.ctx.fillStyle = 'green'
        this.ctx.fillRect(0, 0, this.canvasSize.w, this.canvasSize.h)
        this.ctx.fillStyle = 'grey'
        this.ctx.fillRect(45, 0, 415, this.canvasSize.h)
        this.ctx.fillStyle = 'white'
        this.ctx.fillRect(55, 0, this.canvasSize.w / 90, this.canvasSize.h)
        this.ctx.fillStyle = 'white'
        this.ctx.fillRect(430, 0, this.canvasSize.w / 90, this.canvasSize.h)
        this.ctx.fillStyle = 'white'
        this.ctx.strokeStyle = 'white'
        this.ctx.lineWidth = 8
        this.ctx.beginPath()
        this.ctx.setLineDash([60, 20])
        this.ctx.moveTo(250, 0)
        this.ctx.lineTo(250, this.canvasSize.w)
        this.ctx.stroke()
    },

    drawAll() {

        setInterval(() => {
            this.clearScreen()
            this.drawHighway()
            this.car.draw()
            this.obs.draw()
        }, 70)
    },

    clearScreen() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },

    setEventListeners() {
        document.onkeydown = e => {
            e.keyCode === this.keys.left ? this.car.move('left') : null
            e.keyCode === this.keys.right ? this.car.move('right') : null
        }
    },

};


class Car {
    constructor(ctx, carPosX, carPosY, carWidth, carHeigth, carImage) {
        this.ctx = ctx
        this.carPos = {
            x: carPosX,
            y: carPosY
        }
        this.carSize = {
            w: carWidth,
            h: carHeigth
        }
        this.imageName = carImage
        this.carInstance = undefined
        this.init()

    }

    init() {
        this.carInstance = new Image()
        this.carInstance.src = `images/${this.imageName}`
    }

    draw() {
        this.ctx.drawImage(this.carInstance, this.carPos.x, this.carPos.y, this.carSize.w, this.carSize.h)

    }

    move(dir) {
        dir === 'left' ? this.carPos.x -= 20 : null
        dir === 'right' ? this.carPos.x += 20 : null
    }


}
///////////////


class Obstacle {
    constructor(ctx, canvasSize, obsPosX, obsPosY, obsWidth, obsHeight, speed) {
        this.ctx = ctx
        this.canvasSize = {
            w: canvasSize.w,
            h: canvasSize.h
        }
        this.obsPos = {
            x: obsPosX,
            y: obsPosY
        }
        this.obsSize = {
            w: obsWidth,
            h: obsHeight
        }
        this.obsInstance = undefined
        this.speed = speed
        this.init()
    }

    init() {
        this.obsInstance = new Image()
        this.obsInstance.src = './images/java.png'
    }

    draw() {
        this.ctx.drawImage(this.obsInstance, this.obsPos.x, this.obsPos.y, this.obsSize.w, this.obsSize.h)
        this.moveObstacle()
    }

    moveObstacle() {
        (this.obsPos.y += 5)
    }

}
