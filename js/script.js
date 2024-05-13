const typingText = document.querySelector(".typing-text p");
inpfield=document.querySelector(".wrapper .input-field");
mistakestag=document.querySelector(".Mistakes span");
timetag=document.querySelector(".time span");
wpmtag=document.querySelector(".wpm span");
cpmtag=document.querySelector(".cpm span");
tryagainbtn=document.querySelector("button");


let timer;
maxtime=60;
timeleft=maxtime;

let charindex=mistakes=istyping=0;



function randomparagraph(){
    let randindex=Math.floor(Math.random()*paragraphs.length);
    typingText.innerHTML=" ";
    paragraphs[randindex].split("").forEach(span=>{
        let spantag=`<span>${span}</span>`;
        typingText.innerHTML+=spantag;
    })
    document.addEventListener("keydown", () => inpfield.focus());
    typingText.addEventListener("click", () => inpfield.focus());



}
function inittyping(){
    const characters=typingText.querySelectorAll("span");
    let typedchar=inpfield.value.split("")[charindex];
    if(charindex<characters.length-1 && timeleft>0){
        if(!istyping){
            //once timer has started it wont start again
            timer=setInterval(inittimer,1000);
            istyping=true;
        }
    
    
    
    
        if(typedchar==null){
            charindex--;
            if(characters[charindex].classList.contains("incorrect")){
                mistakes--;
            }
            characters[charindex].classList.remove("correct","incorrect");
        }
        else{
            if(characters[charindex].innerText===typedchar){
                characters[charindex].classList.add("correct");
            }
            else{
                mistakes++;
                characters[charindex].classList.add("incorrect");
            }
            charindex++;
    
        }
        let wpm=Math.round((((charindex-mistakes)/5)/(maxtime-timeleft))*60);
        mistakestag.innerText=mistakes;
        wpm=wpm<0||!wpm ||wpm==Infinity?0 :wpm;
        wpmtag.innerText=wpm;
        cpmtag.innerText=charindex-mistakes;

    }
    else{
        clearInterval(timer);

    }


}
function inittimer(){
    if(timer>0){
        timeleft--;
        timetag.innerText=timeleft;
        let wpm = Math.round(((charIndex - mistakes)  / 5) / (maxTime - timeLeft) * 60);
        wpmTag.innerText = wpm;
    }
    else{
        clearInterval(timer);


    }

}
function resetTest() {
    randomparagraph();
    inpfield.value=" ";
    clearInterval(timer);
    timeleft = maxTime;
    charindex = mistakes = isTyping = 0;
    timetag.innerText = timeLeft;
    wpmtag.innerText = 0;
    mistakestag.innerText = mistakes;
    cpmtag.innerText = 0;
}
randomparagraph();
inpfield.addEventListener("input", inittyping);
tryagainbtn.addEventListener("click",resetTest);