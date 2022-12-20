class Boat {
  //SEXTO AGREGAR E INVOCAR VARIABLE BOATANIMATION
  constructor(x, y, width, height, boatPos,boatAnimation) {
    var options = {
      restitution: 0.8,
      friction: 1.0,
      density: 1.0,
    };
    //OCTAVO INICIALIZAR SPEED
    this.animation=boatAnimation
    this.speed=0.05;
    this.body = Bodies.rectangle(x, y, width, height, options);
    this.width = width;
    this.height = height;

    this.boatPosition = boatPos;
    this.image = loadImage("assets/boat.png");
    World.add(world, this.body);
  }
  //NOVENO CREAR FUNCIÓN PARA ASIGNAR VELOCIDAD A LA ANIMACIÓN
  animate(){
    this.speed+=0.05%1.1
  }


  display() {
    
    var angle = this.body.angle;
    var pos = this.body.position;
    //DECIMO AGREGAR VARIABLE INDEX PARA MOVERNOS ATRAVES DE UN NUMERO DE ANIMACIONES
    var index =floor(this.speed%this.animation.length);
  
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);
    //CAMBIAR EN FUNCIÓN DE INDEX Y PASAR LA ANIMACIÓN EN EL SKETCH
    image(this.animation[index], 0, this.boatPosition, this.width, this.height);
    noTint();
    pop();
  }
}
