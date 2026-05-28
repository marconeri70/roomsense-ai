const logContainer =
document.getElementById("logContainer");

let trackingActive = false;
let interval;

const positions = {

  bagno1:{
    left:"10%",
    top:"53%"
  },

  camera1:{
    left:"12%",
    top:"74%"
  },

  camera2:{
    left:"31%",
    top:"74%"
  },

  corridoio:{
    left:"36%",
    top:"57%"
  },

  bagno2:{
    left:"47%",
    top:"72%"
  },

  ingresso:{
    left:"54%",
    top:"49%"
  },

  studio:{
    left:"63%",
    top:"39%"
  },

  camera3:{
    left:"85%",
    top:"41%"
  },

  cucina:{
    left:"58%",
    top:"76%"
  },

  soggiorno:{
    left:"76%",
    top:"71%"
  }

};

const paths = {

  cucina:[
    "ingresso",
    "corridoio",
    "cucina"
  ],

  soggiorno:[
    "ingresso",
    "corridoio",
    "soggiorno"
  ],

  studio:[
    "ingresso",
    "studio"
  ],

  camera1:[
    "ingresso",
    "corridoio",
    "camera1"
  ],

  camera2:[
    "ingresso",
    "corridoio",
    "camera2"
  ],

  camera3:[
    "ingresso",
    "studio",
    "camera3"
  ],

  bagno1:[
    "corridoio",
    "bagno1"
  ],

  bagno2:[
    "corridoio",
    "bagno2"
  ]

};

const people = {

  marco:{
    element:
    document.getElementById("avatar-marco")
  },

  serena:{
    element:
    document.getElementById("avatar-serena")
  },

  damiano:{
    element:
    document.getElementById("avatar-damiano")
  },

  cinzia:{
    element:
    document.getElementById("avatar-cinzia")
  }

};

async function moveAlongPath(name, destination){

  const person =
  people[name];

  const path =
  paths[destination];

  if(!path) return;

  for(const room of path){

    const pos =
    positions[room];

    person.element.style.left =
    pos.left;

    person.element.style.top =
    pos.top;

    addLog(
      `${name.toUpperCase()} → ${room.toUpperCase()}`
    );

    await sleep(1800);

  }

}

function sleep(ms){

  return new Promise(resolve =>
    setTimeout(resolve, ms)
  );

}

function randomDestination(){

  const keys =
  Object.keys(paths);

  return keys[
    Math.floor(
      Math.random() * keys.length
    )
  ];

}

async function randomMove(){

  moveAlongPath(
    "marco",
    randomDestination()
  );

  moveAlongPath(
    "serena",
    randomDestination()
  );

  moveAlongPath(
    "damiano",
    randomDestination()
  );

  moveAlongPath(
    "cinzia",
    randomDestination()
  );

}

function toggleMovement(){

  trackingActive =
  !trackingActive;

  if(trackingActive){

    randomMove();

    interval =
    setInterval(
      randomMove,
      10000
    );

    addLog(
      "PERCORSI AI ATTIVATI"
    );

  }else{

    clearInterval(interval);

    addLog(
      "TRACKING FERMATO"
    );

  }

}

function addLog(text){

  const div =
  document.createElement("div");

  div.className =
  "logItem";

  div.innerHTML =
  `${new Date().toLocaleTimeString()} → ${text}`;

  logContainer.prepend(div);

}
