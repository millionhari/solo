// Firebase
var myDataRef = new Firebase('https://wewatch.firebaseio.com/');

// FIREBASE POST add messages to array
var chat = {
  post : function() {
      var name = $('#nameInput').val();
      var text = $('#messageInput').val();
      myDataRef.push({name: name, text: text});
      $('#messageInput').val('');
      $('#messageInput').val('');
      // myDataRef.set('User ' + name + ' says ' + text); <-- String
      // myDataRef.set({name: name, text: text}); <-- Object
    }
};


// FIREBASE GET when message is added
myDataRef.on('child_added', function(snapshot) {
  var message = snapshot.val(); // set message variable to whatever message is added
  displayChatMessage(message.name, message.text);
});

// FIREBASE display chat messages
function displayChatMessage(name, text) {
  $('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));
  // $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
};


// Load when page loads  
$( document ).ready(function() {
  $('#messageInput').keypress(function (e) {
      if (e.keyCode == 13) {
      chat.post();
    }
  })
});