img="";
status="";
objects="";

function preload() {}

function setup() {
    canvas=createCanvas(640,420);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(640,420);
    video.hide();
    objectdetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status:Detecting Objects";
}

function modelLoaded(){
    console.log("model loaded!");
    status=true;
}

function gotresult(error,results) {
    if(error) {
        console.error(error);
    }
    else {
        console.log(results);
        objects=results;
    }
} 

function draw() {
    image(video,0,0,640,420);
    if(status != "") {
        objectdetector.detect(video,gotresult);
        for(i=0;i < objects.length; i++) {
            document.getElementById("status").innerHTML="Status:Object Detected";
            fill('#FF0000');
            percentage=floor(objects[i].confidence * 100);
            text(objects[i].label + " " +percentage +"%",objects[i].x +15,objects[i].y +15);
            noFill();
            stroke('#FF0000');
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

            if(objects[i].label=="person") {
                document.getElementById("number_of_objects").innerHTML="Baby Found";
            }
            else {
                document.getElementById("number_of_objects").innerHTML="Baby Not Found";
            }

            if(objects.length==0) {
                document.getElementById("number_of_objects").innerHTML="Baby Not Found";
            }
        }
    }
}