#!/usr/bin/env node

const cac = require('cac');
const update = require('update-notifier');
const axios = require('axios');
const pkg = require('./package');

const cli = cac('joke');

cli.command('', 'Give me a joke please.').action(function () {
  console.log('----------------------------------');
  axios
    .get('http://joke.poppython.com/random')
    .then(function (r) {
      const res = r.data;
      if (res.code !== 200) {
        throw new Error(res.message);
      }
      console.log(res.data);
      console.log('----------------------------------');
    })
    .catch(function (error) {
      console.log('Sorry, something went wrong');
    });
});

cli.version(pkg.version);
cli.help();
cli.parse();

update({ pkg }).notify();
