/** Textual markov chain generator */

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter((c) => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = new Map();

    this.words.forEach((element, index) => {
      let nextWord = this.words[index + 1] || null;
      if (chains.has(element)) {
        chains.get(element).push(this.words[index + 1]);
      } else {
        chains.set(element, [nextWord]);
      }
      // console.log(element, index, this.words[index + 1]);
    });
    this.chains = chains;
  }

  static choice(array) {
    let length = array.length;
    return array[Math.floor(Math.random() * length)];
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    let keys = Array.from(this.chains.keys());
    let key = MarkovMachine.choice(keys);
    let out = [];

    while (out.length < numWords && key !== null) {
      out.push(key);
      key = MarkovMachine.choice(this.chains.get(key));
    }
    return out.join(" ");
  }
}

// let markovTest = new MarkovMachine("Cat in the hat");

module.exports = {
  MarkovMachine,
};
