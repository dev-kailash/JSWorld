let VOICE = null;
let synth = window.speechSynthesis;
let voices = synth.getVoices();


document.addEventListener('DOMContentLoaded', addListeners());

function addListeners() {
  document.getElementById('voiceSelect').addEventListener('change', changeVoice);
  document.getElementById('btnRead').addEventListener('click', readParas);
  document.getElementById('btnPause').addEventListener('click', () => {
    synth.pause();
  });
  document.getElementById('btnResume').addEventListener('click', () => {
    synth.resume();
  });
  document.getElementById('rate').addEventListener('input', (ev) => {
    document.getElementById('rate-value').textContent = ev.target.value;
  });
  document.getElementById('pitch').addEventListener('input', (ev) => {
    document.getElementById('pitch-value').textContent = ev.target.value;
  });
  document.getElementById('volume').addEventListener('input', (ev) => {
    document.getElementById('volume-value').textContent = ev.target.value;
  });
  //build the select list
  setTimeout(() => {
    if (voices.length === 0) {
      voices = synth.getVoices();
    }
    loadVoices();
  }, 100);
};

function loadVoices() {
  //build the select list
  // voice .lang 'en-CA', name: 'Karen', default: true|false
  for (let i = 0; i < voices.length; i++) {
    if (!voices[i].lang.startsWith('en-')) continue;
    const option = document.createElement('option');
    option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
    if (voices[i].default) {
      option.className = 'picked';
      VOICE = voices[i];
    }
    option.setAttribute('data-lang', voices[i].lang);
    option.setAttribute('data-name', voices[i].name);
    document.getElementById('voiceSelect').appendChild(option);
  }
}

function readParas(ev) {
  //read the text from the inputs and speak it

  const inputs = document.querySelectorAll('.sentences input');
  inputs.forEach((input, idx) => {
    const txt = input.value;
    const utter = new SpeechSynthesisUtterance(txt);
    utter.voice = VOICE;
    //change the rate, pitch and volume
    utter.rate = document.getElementById('rate').value;
    utter.pitch = document.getElementById('pitch').value;
    utter.volume = document.getElementById('volume').value;
    synth.speak(utter);
  });
}

function changeVoice(ev) {
  //pick a voice from the list
  const select = ev.target;
  const index = select.selectedIndex;
  const name = select.options[index].getAttribute('data-name');
  select.querySelector('.picked').removeAttribute('class');

  for (let i = 0; i < voices.length; i++) {
    if (voices[i].name === name) {
      VOICE = voices[i];
      select.options[index].className = 'picked';
    }
  }
  console.log(VOICE);
}