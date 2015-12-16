I2B Frontend WorkFlow
===

**Adaptado para Proyectos I2B.cl**

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
5. `$ grunt init`
6. fin!

###package.json

Es el archivo que contiene los nombres de las librerías **Node** que utilizaremos para automatizar nuestras tareas recurrentes y que reside en la raíz del proyecto. Aquí están el nombre y la versión de cada plugin que necesitaremos, de una larga lista de plugins existentes.

Se necesita cambiar al inicio de este archivo el *Nombre-Cliente-y-Proyecto* (sin espacios ni caracteres especiales):

	{
		"name": "Nombre-Cliente-y-Proyecto"
		...

###bower.json

Archivo json que contiene las librerías **JavaScript** utilizadas para este proyecto. A través de ella se realiza el traspaso desde cada repositorio y se descarga las últimas versiones disponibles a `bower_components` y que posteriormente serán procesados.

###Gruntfile.js

Es el archivo base con el cual crearemos las tareas que necesitamos corra **GruntJS** por nosotros y que reside en la raíz del proyecto junto a **package.json**. En este archivo están definidas los plugins que utilizaremos y cómo deben trabajar, en esta ocasión incluyo los siguientes:

- **concat**: concatena y minifica librerías JavaScript
- **uglify**: minifica archivos JavaScript
- **spritesmith**: crea una imagen y una hoja de estilos sprite a partir de varios íconos
- **imagemin**: comprime imágenes
- **sass**: compila y minifica archivos .scss
- **jade**: compila y minifica archivos .jade
- **bowercopy**: copia las librerías JS en /src/js/libs para su uso
- **watch**: corre tareas definidas cada vez que se realizan cambios a ellas, en este caso todas las anteriores.
- **autoprefixer**: agrega prefijos directo a los archivos CSS generados de SCSS dentro de `dist/assets/css` correspondientes a las últimas 3 versiones (la actual y una anterior) de los principales browsers y las versiones en específico de IE 8 y 9.
- **jshint** y **htmlhint**: verifica sintaxis JS y HTML según reglas básicas definidas en `.jshintrc` y `.htmlhintrc` respectivamente.

###Uso

El directorio base se llama `/proyecto` y contiene todo lo necesario para comenzar a trabajar. Suponiendo que trabajas en un servidor local, la estructura básica de archivos es la siguiente:

	/proyecto/Gruntfile.js
	/proyecto/package.json
	/proyecto/dist/index.html


El directorio donde trabajarás tus assets se llama `/src ` y contiene:

	/proyecto/src/js/
	/proyecto/src/js/libs/
	/proyecto/src/sass/
	/proyecto/src/sass/inc/
	/proyecto/src/jade/
	/proyecto/src/jade/inc/
	/proyecto/src/images/
	/proyecto/src/images/sprites/


Los que después de procesados por **GruntJS** residirán en `/assets` y son los que debes llamar desde tus archivos **HTML**:

	/proyecto/dist/assets/js/
	/proyecto/dist/assets/js/libs/
	/proyecto/dist/assets/css/
	/proyecto/dist/assets/images/

Para comenzar a trabajar, en Terminal/Consola debes estar en el directorio que estés trabajando:

	$ cd /path/to/proyecto/

Para instalar los plugins a utilizarse y que están definidos en **package.json**:

	$ sudo npm install

![](http://www.csslab.cl/wp-content/uploads/2014/04/1npm.png)

Con esto se llamarán a todos los repositorios e instalará los paquetes necesarios para hacer las tareas que tenemos asignadas. Esto puede tomar unos minutos y creará un directorio `/node_modules` en la raíz de tu proyecto. Este directorio sólo le es útil a **GruntJS**, no debemos utilizarlo en ambiente productivo.

Luego es hora de descargar las librerías **JavaScript** base y sus dependencias a través de **Bower**:

	$ sudo bower install

Antes de correr **GruntJS**, abre **Gruntfile.js** y revisa los path que concuerden con los que estés trabajando, principamente los relacionados con **ftp-deploy** (si lo vas a utilizar). Si todo concuerda, acciona el comando:

	$ grunt init

![](http://www.csslab.cl/wp-content/uploads/2014/04/2watch.png)

Este comando comenzará a mover las librerías **JavaScript** a sus lugares y concatena las que están ya programadas. 

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


**Happy Coding :)**


####To-Do:

- Task para performance