document.getElementById("start-btn").addEventListener("click", async () => {
  await Tone.start();
  Tone.Transport.bpm.value = 100;

//ループ
  const reverb = new Tone.Reverb({
    decay: 30,
    preDelay: 0.5,
    wet: 0.5,
  }).toDestination();

  const filter = new Tone.Filter({
    frequency: 600,
    type: "lowpass",
    Q: 3,
  }).connect(reverb);

  const pad = new Tone.PolySynth(Tone.Synth, {
    oscillator: {
      type: "sawtooth"
    },
    envelope: {
      attack: 4,
      decay: 0,
      sustain: 1,
      release: 5,
    },
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
  padPart.start(0);


  const bass = new Tone.MonoSynth({
    oscillator: {
      type: "sawtooth"
    },
    envelope: {
      attack: 3,
      decay: 3,
      sustain: 0,
      release: 3,
    },
    volume: -10,
  }).toDestination();

  const bassPart = new Tone.Part((time, note) => {
    bass.triggerAttackRelease(note, "2m", time);
  }, [
    ["2:2", "C2"],
  ]);
  bassPart.loop = true;
  bassPart.loopEnd = "4m";
  bassPart.start(0);


  Tone.Transport.start();
});


//ここからインタラクティブ予定(現在はボタンを押したらC5を鳴らすコードを仮置き)
const reverb = new Tone.Reverb({
  decay: 30,
  preDelay: 0.5,
  wet: 0.5,
}).toDestination();

const filter = new Tone.Filter({
  frequency: 600,
  type: "lowpass",
  Q: 3,
}).connect(reverb);

const pad_user = new Tone.PolySynth(Tone.Synth, {
  oscillator: {
    type: "sawtooth"
  },
  envelope: {
    attack: 1,
    decay: 0,
    sustain: 1,
    release: 5,
  },
  volume: -10,
}).connect(filter);

document.getElementById('note-btn').addEventListener('click', () => {
  pad_user.triggerAttackRelease("C5", "1n");

});
