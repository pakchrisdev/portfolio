class Type{
    constructor(textEl, words, wait=1000){
      this.textEl = textEl;
      this.words = words;
      this.txt = '';
      this.wordIndex = 0;
      this.wait = parseInt(wait, 10);
      this.isDeleting = false;
      this.typing();
    }
    typing(){
      const current = this.wordIndex % this.words.length;
      const fullTxt = this.words[current];
      if(this.isDeleting) this.txt = fullTxt.substring(0, this.txt.length - 1);
      else this.txt = fullTxt.substring(0, this.txt.length + 1);
      
      this.textEl.innerHTML = `<span class="cursor">${this.txt}</span>`;
      
      let typeSpeed = 200;
      
      if(this.isDeleting) typeSpeed = 100;
      
      if(!this.isDeleting && this.txt === fullTxt){
        typeSpeed = this.wait;
        this.isDeleting = true;
      } else if(this.isDeleting && this.txt === ''){
        this.isDeleting = false;
        this.wordIndex++;
        typeSpeed = 500;
      }
      
      setTimeout(()=>{this.typing()}, typeSpeed)
    }
}
    
document.addEventListener('DOMContentLoaded', init);
    
function init(){
    const txtEl = document.querySelector('.type-span');
    const words = JSON.parse(txtEl.dataset.words);
    const wait = txtEl.dataset.wait;
    new Type(txtEl, words, wait);
}