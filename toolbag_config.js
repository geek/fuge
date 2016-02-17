'use strict';

const Getfile = require('toolbag/lib/plugins/getfile');
const Heapdump = require('toolbag/lib/plugins/heapdump');
const ProcessReporter = require('toolbag/lib/plugins/process_reporter');
const Profiler = require('toolbag/lib/plugins/profiler');
const StatsCollector = require('toolbag/lib/plugins/stats_collector');
const Signal = require('toolbag/lib/plugins/signal');


module.exports = function config (defaults, callback) {
  callback(null, {
    plugins: [
      {
        plugin: ProcessReporter,
        options: {
          id: 'process reporter',
          options: {}
        }
      },
      {
        plugin: Getfile,
        options: defaults.data
      },
      {
        plugin: Heapdump,
        options: defaults.data
      },
      {
        plugin: Profiler,
        options: defaults.data
      },
      { plugin: Signal },
      {
        plugin: StatsCollector,
        options: {
          enabled: true,
          period: 1000,
          eventLoopLimit: 30,
          features: {
            process: true,
            system: true,
            cpu: true,
            memory: true,
            gc: true,
            handles: true,
            requests: true,
            eventLoop: true,
            meta: {
              tags: ['api']
            }
          }
        }
      }
    ]
  });
};
