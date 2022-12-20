const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world, backgroundImg;
var canvas, angle, tower, ground, cannon;
var balls = [];
var boats = [];
//PRIMERO MOSTRAR ARCHIVOS PNG Y JSON ,HABLAR DE PLATAFORMA EZGIF.COM
//SEGUNDO DECLARAR VARIABLE PARA LA ANIMACIÓN DEL BARQUITO SALIENDO
var boatAnimation=[];
var boatSpritedata,boatSpritesheet


//DOCE DECLARAR VARIABLES PARA LA ANIMACIÓN COLISION
var brokenBoatAnimation=[];
var brokenBoatSpritedata,brokenBoatSpritesheet




function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
//TERCERO CARGAR IMAGENES DEL BARCO
boatSpritedata=loadJSON("assets/boat/boat.json")
boatSpritesheet=loadImage("assets/boat/boat.png")

//TRECE CARGAR IMAGENES BARCO COLISION
brokenBoatSpritedata=loadJSON("assets/boat/broken_boat.json")
brokenBoatSpritesheet=loadImage("assets/boat/broken_boat.png")
  
}

function setup() {
  canvas = createCanvas(1200,600);
  engine = Engine.create();
  world = engine.world;
  angle = -PI / 4;
  ground = new Ground(0, height - 1, width * 2, 1);
  tower = new Tower(150, 350, 160, 310);
  cannon = new Cannon(180, 110, 100, 50, angle);
  //CUARTO CREAR VARIABLE BOATFRAMES PARA OBTENER INFORMAIÓN DE LOS CUADROS 
  var boatFrames=boatSpritedata.frames;
  //QUINTO USAR CICLO FOR PARA RECORRER LOS DATOS DE JSON Y LOS CUADROS DE IMAGENES
  //pos: obtiene la posicion de cada cuadro desde boatframes
  //img: obtiene la imagen desde boatspritesheet y esta imagen la agregamos a la matriz boatAnimation
  //SEXTO MODIFICAR LA CLASE BOAT  
  for(var i=0;i<boatFrames.length;i++){
    var pos =boatFrames[i].position;
    var img =boatSpritesheet.get(pos.x,pos.y,pos.w,pos.h);
    boatAnimation.push(img)
  }
  //CATORCE VARIABLE Y CICLO FOR PARA RECORRER LOS DATOS JSON Y LOS CUADROS DE IMAGENES
  var brokenBoatFrames=brokenBoatSpritedata.frames;
  for(var i=0;i<brokenBoatFrames.length;i++){
    var pos =brokenBoatFrames[i].position;
    var img =brokenBoatSpritesheet.get(pos.x,pos.y,pos.w,pos.h);
    brokenBoatAnimation.push(img)
  }
  

  
}

function draw() {
  showBoats()
  background(189);
  image(backgroundImg, 0, 0, width, height);

 

  Engine.update(engine);
  ground.display();
showBoats();
 

  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i);
  }

  cannon.display();
  tower.display();

  
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    balls.push(cannonBall);
  }
}

//función para mostrar la bala
function showCannonBalls(ball, index) {
  ball.display();
  if (ball.body.position.x >= width || ball.body.position.y >= height - 50) {
    Matter.World.remove(world, ball.body);
    balls.splice(index, 1);
  }
}

 

    function showBoats() {
      if (boats.length > 0) {
        if (
          boats.length < 4 &&
          boats[boats.length - 1].body.position.x < width - 300
        ) {
          //MODIFICAR VALORES
          var positions = [-40, -60, -70, -20];
          var position = random(positions);
          //ONCE AGREGAR LA ANIMACIÓN DEL BARQUITO
          var boat = new Boat(width,height - 100, 200, 200, position,boatAnimation);
          boats.push(boat);
        }
    
        for (var i = 0; i < boats.length; i++) {
          Matter.Body.setVelocity(boats[i].body, {
            x: -0.9,
            y: 0
          });
    
          boats[i].display();
           //ONCE AGREGAR LA ANIMACIÓN DEL BARQUITO
          boats[i].animate();
        }
      } else {
         //ONCE AGREGAR LA ANIMACIÓN DEL BARQUITO Y MODIFICAR VALORES
        var boat = new Boat(width, height - 60, 170, 170, -60,boatAnimation);
        boats.push(boat);
      }
    }
function keyReleased() {
  if (keyCode === DOWN_ARROW) { 
    balls[balls.length - 1].shoot();
  }
}



