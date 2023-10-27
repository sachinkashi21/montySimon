let gameSequence=[];
let userSequence=[];
let started=false
let level=0;
let scores=[];
let highestScore=0;
let str=["yellow","red","green","blue"]
let btns=document.querySelectorAll(".ele");

document.addEventListener("keydown",function(){
    if(started==false){
        started=true;
        levelUp();
    }
})

function levelUp(){
    userSequence=[];
    level++;
    let h4=document.querySelector(".instruction");
    h4.innerHTML=`Level: ${level}`;
    let idx=Math.floor(Math.random() *4);
    let btn=document.querySelector(`.${str[idx]}`);
    gameSequence.push(str[idx]);
    flashBtn(btn);
}

function flashBtn(btn){
    btn.classList.add("glow");
    setTimeout(()=>{
        btn.classList.remove("glow");
    },200);
}

function checkAns(idx){
    if(userSequence[idx]===gameSequence[idx]){
        if(userSequence.length===gameSequence.length){
            setTimeout(levelUp,1000);
        }
    } else{
        let h4=document.querySelector(".instruction");
        scores.push(level-1);
        highestScore=Math.max(...scores);
        console.log(scores);
        h4.innerHTML=`Game Over. Your Score=${level-1}. Highest Score=${highestScore}`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="black";
        },1000)
        reset();
    }
}

for(btn of btns){
    btn.addEventListener("click",function(){
        flashBtn(this);
        let userColor=this.getAttribute("id");
        userSequence.push(userColor);
        if(started==true){
            checkAns(userSequence.length-1);
        }
    })
}

function reset(){
    started=false;
    gameSequence=[];
    userSequence=[];
    level=0;
}


