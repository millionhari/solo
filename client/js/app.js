// Global variable room
var room = prompt('What room would you like to join?');
var videoUrl;
// Firebase
var eventsDataRef = new Firebase('https://wewatch.firebaseio.com/'+room+'/events');

// Load when page loads  
$( document ).ready(function() {
  $('.urlInput').keypress(function (e) {
      if (e.keyCode == 13) {
      videoUrl = $('.urlInput').val();
      $('.urlInput').val('');
      changeUrl(videoUrl);
    }
  })
});

function changeUrl(url){
  urlArray = url.split('/watch?v=');
  return urlArray[1];
}

// Youtube Video
// Create iframe when API code downloads
var player;
var playerStates = {
  0: 'ended',
  1: 'playing',
  2: 'paused',
  3: 'buffering',
  5: 'video cued'
}

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '400',
    width: '656',
    videoId: changeUrl(),
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}



// Run when video player is ready
function onPlayerReady(event) {
  // Get data from firebase server and jump to current video
  // position upon entering room
  eventsDataRef.on('value', function(data){
    var currentTime = data.val();
    player.seekTo(currentTime.time);
  })
  event.target.pauseVideo();
  // event.target.playVideo();
  eventsDataRef.update({state: 'paused'});
}

// Add to page
var done = false;
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


// SET: Listen to player state, and update state data to firebase
// Watches for changes in YouTube player
function onPlayerStateChange(event) {
  switch(event.data) {
    case 3:
      eventsDataRef.update({time: player.getCurrentTime()});
      eventsDataRef.update({state: 'buffering'});
      // console.log('buffering');
      break;
    case 2:
      eventsDataRef.update({state: 'paused'});
      eventsDataRef.update({time: player.getCurrentTime()});
      // console.log('paused');
      break;
    case 1:
      eventsDataRef.update({state: 'playing'});
      // console.log('playing');
      break;
    case -1:
      eventsDataRef.update({state: 'unstarted'});
      // console.log('unstarted');
      break;
    case 5:
      eventsDataRef.update({state: 'video cued'});
      // console.log('video cued');
      break;
  }
}

// Establish video controls
var videoControls = {
  1 : function(){
    player.playVideo()
  },
  2 : function(){
    player.pauseVideo()
  },
  0 : function(){
    player.stopVideo();
  }
}

// GET: Retrieve player state, call functions
// Watches for changes in Firebase data
eventsDataRef.on('value', function(snapshot) {
  var state = snapshot.val(); // set message variable to whatever message is added
  switch(state.state) {
    case 'buffering':
      break;
      
    case 'paused':
      if (state.state === 'paused'){
        player.pauseVideo();
        console.log('GET: Paused');
      }
      break;
    case 'playing':
      if (state.state === 'playing'){
        player.playVideo();
        console.log('GET: Playing');
      }
      break;
    case 'unstarted':
      console.log('GET: Unstarted');
      break;
    case 'video cued':
      console.log('GET: Video cued');
      break;
  }

});