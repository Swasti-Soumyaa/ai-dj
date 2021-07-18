song="";

leftwristx=0;
rightwristx=0;

leftwristy=0;
rightwristy=0;

score_leftwrist=0;
score_rightwrist=0;

function setup(){
    canvas=createCanvas(500,500)
    canvas.center();

    video=createCapture(VIDEO)
    video.hide();
    video.size(500,500)

    poseNet=ml5.poseNet(video,modelLoaded)
    poseNet.on('pose', gotPoses)
}

function preload(){
    song=loadSound("music.mp3")
}

function draw(){
    image(video,0,0,500,500)
    fill("red")
    stroke("red")

    if (score_leftwrist>0.2){
        circle(leftwristx,leftwristy,20);

        leftwrist_number=Number(leftwristy);
        removeDecimals=floor(leftwrist_number);
        volume=(removeDecimals/500);
        song.setVolume(volume);
        document.getElementById("volume").innerHTML="Volume: "+volume 
    }

    if(score_rightwrist>0.2){
        circle(rightwristx,rightwristy,20)

        if (rightwristy>0&&rightwristy<=100){
            document.getElementById("speed").innerHTML="Speed:0.5x"
            song.rate(0.5)

        }
        else if(rightwristy>100&&rightwristy<=200){
            document.getElementById("speed").innerHTML="Speed:1x"
            song.rate(1)
        }
        else if(rightwristy>200&&rightwristy<=300){
            document.getElementById("speed").innerHTML="Speed:1.5x"
            song.rate(1.5)
        }
        else if(rightwristy>300&&rightwristy<=400){
            document.getElementById("speed").innerHTML="Speed:2x"
            song.rate(2)
        }
        else if(rightwristy>400&&rightwristy<=500){
            document.getElementById("speed").innerHTML="Speed:2.5x"
            song.rate(2.5)
        }
    }

}

function play(){

    song.play();
    song.setVolume(1);
    song.rate(1);
}

function stop(){
    song.stop()
}

function modelLoaded(){
    console.log('poseNet is initialized')
}

function gotPoses(result){
    if(result.length>0){

        console.log(result)
        leftwristx=result[0].pose.leftWrist.x
        leftwristy=result[0].pose.leftWrist.y

        rightwristx=result[0].pose.rightWrist.x
        rightwristy=result[0].pose.rightWrist.y

        console.log(leftwristx,leftwristy)
        console.log(rightwristx,rightwristy)

        score_leftwrist=result[0].pose.keypoints[9].score;
        score_rightwrist=result[0].pose.keypoints[10].score;
        console.log(score_leftwrist,score_rightwrist);
    }

}

