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

var _ = require('lodash');
var Runner = require('fuge-runner');


exports.previewSystem = function(system, config) {
  var runner = Runner(config);
  runner.previewAll(system, function(err, result) {
    if (err) {
      console.error(err);
      return;
    }
    _.each(result, function(command) {
      var env = '';
      console.log('executing: ' + command.detail.cmd);
      console.log('  in directory: ' + command.detail.cwd);
      _.each(_.keys(command.detail.environment), function(key) {
        env += '    ' + key + '=' + command.detail.environment[key] + '\n';
      });
      console.log('  with environment:\n' + env);
    });
  });
};



exports.buildSystem = function(system, config, cb) {
  var runner = Runner(config);
  runner.buildAll(system, cb);
};



exports.pullSystem = function(system, config, cb) {
  var runner = Runner(config);
  runner.pullAll(system, cb);
};
