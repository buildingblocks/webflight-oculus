webflight-oculus
================

A Proof of Concept Oculus Rift Plugin for AR-Webflight (http://eschnou.github.io/ardrone-webflight/)

Uses a custom fork of node-dronesteam (https://github.com/buildingblocks/node-dronestream) to stream the video from the Parrot AR Drone into both eyes of the Oculus Rift VR headset.

Also contains proof of concept code for having the copter turn as you turn your head in the VR headset.

Requires VR.js (https://github.com/benvanik/vr.js) and AR-Webflight (http://eschnou.github.io/ardrone-webflight/) 

Includes the excellent VR.js plugin code.

Installation
============

 * Install AR-Webflight (http://eschnou.github.io/ardrone-webflight/)
 * Install the custom build of node-dronestream (https://github.com/buildingblocks/node-dronestream) - a pull request has been sent to hopefully make this unnesscary. You will need to download our fork, run grunt and copy nodecopter-client.js to the appropriate directory on the AR-WebFlight node_modules directory.
 * Install the VR.js Chrome plugin (only tested with Chrome)
 * Create a new "oculus" directory in the /plugins directory of AR-Webflight.
 * Update the config.js to include the plugin like below
 * Plug in the Oculus Rift
 * Clone your screen into the Oculus Rift
 * Run AR-Webflight
 * Hit F11 to enter full screen mode in Chrome - this makes it a little better.
 * Try not to hit the flip key too many times or you might feel a bit sick!
   
Config Example
=============

     var config = {
         plugins: [
           //   "video-png"     // Display the video feed as static pngs (work in every browser)
           //, "video-stream"  // Display the video as a native h264 stream decoded in JS 
           "oculus"        // Proof of concept Support for Oculus Rift VR Headset - Turn off Video Stream and Video Png. Requires VR.js plugin for Chrome and Firefox https://github.com/benvanik/vr.js
           , "hud"           // Display the artificial horizon, altimeter, compass, etc.
           , "battery"       // Display a simple battery widget in the header bar
           , "pilot"         // Pilot the drone with the keyboard
           , "blackbox"      // Experimental: Records all mision data (navData, raw video, PaVE headers, etc.)
           //, "replay"        // Experimental: Replay the data recorded by the blackbox
         ],

         // Config for pilot plugin
         keyboard: 'azerty',

         // Config for blackbox plugin. Path is an existing folder where to store mission data
         // Each new mission will have its own timestamped folder.
         blackbox: {
            path: "/tmp"
         },

         // Config for replay plugin. Path points to a specific mission folder to be replayed.
         replay: {
            path: "/tmp/2013-06-03_09-10-33/"
         }
      };

      module.exports = config;
