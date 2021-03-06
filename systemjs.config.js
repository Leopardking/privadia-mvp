/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
 var System;
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'

    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: 'app',
      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      '@angular/upgrade': 'npm:@angular/upgrade/bundles/upgrade.umd.js',
      'ng2-auto-complete': 'npm:ng2-auto-complete/dist/ng2-auto-complete.umd.js',
      'ng2-cloudinary': 'npm:ng2-cloudinary/dist/umd/ng2-cloudinary.js',
      'ng2-file-upload': 'npm:ng2-file-upload/bundles/ng2-file-upload.umd.js',
      // other libraries
      'lodash': 'npm:lodash',
      'rxjs': 
      'npm:rxjs',
      'angular-sortablejs': 'npm:angular-sortablejs/dist/',
      'sortablejs': 'npm:sortablejs/Sortable.min.js',
      'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
      'ng2-popover': 'npm:ng2-popover',
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        main: './main.js',
        defaultExtension: 'js'
      },
      rxjs: {
        main: 'Rx.js',
        defaultExtension: 'js'
      },
      lodash: {
        main: 'index.js',
        defaultExtension: 'js'
      },
      'ng2-popover': {
        main: 'index.js',
        defaultExtension: 'js'
      },
      'angular-sortablejs': {
        main: 'index.js',
        defaultExtension: 'js'
      }
    }
  });
})(this);
