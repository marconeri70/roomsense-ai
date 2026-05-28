const peopleCount =
document.getElementById("peopleCount");

const roomCount =
document.getElementById("roomCount");

const logContainer =
document.getElementById("logContainer");

let activeRooms = [];

function detectPerson(person, room){

  document
  .querySelectorAll(".room")
  .forEach(roomBox => {

    roomBox.classList.remove("active");

  });

  const roomElement =
  document.getElementById(room);

  roomElement.classList.add("active");

  const confidence =
  Math.floor(
    Math.random() * 20
  ) + 80;

  const status =
  document.getElementById(
    `status-${room}`
  );

  status.innerHTML = `
    ${person}<br>
    Segnale ${confidence}%
  `;

  if(!activeRooms.includes(room)){

    activeRooms.push(room);

  }

  peopleCount.innerText = "1";

  roomCount.innerText =
  activeRooms.length;

  addLog(
    `${person} rilevato in ${room}`
  );
}

function addLog(text){

  const div =
  document.createElement("div");

  div.className = "logItem";

  div.innerHTML = `
    ${new Date().toLocaleTimeString()}
    → ${text}
  `;

  logContainer.prepend(div);
}

function resetSystem(){

  document
  .querySelectorAll(".room")
  .forEach(room => {

    room.classList.remove("active");

  });

  document
  .querySelectorAll(".roomStatus")
  .forEach(status => {

    status.innerHTML =
    "NESSUNA PRESENZA";

  });

  activeRooms = [];

  peopleCount.innerText = "0";

  roomCount.innerText = "0";

  addLog(
    "Sistema Tactical AI resettato"
  );
}

let deferredPrompt;

window.addEventListener(
  "beforeinstallprompt",
  (e) => {

    e.preventDefault();

    deferredPrompt = e;

  }
);

document
.getElementById("installBtn")
.addEventListener(
  "click",
  async () => {

    if(deferredPrompt){

      deferredPrompt.prompt();

      await deferredPrompt.userChoice;

      deferredPrompt = null;

    }

  }
);

if("serviceWorker" in navigator){

  navigator
  .serviceWorker
  .register("service-worker.js");

}
