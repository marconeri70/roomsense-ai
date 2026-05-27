const presenceGrid = document.getElementById("presenceGrid");
const activityLog = document.getElementById("activityLog");

const peopleCount = document.getElementById("peopleCount");
const roomCount = document.getElementById("roomCount");

let presences = [];

function simulateDetection(person, room){

  const confidence = Math.floor(
    Math.random() * 20
  ) + 80;

  const time = new Date().toLocaleTimeString();

  const existing = presences.find(
    p => p.person === person
  );

  if(existing){

    existing.room = room;
    existing.confidence = confidence;
    existing.time = time;

  }else{

    presences.push({
      person,
      room,
      confidence,
      time
    });

  }

  updateUI();

  addLog(
    `${person} rilevato in ${room} (${confidence}%)`
  );
}

function updateUI(){

  presenceGrid.innerHTML = "";

  presences.forEach(p => {

    presenceGrid.innerHTML += `
      <div class="presenceCard">
        <h3>${p.person}</h3>

        <div class="roomName">
          ${p.room}
        </div>

        <div class="confidence">
          Affidabilità: ${p.confidence}%
        </div>

        <div class="timeText">
          Ultimo rilevamento: ${p.time}
        </div>
      </div>
    `;
  });

  peopleCount.innerText = presences.length;

  const uniqueRooms = [
    ...new Set(
      presences.map(p => p.room)
    )
  ];

  roomCount.innerText = uniqueRooms.length;
}

function addLog(text){

  const div = document.createElement("div");

  div.className = "logItem";

  div.innerHTML = `
    ${new Date().toLocaleTimeString()}
    → ${text}
  `;

  activityLog.prepend(div);
}

function clearPresence(){

  presences = [];

  updateUI();

  addLog("Presenze azzerate");
}

let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {

  e.preventDefault();

  deferredPrompt = e;
});

document
.getElementById("installBtn")
.addEventListener("click", async () => {

  if(deferredPrompt){

    deferredPrompt.prompt();

    await deferredPrompt.userChoice;

    deferredPrompt = null;
  }
});

if("serviceWorker" in navigator){

  navigator.serviceWorker.register(
    "service-worker.js"
  );
}
