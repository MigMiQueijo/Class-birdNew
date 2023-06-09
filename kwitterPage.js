
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

  var userName = localStorage.getItem("userName")
  var roomName = localStorage.getItem("roomName")
  function logout() {
     localStorage.removeItem("userName")
     localStorage.removeItem("roomName")
     window.location.replace("index.html")
  }


  function send() {
      var message = document.getElementById("message").value
      firebase.database().ref(roomName).push({
         nome: userName,
         messange: message,
         like: 0
      })
      document.getElementById("message").value = ""
  } 
  function getData() {  
   firebase.database().ref("/" + roomName).on('value', function(snapshot) { 
     document.getElementById("output").innerHTML = ""; 
     snapshot.forEach(function(childSnapshot) { 
       childKey  = childSnapshot.key;
       childData = childSnapshot.val();
       if (childKey != "sala") {
         firebaseMessageId = childKey
         messageData = childData;
         console.log(firebaseMessageId, messageData);
         nome = messageData['nome']
         like = messageData['like']
         messange = messageData['messange']
         nameWithTag = "<h4>" + nome + "<img class='user_tick' src='tick.png'> </h4>"
         messageWithTag = "<h4 class='message_h4'>" + messange + "</h4>"
         likeWithTag = "<button class='btn btn-warning' id="+ firebaseMessageId + " value=" + like + " onclick='updateLike(this.id)'>"
         iconeWithTag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";
         row = nameWithTag + messageWithTag + likeWithTag + iconeWithTag
         document.getElementById("output").innerHTML += row
       }
 });
 });
 
 
 }

 getData();

 function updateLike(messageId) {
    // console.log(messageId)
    btnId = messageId
    // console.log(btnId)
    likes = document.getElementById(btnId).value
    console.log(likes)
    updateLikE = Number(likes) + 1
    console.log(updateLikE)
    firebase.database().ref(roomName).child(messageId).update({like: updateLikE})
 }