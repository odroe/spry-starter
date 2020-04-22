const https = require('https');
const path = require('path');
const fs = require('fs');
const extract = require('extract-zip');
const url = 'https://github.com/refactoringui/heroicons/archive/master.zip';

function fetchZip(url, listener, fn) {
  https.get(url, response => {
    switch (response.statusCode) {
      case 200:
        response.on('data', listener);
        response.on('end', fn);
        break;
      case 302:
        fetchZip(response.headers.location, listener, fn);
        break;
      default:
        throw new Error('Donload zip error.');
    }
  }).on('error', e => {
    throw e;
  });
}

function getfilenameBasename(filename) {
  return filename
    .replace(path.extname(filename), '')
    .replace('md-', '')
    .replace('sm-', '')
    .replace('_', '-')
  ;
}

function getClassname(filename) {
  return getfilenameBasename(filename).split('-').map(value => {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }).join('');
}

module.exports = function() {
  console.log('📦 Fetching Heroicons...');
  let cachePath = path.resolve(__dirname, 'cache');
  let zipPath = path.resolve(cachePath, 'heroicons-master.zip');
  let unzipPath = path.resolve(cachePath, 'heroicons-master');
  if (!fs.existsSync(cachePath)) {
    fs.mkdirSync(cachePath);
  }

  let iconRootPath = path.resolve(__dirname, '../../../lib/icons');
  if (fs.existsSync(iconRootPath)) {
    fs.rmdirSync(iconRootPath, { recursive: true });
    fs.mkdirSync(iconRootPath);
  }

  if (fs.existsSync(zipPath)) {
    fs.unlinkSync(zipPath);
  }
  if (fs.existsSync(unzipPath)) {
    fs.rmdirSync(unzipPath, { recursive: true });
  }

  let writeStream = fs.createWriteStream(zipPath);
  fetchZip(url, async (chunk) => {
    writeStream.write(chunk);
  }, async () => {
    writeStream.close();
    console.log('Unzip...');
    await extract(zipPath, { dir: cachePath });

    // outline
    iconPath = path.resolve(iconRootPath, 'outline');
    if (!fs.existsSync(iconPath)) {
      fs.mkdirSync(iconPath);
    }
    let _path = path.resolve(unzipPath, 'dist/outline-md');
    let _strArr = [];
    fs.readdirSync(_path).forEach(name => {
      let str = fs.readFileSync(path.resolve(_path, name));
      fs.writeFileSync(path.resolve(iconPath, getfilenameBasename(name) + '.vue'), `<template>\r\n${str}</template>`);
      _strArr.push(`export { default as ${getClassname(name)}Outline } from './${getfilenameBasename(name)}.vue';`);
    });
    fs.writeFileSync(path.resolve(iconPath, 'index.js'), _strArr.join("\r\n"));

    // solid
    iconPath = path.resolve(iconRootPath, 'solid');
    if (!fs.existsSync(iconPath)) {
      fs.mkdirSync(iconPath);
    }
    _path = path.resolve(unzipPath, 'dist/solid-sm');
    _strArr = [];
    fs.readdirSync(_path).forEach(name => {
      let str = fs.readFileSync(path.resolve(_path, name));
      fs.writeFileSync(path.resolve(iconPath, getfilenameBasename(name) + '.vue'), `<template>\r\n${str}</template>`);
      _strArr.push(`export { default as ${getClassname(name)}Solid } from './${getfilenameBasename(name)}.vue';`);
    });
    fs.writeFileSync(path.resolve(iconPath, 'index.js'), _strArr.join("\r\n"));
  });
};
