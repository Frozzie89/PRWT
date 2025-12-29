// Karma configuration file
// https://karma-runner.github.io/latest/config/configuration-file.html

// Ensure Puppeteer's Chromium is used for CI / headless runs
process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function (config) {
  config.set({
    basePath: '',

    frameworks: ['jasmine', '@angular-devkit/build-angular'],

    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      
    ],

    client: {
      jasmine: {
        // Jasmine options can go here
      },
      clearContext: false, // keep Jasmine Spec Runner output visible
    },

    jasmineHtmlReporter: {
      suppressAll: true,
    },

    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/client'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' },
      ],
    },

    reporters: ['progress', 'kjhtml'],

    // CI-safe headless Chrome launcher
    browsers: ['ChromeHeadlessCI'],

    customLaunchers: {
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox',
          '--disable-gpu',
          '--disable-dev-shm-usage',
        ],
      },
    },

    restartOnFileChange: true,
  });
};
