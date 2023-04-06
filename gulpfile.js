const {src, dest, watch, series, parallel} = require('gulp'); //Importacion de los modulos, las llaves son para exportar multiples funciones

//CSS Y SASS
const sass = require('gulp-sass')(require('sass')); //Sin llaves solo exporta una funcion, aqui compila hoja de estilos
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');

//IMAGENES
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css(done){
    //compilar sass
    //pasos: 1- Identificar archivo, 2-Compilar, 3-Guardar el .css

    src('src/scss/app.scss')//pipe sirve para decir que ya lo encontro gulp
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/css'))

    done();    
}

function imagenes(){
    return src('src/img/**/*')
        .pipe(imagemin({optimizationLevel: 3}))
        .pipe(dest('build/img'))

}

function versionWebp(){
    return src('src/img/**/*.{png,jpg}')
        .pipe(webp())
        .pipe(dest('build/img'))
}

function versionAvif(){
    return src('src/img/**/*.{png,jpg}')
        .pipe(avif())
        .pipe(dest('build/img'))
}
function dev(){
    watch('src/scss/**/*.scss', css); //Es para compilar todo lo dentro del header
    // watch('src/scss/app.scss', css); //Toma 2 valores, lo que tienes que vigilar y la segunda es la funcion que ejecuta
    watch('src/img/**/*', imagenes);
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
// exports.versionAvif = versionAvif;
exports.default = series(imagenes, versionWebp, /*versionAvif,*/ css, dev); //Ejecuta la primera tarea y despues se va a la siguiente

//series - Iniciar una tarea y hasta que finaliza es la siguiente
//parallel - Todas inician al mismo tiempo y se completan de forma diferente