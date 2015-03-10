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
  // Get data from firebase server
  eventsDataRef.on('value', function(data){
    var currentTime = data.val();
    player.seekTo(currentTime.time);
  })
  event.target.pauseVideo();
  eventsDataRef.child(player.videoId.toString()).update({state: 'play'});
}

var done = false;
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


// GET Listen to player state, and send data to firebase
function onPlayerStateChange(event) {
  // on pause
  if (event.data === 2){
    eventsDataRef.update({state: 'pause'});
    eventsDataRef.update({time: player.getCurrentTime()});
    console.log('event data 2');
  }
  // on play
  if (event.data === 1){
    eventsDataRef.update({state: 'play'});
  }
  // on unstarted
  if (event.data === -1){
    eventsDataRef.update({state: 'unstarted'});
  }
  // on unstarted
  // if (event.data === 3){
  //   eventsDataRef.update({state: 'buffering'});
  // }
  // on video cue
  if (event.data === 5){
    eventsDataRef.update({state: 'cued'});
  }
  // if (event.data == YT.PlayerState.PLAYING && !done) {
    // setTimeout(stopVideo, 6000);
    // done = true;
  // }
}
$( document ).ready(function() {

});