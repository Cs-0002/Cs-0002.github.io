Tone.Transport.bpm.value = 100;

//楽器、エフェクトの設定

const backnote =(() => {
  const reverb = new Tone.Reverb({decay: 30,preDelay: 0.5,wet: 0.5,}).toDestination();
  const filter = new Tone.Filter({frequency: 600,type: "lowpass",Q: 3,}).connect(reverb);
  const pad = new Tone.PolySynth(Tone.Synth, {
    oscillator: {type: "sawtooth"},
    envelope: {attack: 4,decay: 0,sustain: 1,release: 5,},
    volume: -10,
  }).connect(filter);
  const padPart = new Tone.Part((time, chord) => {
    pad.triggerAttackRelease(chord, "1:2", time);
  }, [
    ["0m", ["F3", "A3"]],
    ["1m", ["A3", "C4"]],
    ["2m", ["E3", "G4"]],
    ["3m", ["B3", "D4"]],
  ]);
  padPart.loop = true;
  padPart.loopEnd = "4m";
  return { reverb, filter, pad, padPart };
})();

const backbass = (() => {
  const bass = new Tone.MonoSynth({
    oscillator: { type: "sawtooth" },
    envelope: { attack: 3, decay: 3, sustain: 0, release: 3 },
    volume: -10,
  }).toDestination();
  const bassPart = new Tone.Part((time, n) => {
    bass.triggerAttackRelease(n, "2m", time);
  }, [
    ["2:2", "C2"],
  ]);
  bassPart.loop = true;
  bassPart.loopEnd = "4m";
  return { bass, bassPart };
})();

const note1 = (() => {
  const reverb = new Tone.Reverb({ decay: 30, preDelay: 0.5, wet: 0.5 }).toDestination();
  const filter = new Tone.Filter({ frequency: 600, type: "lowpass", Q: 3 }).connect(reverb);
  const synth = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: "sawtooth" },
    envelope: { attack: 1, decay: 0, sustain: 1, release: 5 },
    volume: -10,
  }).connect(filter);
  return { reverb, filter, synth };
})();

const note2 = (() => {
  const reverb = new Tone.Reverb({ decay: 30, preDelay: 0.5, wet: 0.5 }).toDestination();
  const filter = new Tone.Filter({ frequency: 600, type: "lowpass", Q: 3 }).connect(reverb);
  const synth = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: "sawtooth" },
    envelope: { attack: 1, decay: 0, sustain: 1, release: 5 },
    volume: -10,
  }).connect(filter);
  return { reverb, filter, synth };
})();


//実際に鳴らすコード

document.getElementById("start-btn").addEventListener("click", async () => {
  document.getElementById("start-btn").classList.add("playing");
  await Tone.start();

  backnote.padPart.start(0);
  backbass.bassPart.start(0);

  Tone.Transport.start();
});


document.querySelectorAll('.note-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.classList.toggle('playing');
  });
});

document.getElementById('note1').addEventListener('click', () => {
  if (note1.synth.activeVoices > 0) {
    note1.synth.releaseAll();
  } else {
    note1.synth.triggerAttack("C5");
  }
});
document.getElementById('note2').addEventListener('click', () => {
  if (note2.synth.activeVoices > 0) {
    note2.synth.releaseAll();
  } else {
    note2.synth.triggerAttack("E5");
  }
});
