#!/usr/bin/env node
require('dotenv').config();
const NodeWebcam = require('node-webcam');
const request = require('request');
const fs = require('fs');
const open = require('open');

const emotion_url = 'https://api.projectoxford.ai/emotion/v1.0/recognize';
const timestamp = new Date().getTime();

setInterval(function() {
  NodeWebcam.capture('images/' + timestamp, {}, function() {
    const file = fs.readFileSync('images/' + timestamp + '.jpg');

    request(emotion_url, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': process.env.MS_KEY,
        'Content-Type': 'application/octet-stream'
      },
      body: file
    }, (err, res, obj) => {
      if(err) throw err;

      const face = JSON.parse(obj)[0];
      if(face) {
        delete face.scores.neutral; // Don't care about this
        const topEmotion = Object.keys(face.scores).reduce((a, b) => face.scores[a] > face.scores[b] ? a : b);

        console.log(topEmotion)
        if(topEmotion === 'sadness' || topEmotion === 'anger') {
          open('https://www.reddit.com/r/aww/random');
        }
      }
    });
  });
}, 1000 * 10 );
