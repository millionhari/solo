// Global variable room
var room = prompt('What room would you like to join?');

// Firebase
var eventsDataRef = new Firebase('https://wewatch.firebaseio.com/'+room+'/events');

// Youtube Video
// Create iframe when API code downloads
var player;
var hello = '';

// Set time of the video
// setInterval(function(){
//   eventsDataRef.update({time: player.getCurrentTime()})
// }, 1)

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '400',
    width: '656',
    videoId: getURL(),
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

var videoControls = {
  playVid : function() {
    player.playVideo(data);
  },
  stopVid : function() {
    player.stopVideo(data);
  }
};

function getURL(){
  // var requestedURL = prompt('What is the link of your YouTube video?');
  // requestedURL = requestedURL.split('/watch?v=');
  requestedURL = [0,'uBENjCPS8LI'];
  return(requestedURL[1]);
}

var tag = document.createElement('script');


// Run when video player is ready
function onPlayerReady(event) {
  event.target.mute();
  // Get data from firebase server and jump to current video
  // position upon entering room
  eventsDataRef.on('value', function(data){
    var currentTime = data.val();
    player.seekTo(currentTime.time);
  })
  event.target.pauseVideo();
  // event.target.playVideo();
  // eventsDataRef.update({state: 'play'});
}

var done = false;
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


// Listen to player state, and updata state data to firebase
function onPlayerStateChange(event) {
  var state;
  switch(event.data) {
    case 3:
      state = 'buffering';
      eventsDataRef.update({time: player.getCurrentTime()});
      break;
    case 2:
      state = 'pause';
      eventsDataRef.update({time: player.getCurrentTime()});
      break;
    case 1:
      state = 'play';
      player.playVideo();
      break;
    case -1:
      state = 'unstarted';
      break;
    case 5:
      state = 'cued';
      break;
  }

  eventsDataRef.update({state: state});
  // if (event.data == YT.PlayerState.PLAYING && !done) {
    // setTimeout(stopVideo, 6000);
    // done = true;
  // }
}
$( document ).ready(function() {

});