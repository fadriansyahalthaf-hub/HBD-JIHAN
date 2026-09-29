const pages=[...document.querySelectorAll('.page')];
let score=0,lives=3,playing=false;

function next(id){pages.forEach(p=>p.classList.remove('active'));document.getElementById(id).classList.add('active')}

function loading(){
 next('p3');let n=0;
 const bar=document.getElementById('bar'),pct=document.getElementById('pct');
 const t=setInterval(()=>{n+=Math.floor(Math.random()*8)+5;if(n>=100){n=100;clearInterval(t);setTimeout(startGame,350)}
 bar.style.width=n+'%';pct.textContent=n+'%'},120)
}
function startGame(){
 next('p4');score=0;lives=3;playing=true;
 document.getElementById('score').textContent=0;updateLives();move();
}
function updateLives(){document.getElementById('lives').textContent='♥ '.repeat(lives).trim()+' '+ '♡ '.repeat(3-lives)}
function move(){
 const s=document.getElementById('target');
 s.style.left=(30+Math.random()*(innerWidth-110))+'px';
 s.style.top=(120+Math.random()*(innerHeight-190))+'px';
 s.style.transform=`rotate(${-25+Math.random()*50}deg)`;
}
function catchSpider(){
 if(!playing)return;score+=10;document.getElementById('score').textContent=score;
 if(score>=100){playing=false;setTimeout(()=>{next('p5');confetti()},250)}else move();
}
document.getElementById('p4').addEventListener('click',e=>{
 if(!playing||e.target.id==='target')return;
 lives--;if(lives<=0)lives=3;updateLives();move();
});
function confetti(){
 for(let i=0;i<90;i++){let x=document.createElement('i');x.className='conf';x.style.left=Math.random()*100+'%';x.style.background=['#ffd34d','#fff','#ff6473','#68c7ff'][i%4];x.style.animationDelay=Math.random()*1.2+'s';x.style.transform=`rotate(${Math.random()*360}deg)`;document.body.appendChild(x);setTimeout(()=>x.remove(),4000)}
}
addEventListener('resize',()=>playing&&move());
