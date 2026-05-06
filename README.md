BASE_URL = "localhost:3000/api/v1/quotes"

1. `GET {BASE_URL}/random`
   Descripción: Obtiene una frase random de la API externa
   Respuesta esperada: 200 { quote, author}

2. `POST {BASE_URL}/favorites`
   Descripción: Guarda una frase en el archivo favorites.json
   Body necesario: { quote, author}
   Respuesta esperada: 201 { message, favorite: { id, quote, author, createdAt } }

3. `GET {BASE_URL}/favorites`
   Descripción: Obtiene todas las frases guardadas en el archivo favorites.json
   Respuesta esperada: 200 { favorites: [ {id, quote, author, createdAt}, ...] }

4. `DELETE {BASE_URL}/favorites/:id`
   Descripción: Borra la frase guardada en favorites.json, cuyo id corresponda con el pasado por los parámetros
   Respuesta esperada: 200 { message }
