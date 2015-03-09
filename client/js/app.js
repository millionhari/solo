
//Youtube Video
function getURL(){
  // var requestedURL = prompt('What is the link of your YouTube video?');
  // requestedURL = requestedURL.split('/watch?v=');
  requestedURL = [0,'uBENjCPS8LI'];
  return(requestedURL[1]);
}

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Create iframe when API code downloads
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '600',
    width: '985',
    videoId: getURL(),
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// Run when video player is ready
function onPlayerReady(event) {
  event.target.mute();
  event.target.playVideo();
}

// Call function when player's state changes. When video is playing, state === 1
var done = false;
function onPlayerStateChange(event) {

  // if (event.data == YT.PlayerState.PLAYING && !done) {
    // setTimeout(stopVideo, 6000);
    // done = true;
  // }
}

function stopVideo() {
  player.stopVideo();
}

function playVideo() {
  player.playVideo();
}
