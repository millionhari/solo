// Firebase
var eventsDataRef = new Firebase('https://wewatch.firebaseio.com/events');


// Youtube Video
// Create iframe when API code downloads
var player;

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
  event.target.playVideo();
  eventsDataRef.set({state: 'play'});

}

// Call function when player's state changes. When video is playing, state === 1
var done = false;

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onPlayerStateChange(event) {
  // on pause
  if (event.data === 2){
    eventsDataRef.set({state: 'pause'});
  }
  // on play
  if (event.data === 1){
    eventsDataRef.set({state: 'play'});
  }
  // on unstarted
  if (event.data === -1){
    eventsDataRef.set({state: 'unstarted'});
  }
  // on unstarted
  if (event.data === 3){
    eventsDataRef.set({state: 'buffering'});
  }
  // on video cue
  if (event.data === 5){
    eventsDataRef.set({state: 'cued'});
  }
  console.log(event);
  // if (event.data == YT.PlayerState.PLAYING && !done) {
    // setTimeout(stopVideo, 6000);
    // done = true;
  // }
}
