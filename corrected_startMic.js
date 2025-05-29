Lipsync.prototype.startMic = function(){
  // Restart
  this.stopSample();
  navigator.mediaDevices.getUserMedia({audio: true})
    .then((stream) => {
      this.stream = stream;
      this.sample = this.context.createMediaStreamSource(stream);
      this.sample.connect(this.analyser);
      this.working = true; 
    })
    .catch((e)=> {
      console.error("ERROR: get user media: ", e);
      this.working = false; 
    });
}
