/* 
 * browserOverlay.js - TiltChrome namespace
 * version 0.1
 *
 * Copyright (c) 2011 Victor Porof
 *
 * This software is provided 'as-is', without any express or implied
 * warranty. In no event will the authors be held liable for any damages
 * arising from the use of this software.
 *
 * Permission is granted to anyone to use this software for any purpose,
 * including commercial applications, and to alter it and redistribute it
 * freely, subject to the following restrictions:
 *
 *    1. The origin of this software must not be misrepresented; you must not
 *    claim that you wrote the original software. If you use this software
 *    in a product, an acknowledgment in the product documentation would be
 *    appreciated but is not required.
 *
 *    2. Altered source versions must be plainly marked as such, and must not
 *    be misrepresented as being the original software.
 *
 *    3. This notice may not be removed or altered from any source
 *    distribution.
 */
if ("undefined" == typeof(TiltChrome)) {
  var TiltChrome = {};
};

/**
 * Controls the browser overlay for the Tilt extension.
 */
TiltChrome.BrowserOverlay = {
  
  /**
   * The iframe containing the canvas element, used for rendering.
   */
  iframe: null,
  
  /*
   * Visualization logic and drawing loop.
   */
  visualization: null,
  
  /**
   * Initializes Tilt.
   * @param {object XULCommandEvent} aEvent: the event firing this function
   */
  initialize: function(aEvent) { 
    Components.utils.forceGC();
    
    TiltUtils.Console.error(TiltUtils.StringBundle.format(
      "linkProgram.error", ["ceva", "altceva"]));
      
    var tiltMenu = document.getElementById("tilt-menuItemInitialize");    
    if (this.iframe) {
      tiltMenu.label = TiltUtils.StringBundle.get("menuItemInitialize.label");
      return this.destroy();
    }
    else {
      tiltMenu.label = TiltUtils.StringBundle.get("menuItemHide.label");
    }
    
    var that = this;
    TiltUtils.Iframe.initCanvas(function loadCallback(iframe, canvas) {
      that.iframe = iframe;
      
      canvas.width = iframe.contentWindow.innerWidth;
      canvas.height = iframe.contentWindow.innerHeight;
      
      that.visualization = new TiltVisualization(canvas);
      that.visualization.setup();
      that.visualization.loop();
    }, true);
  },
  
  /**
   * Destroys Tilt, removing the iframe from the stack.
   */
  destroy: function() {
    TiltUtils.Iframe.removeFromStack(this.iframe);
    this.iframe = null;
    this.visualization = null;
    
    Components.utils.forceGC();
  }
};