let mix = require('laravel-mix').mix;

let env = 'src/'; //test or src

mix.sass('resources/assets/sass/snackbar.scss',env+'css/snackbar.css');
mix.js('resources/assets/js/snackbar.js',env+'js/snackbar.js');