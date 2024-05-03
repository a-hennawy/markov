/** Command-line tool to generate Markov text. */

const fs = require("fs");
const markov = require("./markov");
const isurl = require("is-url");
const axios = require("axios");
const { argv } = require("process");

function generateText(text) {
  let markovOut = new markov.MarkovMachine(text);
  console.log(markovOut.makeText());
}

async function URLToText(url) {
  await axios.get(url).then((resp) => {
    generateText(resp.data.slice(0));
    // console.log(resp.data.slice(0));
  });
}

function readToGen(path) {
  if (isurl(path)) {
    URLToText(path);
  } else {
    fs.readFile(path, "utf8", (err, data) => {
      if (err) {
        console.log(`ERR: unable to access ${argv[2]} \n`, err);
        process.exit(1);
      }
      generateText(data);
    });
  }
}

readToGen(argv[2]);
// URLToText(argv[2]);
// console.log(argv[2]);
