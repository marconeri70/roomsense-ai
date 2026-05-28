const logContainer =
document.getElementById("logContainer");

const alarmOverlay =
document.getElementById("alarmOverlay");

const alarmText =
document.getElementById("alarmText");

const intruder =
document.getElementById("avatar-intruder");

let trackingActive = false;
let interval;

const positions = {

  bagno1:{left:"10%",top:"53%"},
  camera1:{left:"12%",top:"74%"},
  camera2:{left:"31%",top:"74%"},
  corridoio:{left:"36%",top:"57%"},
  bagno2:{left:"47%",top:"72%"},
  ingresso:{left:"54%",top:"49%"},
  studio:{left:"63%",top:"39%"},
  camera3:{left:"85%",top:"41%"},
  cucina:{left:"58%",top:"76%"},
  soggiorno:{left:"76%",top:"71%"}

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

function movePerson(name, room){

  const person =
  people[name];

  const pos =
  positions[room];

  person.element.style.left =
  pos.left;

  person.element.style.top =
  pos.top;

}

function randomMove(){

  const rooms =
  Object.keys(positions);

  movePerson(
    "marco",
    rooms[Math.floor(Math.random()*rooms.length)]
  );

  movePerson(
    "serena",
    rooms[Math.floor(Math.random()*rooms.length)]
  );

  movePerson(
    "damiano",
    rooms[Math.floor(Math.random()*rooms.length)]
  );

  movePerson(
    "cinzia",
    rooms[Math.floor(Math.random()*rooms.length)]
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
      5000
    );

    addLog(
      "TRACKING SECURITY ATTIVATO"
    );

  }else{

    clearInterval(interval);

    addLog(
      "TRACKING SECURITY FERMATO"
    );

  }

}

function simulateIntruder(){

  const rooms =
  Object.keys(positions);

  const room =
  rooms[
    Math.floor(
      Math.random() * rooms.length
    )
  ];

  const pos =
  positions[room];

  intruder.style.display =
  "block";

  intruder.style.left =
  pos.left;

  intruder.style.top =
  pos.top;

  alarmOverlay.style.display =
  "flex";

  alarmText.innerHTML =
  `Intruso rilevato in ${room.toUpperCase()}`;

  addLog(
    `⚠ INTRUSO IN ${room.toUpperCase()}`
  );

}

function resetAlarm(){

  alarmOverlay.style.display =
  "none";

  intruder.style.display =
  "none";

  addLog(
    "ALLARME RESETTATO"
  );

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
