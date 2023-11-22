TODOLIST EXPLICACIÓN:
la pagina esta organizada en 2 sentidos, las funciones del todo list estan separadas de las funciones del perfil de usuarios
para acceder a las funciones del todolist, estas se encuentran en la carpeta de todolistappfunction, en la carpeta 
logic encontraremos con todas las operaciones con respecto al usuario, en la carpeta modals se encontraran todos los 
Modals usados en la pagina menos los modales de todolist, esos tienen su propia carpeta dentro de todolist app function, 
la carpeta pages se encarga del renderizado de cada una de las paginas del todolist, mientras que el resto se encarga de 
la lógica que usan estas paginas, en la carpeta inputs podremos encontrar todos los inputs componetizados, en este caso
estos inputs seran los de el login que seria el archivo llamado input y register perteniciente a los inputs del register
la carpeta licomponents se encarga de renderizar los botones del header y el resto de carpetas son intuitivas puesto que
donde se guarda el contexto de ambos tanto del usuario como de los todo es en context, al igual que los reducer y en la 
carpeta services API podemos encontrar las URL para realizar los fecth a la API y también encontraremos los fetch en un
archivo llamado API fetch