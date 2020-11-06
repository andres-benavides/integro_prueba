## Prueba Tecnica

Esta prueba esta desarrollada con el framework de PHP Laraver version 7 por cual necesita una version de PHP mayor o igual a 7.2.5.
El fornt-end esta apoyado en componentes de ReactJS por lo tanto es necesario tener instalado NodeJs.

Para el funcionamiento del proyecto se debe modificar el archivo .env donde se encuentra la conexion con la base de datos, en este momento se encuenta con los siguientes datos:

-   DB_CONNECTION=mysql
-   DB_HOST=127.0.0.1
-   DB_PORT=3306
-   DB_DATABASE=integro
-   DB_USERNAME=root
-   DB_PASSWORD=

Se debe crear una base de datos que se llame integro, si se crea con otro nombre, cambiar el nombre en el archivo.

Para iniciar la aplicacion y hacer la revision correspondiente se deben ejecutra los siguientes comandos desde la consola en el directorio del proyecto.

-   composer install
-   npm install
-   npm run dev
-   php artisan serve

Luego de esto si todo sale bien se puede acceder a la aplicacion desde el navegador web ingresadndo a: <a href='http://127.0.0.1:8000'>http://127.0.0.1:8000</a>
