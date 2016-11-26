/*jshint node:true*/
module.exports = {
  description: 'Installation blueprint for ember-cashay-twiddle-demo',

  normalizeEntityName: function() {},

  afterInstall: function() {
    return this.addAddonsToProject({
      packages: [
        { name: 'ember-browserify', target: '^1.1.13' },
        { name: 'ember-cli-mirage', target: '^0.2.4' },
        { name: 'ember-redux', target: '^1.9.0' }
      ]
    }).then(function() {
      return this.addPackagesToProject([
        // Installing ember-cashay as a package to avoid running its blueprint
        // we want to use the demo blueprint instead
        { name: 'ember-cashay', target: '^0.2.0' },

        { name: 'cashay', target: '^0.22.0' },
        { name: 'graphql', target: '^0.7.1' }
      ])
    }.bind(this))
  }
};
