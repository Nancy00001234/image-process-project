//Filters Algorithm
var canvas = document.getElementById("can");
//initial width output
var canWidthOut = document.getElementById("canWidthOut");
canWidthOut.value = 300 + 'px';
//create global variables 
var imgO = null;
var imgModif = null;
var grayimg = null;
var redimg = null;
var rbimg = null;
//var blurimg = null;
var fileinput = null;

function loadImage() {
  fileinput = document.getElementById("file");
  imgO = new SimpleImage(fileinput);
  imgModif = new SimpleImage(fileinput);
  grayimg = new SimpleImage(fileinput);
  redimg = new SimpleImage(fileinput);
  rbimg = new SimpleImage(fileinput);
  //blurimg = new SimpleImage(fileinput);
  imgO.drawTo(canvas);
}
//check if image is loaded
function imageIsLoaded(image) {
  if ( image==null || !image.complete() ) {
    alert("image not loaded");
    return;
  }
  else {
    return true;
  }
}
//reset function
function reset() {
  if ( imageIsLoaded(imgO) ) {
    canvas.style.filter = "none";
    imgO = new SimpleImage(fileinput);
    imgO.drawTo(canvas);
    grayimg = imgO;//reset all global variables for filter images to the original image
    redimg = imgO;//同上
    rbimg = imgO;
    imgModif = imgO;
  }
}
//clear canvas
function doclear() {
   var context = canvas.getContext("2d"); 
   context.clearRect(0, 0, canvas.width, canvas.height);
}

//set width of the canvas
function setCanWidth(Width) {
  //var winput = document.getElementById("canw");
  //Width = winput.value;
  canvas.style.width = Width + 'px';
  canWidthOut.value = canvas.style.width;
}

function changeGray() {
  if ( imageIsLoaded(grayimg) ) {
    for ( var pixel of grayimg.values() ) {
      var avg = (pixel.getRed()+pixel.getGreen()+pixel.getBlue()) / 3;
      pixel.setRed(avg);
      pixel.setGreen(avg);
      pixel.setBlue(avg);
    }
  doclear();  
  grayimg.drawTo(canvas);
  imgModif = grayimg;  
  }  
}

function changeRed() {
  if ( imageIsLoaded(redimg) ) {
    for ( var pixel of redimg.values() ) {
      var avg = (pixel.getRed()+pixel.getGreen()+pixel.getBlue()) / 3;
      doRed(avg, pixel);
    }
    redimg.drawTo(canvas);
    imgModif = redimg;
  }
}

function changeRainbow() {
  if ( imageIsLoaded(rbimg) ) {
    for ( var pixel of rbimg.values() ) {
      var avg = (pixel.getRed()+pixel.getGreen()+pixel.getBlue()) / 3;
      var y = pixel.getY();
      var h = rbimg.getHeight();
      if (y<=1/7*h) {
        doRed(avg, pixel);//red
      }
      else if (y<=2/7*h) {
        doOrange(avg, pixel);//orange
      }
      else if (y<=3/7*h) {
        doYellow(avg, pixel);//yellow
      }
      else if (y<=4/7*h) {
        doGreen(avg, pixel);//green
      }
      else if (y<=5/7*h) {
        doBlue(avg, pixel);//blue
      }
      else if (y<=6/7*h) {
        doIndigo(avg, pixel);//indigo
      }
      else {
        doViolet(avg, pixel);//violet
      }
    }
    rbimg.drawTo(canvas);
    imgModif = rbimg;
  }
}

//7 functions of setting rb colors
function doRed(avg, pixel) {
  if (avg<128) {
    pixel.setRed(2*avg);
    pixel.setGreen(0);
    pixel.setBlue(0);
  }
  else {
    pixel.setRed(255);
    pixel.setGreen(2*avg-255);
    pixel.setBlue(2*avg-255);
  }
}
function doOrange(avg, pixel) {
  if (avg<128) {
    pixel.setRed(2*avg);
    pixel.setGreen(0.8*avg);
    pixel.setBlue(0);
  }
  else {
    pixel.setRed(255);
    pixel.setGreen(1.2*avg-51);
    pixel.setBlue(2*avg-255);
  }
}
function doYellow(avg, pixel) {
  if (avg<128) {
    pixel.setRed(2*avg);
    pixel.setGreen(2*avg);
    pixel.setBlue(0);
  }
  else {
    pixel.setRed(255);
    pixel.setGreen(255);
    pixel.setBlue(2*avg-255);
  }
}
function doGreen(avg, pixel) {
  if (avg<128) {
    pixel.setRed(0);
    pixel.setGreen(2*avg);
    pixel.setBlue(0);
  }
  else {
    pixel.setRed(2*avg-255);
    pixel.setGreen(255);
    pixel.setBlue(2*avg-255);
  }
}
function doBlue(avg, pixel) {
  if (avg<128) {
    pixel.setRed(0);
    pixel.setGreen(0);
    pixel.setBlue(2*avg);
  }
  else {
    pixel.setRed(2*avg-255);
    pixel.setGreen(2*avg-255);
    pixel.setBlue(255);
  }
}
function doIndigo(avg, pixel) {
  if (avg<128) {
    pixel.setRed(0.8*avg);
    pixel.setGreen(0);
    pixel.setBlue(2*avg);
  }
  else {
    pixel.setRed(1.2*avg-51);
    pixel.setGreen(2*avg-255);
    pixel.setBlue(255);
  }
}
function doViolet(avg, pixel) {
  if (avg<128) {
    pixel.setRed(1.6*avg);
    pixel.setGreen(0);
    pixel.setBlue(1.6*avg);
  }
  else {
    pixel.setRed(0.4*avg+153);
    pixel.setGreen(2*avg-255);
    pixel.setBlue(0.4*avg+153);
  }
}

//blur(use CSS style)
//function doBlur() {
//  canvas.style.filter = "blur(2px)";
//}

//blur(create a function myself)
function doBlur() {
  if ( imageIsLoaded(imgO) ) {
    var blurimg = new SimpleImage(imgModif.getWidth(), imgModif.getHeight());
    for (var pixel of imgModif.values()) {
      var num_judge = Math.random();//num_judge: judge whether to apply blur
      var x = pixel.getX();
      var y = pixel.getY();
      if (num_judge < 0.5) {//whether the pixel needs change
        blurimg.setPixel(x,y,pixel);
      }
      else {
        var num_rx = Math.random() * 10;
        var num_ry = Math.random() * 10;
        var num_chx = Math.ceil(num_rx);
        var num_chy = Math.ceil(num_ry);
        var newX = x + num_chx;
        var newY = y + num_chx;
        if (newX <= imgModif.getWidth()-1 && newY <= imgModif.getHeight()-1) {
          var blurpixel = imgModif.getPixel(newX,newY);
          blurimg.setPixel(x,y,blurpixel);
        }
        else {
          blurimg.setPixel(x,y,pixel);//out of range, copy original
        }
      }
    }
    blurimg.drawTo(canvas);
    imgModif = blurimg;
  }
}

//mirror
function changeMirr() {
  if ( imageIsLoaded(imgO) ) {
    var w = imgO.getWidth();
    var h = imgO.getHeight();
    var mirrimg = new SimpleImage(w,h); 
    for (var pixel of imgModif.values()) {
      var x = pixel.getX();
      var y = pixel.getY();
      var mirrpixel = imgModif.getPixel(w-1-x, y);//w-1=max(x)，so we must minus one
      mirrimg.setPixel(x,y,mirrpixel);
    }
    mirrimg.drawTo(canvas);
    imgModif = mirrimg;
  }
}


//Greenscreen Algorithm
//set global variables
var fgimg = null;
var bgimg = null;
var fgcanvas = document.getElementById("fgcan");
var bgcanvas = document.getElementById("bgcan");

//load fg&bg images
function loadForegroundImage() {
  var fgfileinput = document.getElementById("fgfile");
  fgimg = new SimpleImage(fgfileinput);
  fgimg.drawTo(fgcanvas);
}
function loadBackgroundImage() {
  var bgfileinput = document.getElementById("bgfile");
  bgimg = new SimpleImage(bgfileinput);
  bgimg.drawTo(bgcanvas);
}

function clearCanvas() {
  var fgctx = fgcanvas.getContext("2d");
  fgctx.clearRect(0, 0, fgcanvas.width, fgcanvas.height);
  var bgctx = bgcanvas.getContext("2d");
  bgctx.clearRect(0, 0, bgcanvas.width, bgcanvas.height);
}

function doGreenScreen() {
  //protect
  if ( fgimg==null || !fgimg.complete() ) {
    alert("foreground not loaded");
    return;
  }
  if ( bgimg==null || !fgimg.complete() ) {
    alert("background not loaded");
    return; 
  }
  sizecut();
  //正式开始
  clearCanvas();
  var output = new SimpleImage(fgimg.getWidth(),fgimg.getHeight());
  for ( var pixel of fgimg.values() ) {
     var x = pixel.getX();
     var y = pixel.getY();
    if (pixel.getGreen() > pixel.getRed()+pixel.getBlue()) {
      var bgpixel = bgimg.getPixel(x,y);
      output.setPixel(x,y,bgpixel);
    }
    else {
      output.setPixel(x,y,pixel);
    }
  }
  //clearCanvas();
  output.drawTo(fgcanvas);
}

function sizecut() {
  if ( fgimg.getWidth() != bgimg.getWidth() ) {
    bgimg.setSize(fgimg.getWidth(), fgimg.getHeight());
  } 
  bgimg.drawTo(bgcanvas);
}
