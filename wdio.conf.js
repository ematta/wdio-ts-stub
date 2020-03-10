// eslint-disable-next-line no-undef
exports.config = {
    runner: 'local',
    // eslint-disable-next-line no-undef
    hostname: process.env.HUB || 'localhost',
    port: 4444,
    path: '/wd/hub',
    specs: [
        './test/specs/**/*'
    ],
    exclude: [],
    maxInstances: 10,
    capabilities: [{
        maxInstances: 5,
        // eslint-disable-next-line no-undef
        browserName: process.env.BROWSER || 'firefox',
    }],
    logLevel: 'info',
    bail: 0,
    baseUrl: 'https://the-internet.herokuapp.com',
    waitforTimeout: 10000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    services: [],
    framework: 'mocha',
    reporters: [
      'spec',
      [
        'junit', {
          outputDir: './',
          outputFileFormat: function (options) { // optional
            return `results-${options.cid}.xml`
          }
        }
      ]
    ],
  mochaOpts: {
    ui: 'bdd',
    require: 'ts-node/register',
    compilers: [
      'tsconfig-paths/register'
    ]
  },
}
