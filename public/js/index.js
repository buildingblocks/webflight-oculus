(function(window, document) {

        var Video = function Video(cockpit) {
            console.log("Initializing video stream plugin.");
            var video = this;
            
            // Add some UI elements
            $('#cockpit').append('<div id="dronestream1"></div>');
            $('#cockpit').append('<div id="dronestream2"></div>');

            // Start the stream
            stream = new NodecopterStream(
                document.getElementById("dronestream1"),
                {port: 3001},
                document.getElementById("dronestream2")
            );
            
            cockpit.videostream = stream;
            
            $(function () { 
                 vr.load(function(error) {
                    if (error) {
                      window.alert('VR error:\n' + error.toString());
                    }

                    var state = new vr.State();
                    var lastPosition = 0;
                    var frameCheck = 0;
                    var clockWise = 0;
                    var TURN_SPEED_AT_HALF_IN_SECONDS = 7.8;
                    var stop = false;
                    function tick() {
                        vr.requestAnimationFrame(tick);
                        if (!vr.pollState(state)) {
                            alert('NPVR plugin not found/error polling', 0, y);
                            return;
                        }
                        if (state.hmd.present) {
                            frameCheck++;
                            if(frameCheck % 50 == 0)
                            {
                                frameCheck = 0;
                                var currentPosition = state.hmd.rotation[1];
                                //var delta = (1 + (currentPosition - lastPosition)) * 3.142;
                                //var timeToRotate = TURN_SPEED_AT_HALF_IN_SECONDS / delta
                                var sensitivity = 0.05;
                                
                                if(Math.abs(lastPosition - currentPosition) < sensitivity)
                                {
                                    if(stop)
                                    {
                                        stop = false;
                                        cockpit.socket.emit("/pilot/drone", { action : "stop" });
                                    }
                                }
                                else if(lastPosition > currentPosition + sensitivity)
                                {
                                    cockpit.socket.emit("/pilot/drone", { action : "stop" });
                                    cockpit.socket.emit("/pilot/move", { action: "clockwise", speed: 1});
                                    //setTimeout(function() { cockpit.socket.emit("/pilot/drone", { action : "stop" }); }, timeToRotate * 1000);
                                    console.log('Rotating clockwise');
                                    clockWise = 1;
                                    stop = true;
                                }
                                else if(lastPosition < currentPosition - sensitivity)
                                {
                                    cockpit.socket.emit("/pilot/drone", { action : "stop" });
                                    cockpit.socket.emit("/pilot/move", { action: "counterClockwise", speed: 1});
                                    //setTimeout(function() { cockpit.socket.emit("/pilot/drone", { action : "stop" }); }, timeToRotate * 1000);
                                    console.log('Rotating counterClockwise');
                                    clockWise = 2;
                                    stop = true;
                                }
                                lastPosition = currentPosition;
                                //console.log('Rotation:' + state.hmd.rotation[1]);
                            }
                            if(state.sixense.controllers[0].joystick[0] == 1)
                            {
                                cockpit.socket.emit("/pilot/drone", { action : "stop" });
                                cockpit.socket.emit("/pilot/move", { action: "front", speed: 0.5});
                            }
                        }
                    };
                    vr.requestAnimationFrame(tick);
                });
            });
        };

        window.Cockpit.plugins.push(Video);
        
}(window, document));
