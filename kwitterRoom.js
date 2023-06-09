
const firebaseConfig = {
  apiKey: "AIzaSyAwKBm3IdoBooFVZSQzemuVkIZODMlNLGI",
  authDomain: "class-bird.firebaseapp.com",
  databaseURL: "https://class-bird-default-rtdb.firebaseio.com",
  projectId: "class-bird",
  storageBucket: "class-bird.appspot.com",
  messagingSenderId: "910826321085",
  appId: "1:910826321085:web:cfe6eb0bfad631de67b3d4"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

  userName = localStorage.getItem("userName");
  console.log(userName)
document.getElementById("userName").innerHTML = "Bem-vindo(a) " + userName + "!";

function getData() {  
  firebase.database().ref("/").on('value', function(snapshot) { 
    document.getElementById("output").innerHTML = ""; 
    snapshot.forEach(function(childSnapshot) { 
      childKey  = childSnapshot.key;
      roomNames = childKey;
    console.log("Nome da Sala - " + roomNames);
    row = "<div class='roomName' id="+roomNames+" onclick='redirectToRoomName(this.id)' >#"+ roomNames +"</div><hr>";
    document.getElementById("output").innerHTML += row;
});
});


}
function addRoom()
{
  roomName = document.getElementById("roomName").value;

  firebase.database().ref("/").child(roomName).update({
    sala : "sala adicionada"
  });

    localStorage.setItem("roomName", roomName);
    
    window.location = "kwitterPage.html";
}

getData();

function redirectToRoomName(name)
{
  console.log(name);
  localStorage.setItem("roomName", name);
    window.location = " kwitterPage.html";
}

function logout() {
 localStorage.removeItem("userName");
 localStorage.removeItem("roomName");
 window.location = "index.html";
}
