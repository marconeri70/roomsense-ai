const peopleCount = document.getElementById("peopleCount");
const roomCount = document.getElementById("roomCount");
const logContainer = document.getElementById("logContainer");
const statusGrid = document.getElementById("statusGrid");

const roomNames = {
  ingresso: "Ingresso",
  corridoio: "Corridoio",
  cucina: "Cucina",
  soggiorno: "Soggiorno",
  studio: "Studio",
  camera1: "Camera 1",
  camera2: "Camera 2",
  camera3: "Camera 3",
  bagno1: "Bagno 1",
  bagno2: "Bagno 2"
};

let detections = {};

function detectPerson(person, room){
  const confidence = Math.floor(Math.random() * 20) + 80;
  const time = new Date().toLocaleTimeString();

  detections[room] = {
    person,
    confidence,
    time
  };

  updateMap();
  updateStatusGrid();

  addLog(`${person} rilevato in ${roomNames[room]} con affidabilità ${confidence}%`);
}

function updateMap(){
  document.querySelectorAll(".roomPoint").forEach(point => {
    point.classList.remove("active");
  });

  Object.keys(detections).forEach(room => {
    const point = document.getElementById(`point-${room}`);
    if(point){
      point.classList.add("active");
      point.querySelector("span").innerHTML =
        `${roomNames[room]}<br>${detections[room].person}<br>${detections[room].confidence}%`;
    }
  });

  const people = new Set(Object.values(detections).map(d => d.person));
  const rooms = Object.keys(detections);

  peopleCount.innerText = people.size;
  roomCount.innerText = rooms.length;
}

function updateStatusGrid(){
  statusGrid.innerHTML = "";

  Object.keys(roomNames).forEach(room => {
    const data = detections[room];

    statusGrid.innerHTML += `
      <div class="statusCard">
        <h3>${roomNames[room]}</h3>
        <p>
          ${
            data
              ? `${data.person}<br>Segnale ${data.confidence}%<br>Ore ${data.time}`
              : "Nessuna presenza"
          }
        </p>
      </div>
    `;
  });
}

function addLog(text){
  const div = document.createElement("div");
  div.className = "logItem";
  div.innerHTML = `${new Date().toLocaleTimeString()} → ${text}`;
  logContainer.prepend(div);
}

function resetSystem(){
  detections = {};

  document.querySelectorAll(".roomPoint").forEach(point => {
    point.classList.remove("active");

    const id = point.id.replace("point-", "");
    point.querySelector("span").innerHTML = roomNames[id].toUpperCase();
  });

  peopleCount.innerText = "0";
  roomCount.innerText = "0";

  updateStatusGrid();

  addLog("Sistema Tactical AI resettato");
}

let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
});

document.getElementById("installBtn").addEventListener("click", async () => {
  if(deferredPrompt){
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
  }
});

if("serviceWorker" in navigator){
  navigator.serviceWorker.register("service-worker.js");
}

updateStatusGrid();
