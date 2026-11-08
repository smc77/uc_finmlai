(function heroLabs(){
"use strict";
const ids={"information-clock":"clock","trees":"trees","train-validate-test":"split","execution":"execution"};
let active=null,timer=null,step=0,mode="tree",bad=false,qty=500,urgency=50;
const max={clock:12,trees:7,split:6,execution:8};
const colors={teal:"#2d625b",red:"#a94332",blue:"#346d87",amber:"#bb842c",ink:"#19201f"};
const e=s=>String(s).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;");
const tx=(x,y,s,c="#19201f",size=13,anchor="middle")=>`<text x="${x}" y="${y}" font-family="system-ui,sans-serif" font-size="${size}" text-anchor="${anchor}" fill="${c}">${e(s)}</text>`;
const rect=(x,y,w,h,c="#ece8dd",border="#bbb5a9")=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="5" fill="${c}" stroke="${border}" />`;
const line=(x,y,X,Y,c="#8c948b",wide=2,dash=false)=>`<line x1="${x}" y1="${y}" x2="${X}" y2="${Y}" stroke="${c}" stroke-width="${wide}" ${dash?'stroke-dasharray="5 5"':''}/>`;
const dot=(x,y,r,c)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/>`;
const svg=s=>`<svg viewBox="0 0 700 320" style="display:block;width:100%;height:auto" role="img" aria-label="Animated explanatory visualization">${s}</svg>`;
function stop(){if(timer)clearInterval(timer);timer=null}
function clock(){
const x=56+step*47,dates=["Jan 31","Feb 15","Mar 10"],events=[56,244,526];
let s=tx(350,30,"Advance the historical decision date",colors.ink,18)+line(50,128,640,128,colors.blue,4);
events.forEach((v,i)=>{s+=dot(v,128,10,step>=([0,4,10][i])?colors.teal:"#a8a59e")+tx(v,91,dates[i])+tx(v,165,["First decision","Original filing","Vendor revision"][i],"#626964",12)});
s+=line(x,51,x,198,colors.amber,3)+rect(Math.min(580,Math.max(5,x-59)),42,118,25,"#f4e1bc",colors.amber)+tx(Math.min(639,Math.max(64,x)),60,"Decision date","#74521b",12);
const hasOriginal=step>=4,hasRevised=step>=10;
s+=rect(20,215,205,68,hasOriginal?"#d6e2df":"#e4e1d9")+tx(122,241,"Original release")+tx(122,264,hasOriginal?"AVAILABLE":"NOT YET",hasOriginal?colors.teal:colors.red,15);
s+=rect(247,215,205,68,hasRevised?"#d6e2df":"#e4e1d9")+tx(349,241,"Revised data")+tx(349,264,hasRevised?"AVAILABLE":"NOT YET",hasRevised?colors.teal:colors.red,15);
s+=rect(475,215,205,68,"#efe4d5")+tx(578,240,"Usable version")+tx(578,265,hasRevised?"Revised":hasOriginal?"Original":"Neither",colors.ink,17);
return {html:svg(s),note:hasRevised?"The revised observation can now be used. Before March, it would be future information.":hasOriginal?"The first filing is available, but its later revision is not.":"The fiscal period may have ended, but its reported value is not yet available."}
}
function trees(){
let s=tx(350,25,mode==="tree"?"A tree learns decision regions":mode==="forest"?"Randomized trees → average prediction":"Boosting adds corrections in sequence",colors.ink,18);
s+=rect(24,45,395,225,"#f8f7f3");
for(let i=0;i<57;i++){let x=39+(i*73)%366,y=59+(i*53+9*i*i)%196;let positive=(x<218&&y<158)||(x>=218&&y>139);s+=dot(x,y,4,positive?colors.blue:"#cf8665")}
if(mode==="tree"){
if(step>=1)s+=line(218,46,218,269,colors.teal,3);
if(step>=3)s+=line(24,158,218,158,colors.amber,3)+line(218,139,419,139,colors.amber,3);
if(step>=5){s+=`<rect x="25" y="46" width="192" height="111" fill="#2d625b" opacity=".13"/><rect x="219" y="140" width="199" height="129" fill="#bb842c" opacity=".13"/>`}
s+=tx(221,300,step===0?"Blue and orange examples":step<3?"First split: momentum threshold":step<5?"Second splits: an interaction":"Different regions get different predictions","#626964",13)
} else if(mode==="forest"){
const p=[0.9,1.5,0.6,1.2,0.8,1.1,0.7],n=Math.min(step,p.length),mean=n?p.slice(0,n).reduce((a,b)=>a+b,0)/n:0;
for(let i=0;i<n;i++){let X=442+(i%2)*118,Y=50+Math.floor(i/2)*45;s+=rect(X,Y,106,38,"#d6e2df",colors.teal)+tx(X+53,Y+24,"Tree "+(i+1)+": "+p[i].toFixed(1)+"%",colors.ink,12)}
s+=tx(555,268,n?"Average: "+mean.toFixed(2)+"%":"Build randomized trees",colors.teal,17)
}else{
const p=[0.40,0.28,0.17,0.09,0.05,0.02,0.01],n=Math.min(step,p.length),sum=p.slice(0,n).reduce((a,b)=>a+b,0);
for(let i=0;i<n;i++){let X=440+(i%2)*119,Y=49+Math.floor(i/2)*46;s+=rect(X,Y,109,38,i===n-1?"#f1ddbc":"#e9e4d8")+tx(X+54,Y+24,(i===0?"Base":"Fix "+i)+" +"+p[i].toFixed(2),colors.ink,11)}
s+=tx(560,271,n?"Sum: "+sum.toFixed(2):"Fit first learner",colors.amber,17)
}
return {html:svg(s),note:mode==="tree"?"Each new split partitions the feature space into smaller regions.":mode==="forest"?"Trees are trained separately on randomized data/features and combined by averaging.":"Each learner adds a correction to the current prediction, reducing the remaining loss in this illustrative sequence."}
}
function split(){
let k=step,trainEnd=3+k;let s=tx(350,28,"Nested chronological evaluation",colors.ink,18);
for(let i=0;i<15;i++){let x=28+i*43,col=i<trainEnd?colors.teal:i<trainEnd+2?colors.amber:i===trainEnd+2?colors.blue:"#d6d1c7";s+=rect(x,74,38,86,col,col)+tx(x+19,124,String(i+1).padStart(2,"0"),i<=trainEnd+2?"white":colors.ink,12)}
s+=tx(155,193,"Green: refit parameters",colors.teal,14)+tx(350,193,"Amber: inner validation",colors.amber,14)+tx(570,193,"Blue: outer evaluation",colors.blue,14);
s+=rect(30,214,640,77,bad?"#ead4cd":"#d6e2df",bad?colors.red:colors.teal);
s+=tx(350,244,bad?"OUTER RESULT USED TO REDESIGN":"FREEZE OUTER PROTOCOL → WALK FORWARD",bad?colors.red:colors.teal,18);
s+=tx(350,271,bad?"That block is now development evidence, not untouched test evidence.":"Record each blue result; never redesign the protocol from it.",colors.ink,13);
return {html:svg(s),note:bad?"Bad workflow: once an outer result changes features, settings, or rules, it becomes development evidence.":"Valid workflow: selection occurs inside the amber window, while the complete outer walk-forward protocol is frozen before the first blue result."}
}
function execution(){
const ask=[{p:100.01,q:100},{p:100.02,q:120},{p:100.04,q:180},{p:100.07,q:220},{p:100.11,q:250}];
const target=qty,rate=25+urgency*1.2,fill=Math.min(target,Math.round(step*rate));
let rem=fill,notional=0,filled=[];
for(const a of ask){let f=Math.min(rem,a.q);rem-=f;filled.push(f);notional+=f*a.p}
if(rem>0)notional+=rem*100.16;
const avg=fill?notional/fill:0,impact=fill?(notional-100*fill):0,unfilled=target-fill,opportunity=unfilled*.06,total=impact+opportunity;
let s=tx(350,27,"Urgency exchanges impact for non-completion risk",colors.ink,18)+tx(88,53,"ASK PRICE","#626964",12)+tx(329,53,"VISIBLE DEPTH → FILLED","#626964",12);
ask.forEach((a,i)=>{let y=65+i*41;s+=rect(27,y,115,33,"#e8e3da")+tx(85,y+23,"$"+a.p.toFixed(2),colors.ink,14)+rect(164,y,408,33,"#e5e3df");s+=`<rect x="164" y="${y}" width="${a.q*1.48}" height="33" rx="3" fill="#b1c6c4"/>`;s+=`<rect x="164" y="${y}" width="${filled[i]*1.48}" height="33" rx="3" fill="${colors.teal}"/>`;s+=tx(633,y+22,filled[i]+"/"+a.q,colors.ink,12)});
s+=tx(82,299,"Filled "+fill+" / "+target,colors.teal,13)+tx(245,299,"Impact $"+impact.toFixed(2),colors.red,13)+tx(425,299,"Unfilled proxy $"+opportunity.toFixed(2),colors.amber,13)+tx(614,299,"Total $"+total.toFixed(2),colors.ink,14);
return {html:svg(s),note:"Illustrative convention: filled-share impact is measured against $100; each of the "+unfilled+" unfilled shares carries a $0.06 non-completion proxy. Average fill price: "+(fill?"$"+avg.toFixed(3):"not available")+". Change urgency and compare both channels."}
}
function draw(){
const stage=document.getElementById("hero-visual"),note=document.getElementById("hero-note");if(!stage||!note)return;
const d=active==="clock"?clock():active==="trees"?trees():active==="split"?split():execution();
stage.innerHTML=d.html;note.textContent=d.note;
const slider=document.getElementById("hero-step");if(slider){slider.value=step;slider.max=max[active]}
const now=document.getElementById("hero-step-label");if(now)now.textContent="Step "+step+" / "+max[active];
const play=document.getElementById("hero-play");if(play)play.textContent=timer?"Pause":"Play animation";
}
function render(topic,target){
const kind=ids[topic.id];if(!kind){stop();active=null;return false}
stop();active=kind;step=0;mode="tree";bad=false;qty=500;urgency=50;
target.innerHTML=`<div class="figure-stage" id="hero-visual" tabindex="0" aria-label="Animated teaching visualization; use the controls below to advance it"></div><div class="figure-controls"><div class="hero-controls"><button id="hero-play" type="button" data-hero="play">Play animation</button><button type="button" data-hero="step">Step →</button><button type="button" data-hero="reset">Reset</button><label>Scrub <input id="hero-step" type="range" min="0" max="${max[kind]}" value="0" data-hero-range="step"></label><small id="hero-step-label"></small></div><div class="hero-controls" id="hero-extras"></div><p class="figure-note" id="hero-note" aria-live="polite"></p><p class="lab-disclosure">Deterministic teaching simulation · values are illustrative, not empirical estimates or investment advice.</p></div>`;
const extra=document.getElementById("hero-extras");
if(kind==="trees")extra.innerHTML='<button type="button" data-hero-mode="tree" aria-pressed="true">Decision tree</button><button type="button" data-hero-mode="forest">Random forest</button><button type="button" data-hero-mode="boost">Gradient boosting</button>';
if(kind==="split")extra.innerHTML='<button type="button" data-hero="bad" aria-pressed="false">Show outer-result reuse (bad workflow)</button>';
if(kind==="execution")extra.innerHTML='<label>Order size <select data-hero-select="qty"><option value="300">300 shares</option><option value="500" selected>500 shares</option><option value="800">800 shares</option></select></label><label>Urgency / fill rate <input type="range" min="10" max="100" value="50" data-hero-range="urgency"> <span id="hero-urgency">50%</span></label>';
draw();return true
}
document.addEventListener("click",event=>{
const target=event.target.closest("[data-hero],[data-hero-mode]");if(!target||!active)return;
if(target.dataset.heroMode){stop();mode=target.dataset.heroMode;step=0;document.querySelectorAll("[data-hero-mode]").forEach(b=>b.setAttribute("aria-pressed",String(b===target)));draw();return}
const a=target.dataset.hero;if(a==="play"){if(timer){stop();draw();return}if(step>=max[active])step=0;timer=setInterval(()=>{step++;if(step>=max[active])stop();draw()},800)}
if(a==="step"){stop();step=Math.min(max[active],step+1)}
if(a==="reset"){stop();step=0}
if(a==="bad"){bad=!bad;target.setAttribute("aria-pressed",String(bad))}
draw()
});
document.addEventListener("input",event=>{
if(!active||!event.target.dataset.heroRange)return;
const type=event.target.dataset.heroRange;
if(type==="step"){stop();step=+event.target.value}
if(type==="urgency"){urgency=+event.target.value;document.getElementById("hero-urgency").textContent=urgency+"%"}
draw()
});
document.addEventListener("change",event=>{if(!active||event.target.dataset.heroSelect!=="qty")return;stop();qty=+event.target.value;step=0;draw()});
document.addEventListener("visibilitychange",()=>{if(document.hidden){stop();draw()}});
window.addEventListener("hashchange",stop);
window.FinmlHero={render,stop};
})();
