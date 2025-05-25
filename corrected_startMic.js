Lipsync.prototype.startMic = function(){
  // Restart
  this.stopSample();
  
  var thatLip = this; // Capture 'this' for use in promise callbacks
  navigator.mediaDevices.getUserMedia({audio: true})
    .then(function(stream) {
      thatLip.stream = stream;
      thatLip.sample = thatLip.context.createMediaStreamSource(stream);
      thatLip.sample.connect(thatLip.analyser);
      thatLip.working = true; 
    })
    .catch(function(e){
      console.error("ERROR: get user media: ", e);
      thatLip.working = false; 
    });
}
