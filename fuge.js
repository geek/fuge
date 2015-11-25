#!/usr/bin/env node
/*
 * THIS SOFTWARE IS PROVIDED ``AS IS'' AND ANY EXPRESSED OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED.  IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
 * STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING
 * IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

'use strict';

var program = require('commist')();
var puller = require('./puller')();
var builder = require('./builder')();
var previewer = require('./previewer')();
var gen = require('./generator')();
var shell = require('./shell')();
var util = require('./util')();



var generateSystem = function(args) {
  gen.init(function() {
    gen.generateSystem(args, function() {
    });
  });
};



var generateService = function(args) {
  gen.init(function() {
    gen.generateService(args, true, function() {
    });
  });
};



var buildSystem = function(args) {
  builder.buildSystem(args);
};



var pullSystem = function(args) {
  puller.pullSystem(args);
};



var runSystem = function(args) {
  console.log('compiling...');
  util.compile(args, function(err, system, config) {
    if (err) { return console.log(err); }
    shell.runSingleCommand(system, config, 'start all');
  });
};



var runShell = function(args) {
  console.log('compiling...');
  util.compile(args, function(err, system, config) {
    if (err) { return console.log(err); }
    shell.run(system, config);
  });
};



var previewSystem = function(args) {
  console.log('compiling...');
  util.compile(args, function(err, system, config) {
    if (err) { return console.log(err); }
    previewer.previewSystem(system, config);
  });
};



program.register('generate system', generateSystem);
program.register('generate service', generateService);
program.register('build', buildSystem);
program.register('pull', pullSystem);
program.register('run', runSystem);
program.register('preview', previewSystem);
program.register('shell', runShell);



function start(argv) {
  var remaining = program.parse(argv);
  if (remaining) {
    console.log('No matching command.');
  }
}



module.exports = start;
if (require.main === module) {
  start(process.argv.slice(2));
}


