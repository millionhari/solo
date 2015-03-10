// Firebase
var chatDataRef = new Firebase('https://wewatch.firebaseio.com/'+room+'/chat');

// FIREBASE POST add messages to array
var chat = {
  post : function() {
      var name = $('.nameInput').val();
      var text = $('.messageInput').val();
      // chatDataRef.push({name: name, text: text});
      chatDataRef.push({name: name, text: text});

      $('.messageInput').val('');
      // chatDataRef.set('User ' + name + ' says ' + text); <-- String
      // chatDataRef.set({name: name, text: text}); <-- Object
    }

};

// FIREBASE GET when message is added
chatDataRef.on('child_added', function(snapshot) {
  var message = snapshot.val(); // set message variable to whatever message is added
  displayChatMessage(message.name, message.text);
});

// FIREBASE display chat messages
function displayChatMessage(name, text) {
  // console.log(name, text);
  $('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('.messages-wrapper'));
  $('.messages-wrapper')[0].scrollTop = $('.messages-wrapper')[0].scrollHeight;
};


// Load when page loads  
$( document ).ready(function() {
  $('.messageInput').keypress(function (e) {
      if (e.keyCode == 13) {
      chat.post();
    }
  })
});