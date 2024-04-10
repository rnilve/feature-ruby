Este repositorio esta compuesto por dos proyectos el back-end en ruby and rails, y otro de front-end en react 
1. Clonar repositorio, (git clone)
   BACK-END
2. Acceder a la carpeta app-server-sismos para levantar el proyecto back-end
  - Instalar dependencias: (bundle install)
  - Migrar modelos (rails db:migrate)
  - Ejecuta la tarea para obtener y persistir los datos sismológicos: (rails fetch_earthquake_data)
  - Levantar servidor: (rails server)
   FRONT-END
3. Acceder a la carpeta app-client-sismos para levantar el proyecto front-end
  - Instalar Dependencias: (npm install)
  - Levantar servidor (npm start), si se quiere levantar en el mismo puerto escoger la opcion si, para que react busque otro puerto
