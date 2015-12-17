I2B Frontend WorkFlow
===

[Versión español](#espanol) | [English version](#english)

---

### <a name="espanol"></a>Versión Español

**Adaptado para Proyectos I2B**

Este es un sencillo flujo que pueden utilizar para proyectos frontend. Debes tener lo fundamental para funcionar:

- [NodeJS](http://nodejs.org/download/)
- [LiveReload](http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions)
- *Grunt command line interface* (CLI): se instala a través del comando de terminal:
```
$ sudo npm install -g grunt-cli
```
- [Bower](http://bower.io/):
```
$ sudo npm install -g bower
```
- [GIT](http://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

**Atención usuarios de Windows**, necesitas un poco más de cuidado para configurar todo correctamente [Leer más en la Wiki](https://github.com/I2BTech/i2b-frontend-workflow/wiki/Problemas-en-Windows)

###TL;DR (resumen)

1. Descargar .zip de [I2B Frontend WorkFlow](https://github.com/I2BTech/i2b-frontend-workflow/archive/master.zip)
2. Moverlos a su directorio de trabajo local (por ej. localhost/proyecto)
3. `$ npm install` (instala node packages)
4. `$ bower install` (instala librerias js)
5. `$ grunt init` (primer seteo local)
6. `$ grunt`

###package.json

Es el archivo que contiene los nombres de las librerías **Node** que utilizaremos para automatizar nuestras tareas recurrentes y que reside en la raíz del proyecto. Aquí están el nombre y la versión de cada plugin que necesitaremos, de una larga lista de plugins existentes.

###bower.json

Archivo json que contiene las librerías **JavaScript** utilizadas para este proyecto. A través de ella se realiza el traspaso desde cada repositorio y se descarga las últimas versiones disponibles a `bower_components` y que posteriormente serán procesados.

###Gruntfile.js

Es el archivo base con el cual crearemos las tareas que necesitamos corra **GruntJS** por nosotros y que reside en la raíz del proyecto junto a **package.json**. En este archivo están definidas los plugins que utilizaremos y cómo deben trabajar, en esta ocasión incluyo los siguientes:

- **concat**: concatena librerías JavaScript
- **uglify**: minifica y obfusca archivos JavaScript
- **spritesmith**: crea una imagen y una hoja de estilos sprite a partir de varios íconos
- **imagemin**: comprime imágenes
- **sass**: compila y minifica archivos .scss
- **jade**: compila y minifica archivos .jade
- **bowercopy**: copia las librerías JS en /dist/js/libs para su uso
- **watch**: corre tareas definidas cada vez que se realizan cambios a ellas, en este caso todas las anteriores.
- **autoprefixer**: agrega prefijos directo a los archivos CSS generados de SCSS dentro de `dist/assets/css` correspondientes a las últimas 3 versiones (la actual y una anterior) de los principales browsers y las versiones en específico de IE 8 y 9.
- **jshint** y **htmlhint**: verifica sintaxis JS y HTML según reglas básicas definidas en `.jshintrc` y `.htmlhintrc` respectivamente.

###Uso

El directorio base se llama `/nombre-proyecto` y contiene todo lo necesario para comenzar a trabajar. Suponiendo que trabajas en un servidor local, la estructura básica de archivos es la siguiente:

	/nombre-proyecto/Gruntfile.js
	/nombre-proyecto/package.json
	/nombre-proyecto/src/
	/nombre-proyecto/dist/
	/nombre-proyecto/build/


El directorio donde trabajarás tus assets se llama `/src ` y contiene:

	/nombre-proyecto/src/js/
	/nombre-proyecto/src/js/libs/
	/nombre-proyecto/src/sass/
	/nombre-proyecto/src/sass/inc/
	/nombre-proyecto/src/jade/
	/nombre-proyecto/src/jade/inc/
	/nombre-proyecto/src/images/
	/nombre-proyecto/src/images/sprites/


Los que después de procesados por **GruntJS** residirán en `/assets` y son los que debes llamar desde tus archivos **HTML**:

	/nombre-proyecto/dist/assets/js/
	/nombre-proyecto/dist/assets/js/libs/
	/nombre-proyecto/dist/assets/css/
	/nombre-proyecto/dist/assets/images/

Para comenzar a trabajar, en Terminal/Consola debes estar en el directorio que estés trabajando:

	$ cd /path/to/nombre-proyecto/

Para instalar los plugins a utilizarse y que están definidos en **package.json**:

	$ sudo npm install

![](http://www.csslab.cl/wp-content/uploads/2014/04/1npm.png)

Con esto se llamarán a todos los repositorios e instalará los paquetes necesarios para hacer las tareas que tenemos asignadas. Esto puede tomar unos minutos y creará un directorio `/node_modules` en la raíz de tu proyecto. Este directorio sólo le es útil a **GruntJS**, no debemos utilizarlo en ambiente productivo.

Luego es hora de descargar las librerías **JavaScript** base y sus dependencias a través de **Bower**:

	$ sudo bower install

Luego para comenzar acciona el comando:

	$ grunt init

![](http://www.csslab.cl/wp-content/uploads/2014/04/2watch.png)

Este comando comenzará a mover las librerías **JavaScript** a sus lugares correspondientes. 

Luego para comenzar a formar los directorios de trabajo:

	$ grunt

El cual comenzará a procesar las tareas ya definidas. En este momento debes llamar el directorio de trabajo en tu browser (a través de tu servidor web local) y activar **LiveReload**. Cuando el ícono cambie es porque está sincronizado con **GruntJS** y a cada cambio en archivos **jade/sass/js/images** en tu proyecto, **watch** hará que se actualicen los archivos y **LiveReload** recargará el browser por tí.

El trabajo diario se realiza sólo con **watch**:

	$ grunt watch

![](http://www.csslab.cl/wp-content/uploads/2014/04/Screen-Shot-2014-04-03-at-5.12.04-PM.png)![](http://www.csslab.cl/wp-content/uploads/2014/04/Screen-Shot-2014-04-03-at-5.13.24-PM.png)

Si hay un error en tu sintaxis lo más probable es que **GruntJS** te avise y deje de correr, por lo que debes corregirlo antes de continuar.

![](http://www.csslab.cl/wp-content/uploads/2014/04/3error.png)

###Test

A través de un nueva tarea de **GruntJS** se prueba el archivo **JavaScript** en búsqueda de errores de sintaxis y mejoras en él:

	$ grunt testjs

Además se rastrea los archivos `.html` generados desde `.jade` buscando errores de sintaxis básicos automáticamente a través de **watch** y manualmente con el comando:

	$ grunt testhtml

###Build

A través de un nueva tarea de **GruntJS** se procesan los archivos (principalmente dentro de assets) minificándolos, concatenándolos y limpiando los no archivos que no son necesarios para producción:

	$ grunt build

Estos quedarán en el directorio /build listos para ser integrados posteriormente.

**Feliz Proyecto :)**

---

### <a name="english"></a>English version


**Adapted for I2B Projects**

Este es un sencillo flujo que pueden utilizar para proyectos frontend. Debes tener lo fundamental para funcionar:

This is a simple flow that can be used to frontend projects. You must have the basics to run:

- [NodeJS](http://nodejs.org/download/)
- [LiveReload](http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions)
- *Grunt command line interface* (CLI): installed through the terminal command:
```
$ sudo npm install -g grunt-cli
```
- [Bower](http://bower.io/):
```
$ sudo npm install -g bower
```
- [GIT](http://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

**Attention Windows users**, You need a little more care to configure everything correctly [Read more on the Wiki](https://github.com/I2BTech/i2b-frontend-workflow/wiki/Problemas-en-Windows)

###TL;DR

1. Download [I2B Frontend WorkFlow](https://github.com/I2BTech/i2b-frontend-workflow/archive/master.zip) .zip file
2. Move them to your local working directory (eg. localhost/project)
3. `$ npm install` (install node packages)
4. `$ bower install` (install js libraries)
5. `$ grunt init` (first local setup)
6. `$ grunt`

###package.json

This is the file that contains the names of the **Node** libraries used to automate repetitive tasks and that resides in the project root. Here are the name and version of each plugin that we'll need and use, a long list of existing plugins.

###bower.json

Json file that contains the **JavaScript** libraries used for this project. Through it the transfer is made from each repository and download the latest versions available at `bower_components` and subsequently are processed.

###Gruntfile.js

It is the base file which we'll create the tasks that need  **GruntJS** to run for us and that lies at the root of the project next to  **package.json**. In this file are defined how plugins will work, and for this workflow includes the following ones:

- **concat**: concatenate JavaScript libraries
- **uglify**: minifies and obfuscate JavaScript files
- **spritesmith**: creates an image and a sprite stylesheet from various icons
- **imagemin**: compress images
- **sass**: compiles and minifies .scss files
- **jade**: compiles and minifies .jade files
- **bowercopy**: copy all JavaScript libraries to `/dist/js/libs` and they're ready to be used
- **watch**: runs al defines tasks whenever changes are made to them in this case all of the above
- **autoprefixer**: adds CSS prefixes right to CSS files generated from SCSS ones according to last 3 versions of each major browser and IE8, IE9
- **jshint** y **htmlhint**: check JS and HTML syntax basic rules as defined in ` .jshintrc` and `.htmlhintrc` respectively

###Use

The base directory is named `/ project-name` and contains everything needed to start working. Assuming you work on a local server, the basic file structure is as follows:

	/project-name/Gruntfile.js
	/project-name/package.json
	/project-name/src/
	/project-name/dist/
	/project-name/build/


The directory where you work your assets is called `/ src` and contains:

	/project-name/src/js/
	/project-name/src/js/libs/
	/project-name/src/sass/
	/project-name/src/sass/inc/
	/project-name/src/jade/
	/project-name/src/jade/inc/
	/project-name/src/images/
	/project-name/src/images/sprites/


Which after processed by **GruntJS** will reside in `/ assets` and should be call from your **HTML** files:

	/project-name/dist/assets/js/
	/project-name/dist/assets/js/libs/
	/project-name/dist/assets/css/
	/project-name/dist/assets/images/

To begin working in Terminal/Console you must be in the directory path you're working on:

	$ cd /path/to/project-name/

To install the plugins to be used and which are defined in **package.json**:

	$ sudo npm install

![](http://www.csslab.cl/wp-content/uploads/2014/04/1npm.png)

This commando will call all repositories and the required packages will be installed for the tasks we have assigned. This may take a few minutes and will create a `/ node_modules` directory in the root of your project. This directory is only useful to ** GruntJS**, we should not use it in production environment or version it.

Then it's time to download the **JavaScript** libraries and its dependencies through **Bower**:

	$ sudo bower install

Then to start write the command:

	$ grunt init

![](http://www.csslab.cl/wp-content/uploads/2014/04/2watch.png)

This command will start to move the **JavaScript** libraries to their proper places.

Then to begin forming working directories:

	$ grunt

Which begins processing the tasks already defined. At this point you should call the working directory in your browser (through your local web server) and activate **LiveReload** . When the icon change it's state is that is synchronized with **GruntJS** and when **jade/sass/js/images** files changes by you, **LiveReload** will watch the files are updated and will reload the browser for you.

The daily work is performed only by **watch*:

	$ grunt watch

![](http://www.csslab.cl/wp-content/uploads/2014/04/Screen-Shot-2014-04-03-at-5.12.04-PM.png)![](http://www.csslab.cl/wp-content/uploads/2014/04/Screen-Shot-2014-04-03-at-5.13.24-PM.png)

If there is a syntax error most likely **GruntJS** will alert you and stop running, so you have to correct it before continuing.

![](http://www.csslab.cl/wp-content/uploads/2014/04/3error.png)

###Test

Through a new **GruntJS** task, **JavaScript** files are tested and linted looging by errors and improvements:

	$ grunt testjs

Also `.html` files generated from `.jade` are tested looking for syntax errors automatically through **watch** and manually using the command:

	$ grunt testhtml

###Build

Through a new **GruntJS** task files are processed (mainly in assets) minifying, concatenating and cleaning the files that are not needed for production:

	$ grunt build

These are saved in `/build` directory and ready to be integrated later.

**Happy Coding :)**
