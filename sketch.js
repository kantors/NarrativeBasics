function preload() {
  alarmSound = loadSound('./assets/Alarm.mp3');
  
  bed1 = loadSound('./assets/bed1.mp3');
  bed2 = loadSound('./assets/bed3.mp3');
  
  doorOpen = loadSound('./assets/doorOpen.mp3');
  doorClose = loadSound('./assets/doorClose.mp3');
  
  bedroom5 = loadImage("assets/bedroom5.png"); 
  bedroom4 = loadImage("assets/bedroom4.png"); 
  bedroom3 = loadImage("assets/bedroom3.png"); 
  bedroom2 = loadImage("assets/bedroom2.png"); 
  bedroom1 = loadImage("assets/bedroom1.png"); 
  img = bedroom3;
}
var alarmX = 920;
var alarmY = 600;
var ruffleX = 120;
var ruffleY = 620;
var doorX = 620;
var doorY = 160;
var bedSounds = [];
var listOfImages = [];
var bedIndex = 0;
var isOpen = false;
var bedRuffle = false;
var hearAlarm = true;
var removeDoor = false; 
var currPage = 2;
var justMoved = false;

function setup() {
  bedSounds.push(bed1);
  bedSounds.push(bed2);
  
  listOfImages.push(bedroom1);
  listOfImages.push(bedroom2);
  listOfImages.push(bedroom3);
  listOfImages.push(bedroom4);
  listOfImages.push(bedroom5);
  
  
  createCanvas(1280, 780);
  background(200);

  img.resize(1280, 780);
    alarm();
    ruffle();
    door();
    arrows()

}

function setPage() {

  if(currPage === 0) {
    
    alarmSound.setVolume(.1);
    
  }
  
  if(currPage === 1) {
    alarmSound.setVolume(.2);
    
  }
  
  if(currPage === 2) {

    
  }
   if(currPage === 3) {
  alarmSound.setVolume(.2);
    
  }
  
   if(currPage === 4) {
   alarmSound.setVolume(.1);
    
    
  }
  
}

function arrows() {
   rightArrow  = createButton("");
  rightArrow.size(50,50);
  rightArrow.position(1215, 370);
  rightArrow.style("background-color", "transparent");
  rightArrow.mousePressed(moveRight);
  rightArrow.style("border", "none");
  rightArrow.style("outline", "none");
  
   leftArrow  = createButton("");
  leftArrow.size(50,50);
  leftArrow.position(23, 370);
  leftArrow.style("background-color", "transparent");
  leftArrow.style("background-color", "transparent");
  leftArrow.mousePressed(moveLeft);
  leftArrow.style("border", "none");
  leftArrow.style("outline", "none");
}

function moveRight() {
  if(currPage+ 1 < 5){
   var newPage = currPage + 1;
    currPage = newPage;
   img = listOfImages[newPage];
    img.resize(1280, 780);
    setPage();
  }
}

function moveLeft() {
  if(currPage- 1 > -1){
   var newPage = currPage - 1;
    currPage = newPage;
   img = listOfImages[newPage];
    img.resize(1280, 780);
    setPage();
  }
}

function alarm() {
    alarmSound.loop();
    alarmButton = createButton("");
    alarmButton.position(alarmX, alarmY);
    alarmButton.size(400,200);
    alarmButton.style("background-color", "transparent");
    alarmButton.style("border", "none");
    alarmButton.style("outline", "none");
    
    alarmButton.mousePressed(alarmPlayPause);
    
}



function ruffle() {
  ruffleButton = createButton("");
  ruffleButton.position(ruffleX, ruffleY);
  ruffleButton.style("background-color", "transparent");
  ruffleButton.style("border", "none");
  ruffleButton.style("outline", "none");
  ruffleButton.size(900,150);
  ruffleButton.mouseOver(ruffleMove);
  ruffleButton.mouseOut(ruffleOff);
}

function door() {
  doorButton = createButton("");
  doorButton.position(doorX, doorY);
  doorButton.size(50,200);
  doorButton.style("background-color", "transparent");
  //doorButton.style("border", "none");
  doorButton.style("outline", "none");
  if(currPage ===2) {
  doorButton.mouseOut(doorSound);
  

  }
}



function alarmPlayPause() {
  if(currPage ===2) {
  if(hearAlarm === true) {
    alarmSound.pause();
    hearAlarm = false;
  }
  else {
    alarmSound.play();
    hearAlarm = true;
  }
  }
}

function ruffleMove() {
  bedSounds[0].play();
 
}
function ruffleOff() {
  bedSounds[0].pause();
}

function doorSound() {
  if(isOpen === false){
    doorOpen.play();
   
    isOpen = true;
  }
  else {
    doorOpen.pause();

    isOpen = false;
  }
  link = createA("blindness/index2.html", " ass", "_parent");
  link.position(133,123);



}

function doorPressed() {
  
}

function randomIndex() {
 
  bedIndex = floor(random(0, 2));
}

function volumeChange() {
  var distance = sqrt(sq(mouseX-alarmX) + sq(mouseY - alarmY));
  var mappedDistance = 1 - map(distance, 1 ,700,.3, .6);
  alarmSound.setVolume(mappedDistance);
  
}

function draw() {
  
  image(img, 0, 0);
  if(removeDoor === true) {
    doorButton.remove();
  }
  else {
    door();
  }
  
  if(currPage === 2){
    volumeChange();
  }
  

  randomIndex();

  
  
}