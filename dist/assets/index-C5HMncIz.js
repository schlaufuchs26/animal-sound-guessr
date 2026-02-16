var p=Object.defineProperty;var f=(r,t,s)=>t in r?p(r,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):r[t]=s;var o=(r,t,s)=>f(r,typeof t!="symbol"?t+"":t,s);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerPolicy&&(a.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?a.credentials="include":e.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(e){if(e.ep)return;e.ep=!0;const a=s(e);fetch(e.href,a)}})();const h=[{name:"Cat",emoji:"🐱",soundUrl:"https://freesound.org/data/previews/316/316847_5123451-lq.mp3",difficulty:"easy"},{name:"Dog",emoji:"🐶",soundUrl:"https://freesound.org/data/previews/546/546044_7037-lq.mp3",difficulty:"easy"},{name:"Cow",emoji:"🐄",soundUrl:"https://freesound.org/data/previews/316/316805_5123451-lq.mp3",difficulty:"easy"},{name:"Horse",emoji:"🐴",soundUrl:"https://freesound.org/data/previews/316/316845_5123451-lq.mp3",difficulty:"easy"},{name:"Sheep",emoji:"🐑",soundUrl:"https://freesound.org/data/previews/316/316830_5123451-lq.mp3",difficulty:"easy"},{name:"Pig",emoji:"🐷",soundUrl:"https://freesound.org/data/previews/316/316828_5123451-lq.mp3",difficulty:"easy"},{name:"Lion",emoji:"🦁",soundUrl:"https://freesound.org/data/previews/316/316849_5123451-lq.mp3",difficulty:"medium"},{name:"Eagle",emoji:"🦅",soundUrl:"https://freesound.org/data/previews/316/316810_5123451-lq.mp3",difficulty:"medium"},{name:"Wolf",emoji:"🐺",soundUrl:"https://freesound.org/data/previews/316/316851_5123451-lq.mp3",difficulty:"medium"},{name:"Elephant",emoji:"🐘",soundUrl:"https://freesound.org/data/previews/316/316809_5123451-lq.mp3",difficulty:"medium"},{name:"Monkey",emoji:"🐒",soundUrl:"https://freesound.org/data/previews/316/316822_5123451-lq.mp3",difficulty:"medium"},{name:"Bear",emoji:"🐻",soundUrl:"https://freesound.org/data/previews/316/316803_5123451-lq.mp3",difficulty:"medium"},{name:"Owl",emoji:"🦉",soundUrl:"https://freesound.org/data/previews/316/316824_5123451-lq.mp3",difficulty:"medium"},{name:"Frog",emoji:"🐸",soundUrl:"https://freesound.org/data/previews/316/316813_5123451-lq.mp3",difficulty:"medium"},{name:"Kookaburra",emoji:"🦜",soundUrl:"https://freesound.org/data/previews/316/316817_5123451-lq.mp3",difficulty:"hard"},{name:"Red Fox",emoji:"🦊",soundUrl:"https://freesound.org/data/previews/316/316811_5123451-lq.mp3",difficulty:"hard"},{name:"Lyrebird",emoji:"🐦",soundUrl:"https://freesound.org/data/previews/316/316820_5123451-lq.mp3",difficulty:"hard"},{name:"Cicada",emoji:"🦗",soundUrl:"https://freesound.org/data/previews/316/316805_5123451-lq.mp3",difficulty:"hard"},{name:"Hyena",emoji:"🐺",soundUrl:"https://freesound.org/data/previews/316/316815_5123451-lq.mp3",difficulty:"hard"},{name:"Dolphin",emoji:"🐬",soundUrl:"https://freesound.org/data/previews/316/316808_5123451-lq.mp3",difficulty:"hard"},{name:"Whale",emoji:"🐋",soundUrl:"https://freesound.org/data/previews/316/316850_5123451-lq.mp3",difficulty:"hard"}];function m(r){return[...h].sort(()=>.5-Math.random()).slice(0,r)}function v(r,t){const s=t.filter(e=>e.name!==r.name).sort(()=>.5-Math.random()).slice(0,3);return[r,...s].sort(()=>.5-Math.random())}class g{constructor(){o(this,"state");o(this,"gameAnimals");o(this,"audioElement",null);this.state=this.getInitialState(),this.gameAnimals=m(10)}getInitialState(){return{currentRound:0,totalRounds:10,score:0,streak:0,currentAnimal:null,choices:[],isPlaying:!1,gameOver:!1,roundStartTime:0,selectedChoice:null,showAnswer:!1,correctAnswers:0,timeBonus:0,roundHistory:[]}}getState(){return{...this.state}}startGame(){this.state=this.getInitialState(),this.gameAnimals=m(10),this.nextRound()}nextRound(){if(this.state.currentRound>=this.state.totalRounds){this.endGame();return}this.state.currentRound++,this.state.currentAnimal=this.gameAnimals[this.state.currentRound-1],this.state.choices=v(this.state.currentAnimal,h),this.state.selectedChoice=null,this.state.showAnswer=!1,this.state.roundStartTime=Date.now(),this.audioElement&&(this.audioElement.pause(),this.audioElement=null)}async playSound(){if(this.state.currentAnimal)try{this.audioElement&&this.audioElement.pause(),this.state.isPlaying=!0,this.audioElement=new Audio(this.state.currentAnimal.soundUrl),this.audioElement.crossOrigin="anonymous",this.audioElement.addEventListener("ended",()=>{this.state.isPlaying=!1}),this.audioElement.addEventListener("error",t=>{console.error("Error playing audio:",t),this.state.isPlaying=!1}),await this.audioElement.play()}catch(t){console.error("Error playing sound:",t),this.state.isPlaying=!1}}stopSound(){this.audioElement&&(this.audioElement.pause(),this.audioElement.currentTime=0,this.state.isPlaying=!1)}makeGuess(t){if(this.state.selectedChoice||!this.state.currentAnimal)return;const s=Date.now()-this.state.roundStartTime,i=t.name===this.state.currentAnimal.name;this.state.selectedChoice=t,this.state.showAnswer=!0;let e=0;i?(e=this.calculatePoints(s,this.state.currentAnimal.difficulty),this.state.score+=e,this.state.correctAnswers++,this.state.streak++):this.state.streak=0,this.state.timeBonus=this.calculateTimeBonus(s);const a={animal:this.state.currentAnimal,selectedChoice:t,correct:i,timeSpent:s,points:e};this.state.roundHistory.push(a),this.stopSound()}calculatePoints(t,s){const i={easy:100,medium:200,hard:300},a=Math.max(.1,1-t/3e4);let n=Math.round(i[s]*a);return this.state.streak>=3?n=Math.round(n*1.5):this.state.streak>=5&&(n=Math.round(n*2)),n}calculateTimeBonus(t){return t<5e3?50:t<1e4?25:t<15e3?10:0}endGame(){this.state.gameOver=!0,this.stopSound()}getProgress(){return this.state.currentRound/this.state.totalRounds*100}getFinalStats(){const t=this.state.correctAnswers/this.state.totalRounds*100,s=this.state.roundHistory.reduce((i,e)=>i+e.timeSpent,0)/this.state.roundHistory.length;return{totalScore:this.state.score,accuracy:Math.round(t),correctAnswers:this.state.correctAnswers,totalRounds:this.state.totalRounds,averageTime:Math.round(s/1e3),bestStreak:Math.max(...this.state.roundHistory.map((i,e)=>{let a=0;for(let n=e;n<this.state.roundHistory.length&&this.state.roundHistory[n].correct;n++)a++;return a}))}}}class y{constructor(){o(this,"game");o(this,"app");o(this,"playButton",null);o(this,"waveform",null);o(this,"choiceButtons",[]);o(this,"timer",null);this.game=new g,this.app=document.getElementById("app"),this.init()}init(){this.render(),this.game.startGame(),this.updateUI()}render(){this.app.innerHTML=`
      <div class="game-container">
        <div class="header">
          <h1 class="title">🔊 SoundGuessr</h1>
          <p class="subtitle">Guess the animal from its sound!</p>
        </div>

        <div class="progress-bar">
          <div class="progress-fill" id="progress-fill"></div>
        </div>

        <div class="stats">
          <div class="stat">
            <div class="stat-value" id="round-counter">1/10</div>
            <div class="stat-label">Round</div>
          </div>
          <div class="stat">
            <div class="stat-value" id="score">0</div>
            <div class="stat-label">Score</div>
          </div>
          <div class="stat">
            <div class="stat-value" id="streak">0</div>
            <div class="stat-label">Streak</div>
          </div>
        </div>

        <div class="game-area" id="game-area">
          <div class="sound-section">
            <h2 class="sound-question">What animal makes this sound?</h2>
            <div class="sound-controls">
              <button class="play-button" id="play-button">
                ▶️
              </button>
              <div class="waveform" id="waveform">
                <span>🔊 Click to play sound</span>
              </div>
              <div class="timer" id="timer">⏱️ 0s</div>
            </div>
          </div>

          <div class="choices" id="choices">
            <!-- Choices will be populated by JavaScript -->
          </div>

          <div class="result-section" id="result-section" style="display: none;">
            <div class="result-message" id="result-message"></div>
            <div class="answer-display" id="answer-display"></div>
            <button class="next-button" id="next-button">Next Round</button>
          </div>

          <div class="game-over" id="game-over" style="display: none;">
            <h2>🎉 Game Complete!</h2>
            <div class="final-score" id="final-score">0</div>
            <div class="score-breakdown" id="score-breakdown"></div>
            <button class="restart-button" id="restart-button">Play Again</button>
          </div>
        </div>
      </div>
    `,this.bindEvents()}bindEvents(){var i;this.playButton=document.getElementById("play-button"),this.waveform=document.getElementById("waveform"),(i=this.playButton)==null||i.addEventListener("click",()=>{this.playSound()});const t=document.getElementById("next-button");t==null||t.addEventListener("click",()=>{this.nextRound()});const s=document.getElementById("restart-button");s==null||s.addEventListener("click",()=>{this.restartGame()})}updateUI(){const t=this.game.getState(),s=document.getElementById("round-counter"),i=document.getElementById("score"),e=document.getElementById("streak"),a=document.getElementById("progress-fill");s&&(s.textContent=`${t.currentRound}/${t.totalRounds}`),i&&(i.textContent=t.score.toString()),e&&(e.textContent=t.streak.toString()),a&&(a.style.width=`${this.game.getProgress()}%`),t.gameOver?this.showGameOver():t.showAnswer?this.showAnswer():this.showQuestion(),this.updateTimer()}showQuestion(){const t=document.getElementById("result-section"),s=document.getElementById("game-over");t&&(t.style.display="none"),s&&(s.style.display="none"),this.renderChoices(),this.waveform&&(this.waveform.className="waveform",this.waveform.innerHTML="<span>🔊 Click to play sound</span>"),this.playButton&&(this.playButton.disabled=!1,this.playButton.textContent="▶️")}renderChoices(){const t=this.game.getState(),s=document.getElementById("choices");s&&(s.innerHTML="",this.choiceButtons=[],t.choices.forEach(i=>{const e=document.createElement("button");e.className="choice-button",e.innerHTML=`
        <span class="animal-emoji">${i.emoji}</span>
        <span>${i.name}</span>
      `,e.addEventListener("click",()=>{this.makeGuess(i)}),this.choiceButtons.push(e),s.appendChild(e)}))}async playSound(){this.playButton&&(this.playButton.disabled=!0,this.playButton.textContent="⏸️"),this.waveform&&(this.waveform.className="waveform playing",this.waveform.innerHTML="<span>🎵 Playing...</span>");try{await this.game.playSound()}catch(t){console.error("Error playing sound:",t),alert("Sorry, there was an error playing the sound. Please try again.")}setTimeout(()=>{this.playButton&&(this.playButton.disabled=!1,this.playButton.textContent="▶️"),this.waveform&&(this.waveform.className="waveform",this.waveform.innerHTML="<span>🔊 Click to replay</span>")},3e3)}makeGuess(t){this.game.makeGuess(t),this.choiceButtons.forEach(s=>{s.disabled=!0}),this.updateUI()}showAnswer(){var n;const t=this.game.getState(),s=document.getElementById("result-section"),i=document.getElementById("result-message"),e=document.getElementById("answer-display");if(!s||!i||!e||!t.currentAnimal)return;const a=((n=t.selectedChoice)==null?void 0:n.name)===t.currentAnimal.name;this.choiceButtons.forEach(l=>{var u,c;const d=(u=l.querySelector("span:not(.animal-emoji)"))==null?void 0:u.textContent;d===t.currentAnimal.name?l.classList.add("correct"):d===((c=t.selectedChoice)==null?void 0:c.name)&&!a&&l.classList.add("incorrect")}),s.style.display="block",a?(i.textContent="🎉 Correct!",i.className="result-message correct"):(i.textContent="❌ Wrong!",i.className="result-message incorrect"),e.innerHTML=`
      <span class="answer-emoji">${t.currentAnimal.emoji}</span>
      <div class="answer-name">${t.currentAnimal.name}</div>
      ${t.timeBonus>0?`<div style="color: #f39c12; margin-top: 0.5rem;">⚡ Time bonus: +${t.timeBonus} points</div>`:""}
    `}nextRound(){this.game.nextRound(),this.updateUI()}showGameOver(){const t=document.getElementById("game-over"),s=document.getElementById("final-score"),i=document.getElementById("score-breakdown");if(!t||!s||!i)return;const e=this.game.getFinalStats();t.style.display="block",s.textContent=e.totalScore.toString(),i.innerHTML=`
      <h3>Final Stats</h3>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin-top: 1rem;">
        <div class="stat">
          <div class="stat-value">${e.accuracy}%</div>
          <div class="stat-label">Accuracy</div>
        </div>
        <div class="stat">
          <div class="stat-value">${e.correctAnswers}/${e.totalRounds}</div>
          <div class="stat-label">Correct</div>
        </div>
        <div class="stat">
          <div class="stat-value">${e.averageTime}s</div>
          <div class="stat-label">Avg Time</div>
        </div>
        <div class="stat">
          <div class="stat-value">${e.bestStreak}</div>
          <div class="stat-label">Best Streak</div>
        </div>
      </div>
    `;const a=document.getElementById("result-section");a&&(a.style.display="none")}restartGame(){this.game.startGame(),this.updateUI()}updateTimer(){const t=this.game.getState(),s=document.getElementById("timer");if(!s||t.gameOver||t.showAnswer){this.timer&&(clearInterval(this.timer),this.timer=null);return}!this.timer&&t.roundStartTime>0&&(this.timer=setInterval(()=>{const i=Math.floor((Date.now()-t.roundStartTime)/1e3);s.textContent=`⏱️ ${i}s`},1e3))}}document.addEventListener("DOMContentLoaded",()=>{new y});
