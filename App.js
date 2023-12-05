

// Asignación de un historial (Arreglo 1)
let RickMortyHistory = [];

//Agregando los eventos para cada botón
document.getElementById("Color-selector").addEventListener("change", handleColorChange);
document.getElementById("Search").addEventListener("click", handleSearch);
document.getElementById("Show-history").addEventListener("click", displayRickMortyHistory);
document.getElementById("New-team").addEventListener("click", handleNewTeam);
document.getElementById("Filter-male").addEventListener("click", () => filterByGender("Male"));
document.getElementById("Filter-female").addEventListener("click", () => filterByGender("Female"));
document.getElementById("Filter-human").addEventListener("click", filterHumans);

// Función para llamar al ID principal en este caso (RickMorty)
async function handleSearch() {
    const RickMortyName = document.getElementById("RickMorty").value;

    if (!RickMortyName) {
        showAlert("Empty field, please write something!");
        return;
    }

    try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/${RickMortyName}`);
        if (response.status === 404) {
            showAlert("RickMorty not found");
            return;
        }

        const rickMorty = await response.json();

        // Obtener la URL de la imagen del personaje
        const imageUrl = rickMorty.image;

        // Llamar a la función para actualizar el fondo del cuerpo con la URL de la imagen del personaje
        updateBackground(imageUrl);

        // Resto de tu código...
        addRickMorty(rickMorty);
        document.getElementById("RickMorty").value = "";
    } catch (err) {
        showAlert("Bad connection? Try again");
    }
}
//En esta función agregamos a cada uno de los personajes, y esto lo englobamos en un contenedor
function addRickMorty(RickMorty) {
    RickMortyHistory.push(RickMorty);
    const RickMortyList = document.getElementById("RickMorty-container");
//Esta condición verifica si la propiedad image del objeto RickMorty existe y no es una cadena vacia
//Basicamente esta comprobando si hay una imagen disponible para el RickMorty espesificado
    if (RickMorty.image && RickMorty.image !== "") {
        const characterCard = createCharacterInfoCard(RickMorty);
        RickMortyList.appendChild(characterCard);
//Si la condición es verdadera creara una tarjeta de información
//del personaje utilizando la función createCharacterInfoCard
//Luego agrega la characterCard creada a RickMorty
        if (RickMortyList.childElementCount >= 3) {
            document.getElementById("New-team").disabled = false;
            disableElements(true);
            showAlert("You already completed your team!");
        }
//Habilita el elemento con el ID "New-team" establecido su propiedad "disable" en false
//Desabilita otros elementos llamando la función disableElemts con true como argumento
//Muestra una alerta con el mensaje "You already completed your team!"
        RickMortyHistory.sort((a, b) => a.status - b.status);

    } else {
//Posteriormente, ordena al array RickMortyHistory basándose en la propiedad status de cada objeto
//Si la condición inicial no se ucmple (es decir, no hay una imagen disponble para el RickMorty) muestra una alerta
//Con el mensaje "Imagen not available forMorty"
        showAlert("I this Rickmage not available for this RickMorty");
    }
}
//Se activa cuando  hay un cambio en el elemento de selección de color en el documento
function handleColorChange() {
    //Esta linea obtiene el elemento de HTML con el ID "Color-selector(Supongamos que s un elemnto de selección como un <select> con opciones de color
    // y guarda su valor seleccionado en la variable slectedColor)"
    const selectedColor = document.getElementById("Color-selector").value;
    //Esta linea cambia el color de fondo del cuerpo del documento(representado por documento.body) al color seleccionado
    document.body.style.backgroundColor = selectedColor;
}
function handleNewTeam() {
    //Habilita la entrada de texto y el boton de busquedad
    //tambien limpia contenedores de visualización de personajes y las alertas
    disableElements(false);
    clearContainer("RickMorty-container");
    clearContainer("RickMorty-alert");
    document.getElementById("New-team").disabled = true;
}

function filterByGender(gender) {
    //Filtra los personajes y basandose en el genero espesificado
    //Tambien llama ala función para mostrar los personajes filtrados
    const filteredCharacters = RickMortyHistory.filter(character => character.gender.toLowerCase() === gender.toLowerCase());
    displayFilteredCharacters(filteredCharacters);
}

function filterHumans() {
    //Filtra los personajes,que tienen la especie human
    const humanCharacters = RickMortyHistory.filter(character => character.species.toLowerCase() === "human");
    displayFilteredCharacters(humanCharacters);
}

function displayFilteredCharacters(filteredCharacters) {
    //Borra el contenido del contenedor
    //Para cada personaje filtrado,crea una tarjeta de información utilizando la función y la a grega al contenedor
    const RickMortyContainer = document.getElementById("RickMorty-container");
    RickMortyContainer.innerHTML = "";

    filteredCharacters.forEach(RickMorty => {
        const characterCard = createCharacterInfoCard(RickMorty);
        RickMortyContainer.appendChild(characterCard);
    });
}

function createCharacterInfoCard(RickMorty) {
    //Crea y devuelve un elemento de tarjeta con la información del personaje, incluyendo la imagen, el id, el nombre,estado y la especie y genero
    const card = document.createElement("div");
    card.className = "character-card";

    const image = document.createElement("img");
    image.src = RickMorty.image;

    card.appendChild(image);

    const info = document.createElement("div");
    info.className = "character-card-info";
    info.innerHTML = `
        <strong>Id</strong>: ${RickMorty.id}<br>
        <strong>Name</strong>: ${RickMorty.name}<br>
        <strong>Status</strong>: ${RickMorty.status}<br>
        <strong>Species</strong>: ${RickMorty.species}<br>
        <strong>Gender</strong>: ${RickMorty.gender}
    `;

    card.appendChild(info);

    return card;
}

function disableElements(status) {
        //Habilita o deshabilita la entrada de texto (RickMorty) y el botón de búsqueda (Search) según el valor de status

    document.getElementById("RickMorty").disabled = status;
    document.getElementById("Search").disabled = status;
}

function showAlert(message) {
        //Muestra una alerta con el mensaje especificado en el contenedor de alertas (RickMorty-alert).

    document.getElementById("RickMorty-alert").innerHTML = "";
    const RickMortyAlert = document.getElementById("RickMorty-alert");
    const element = document.createElement("div");
    element.innerHTML = `<h2>${message}</h2>`;
    RickMortyAlert.appendChild(element);
}

function displayRickMortyHistory() {
     //Borra el contenido del contenedor para cada personaje, crea una tarjeta de información si tiene una imagen
    //la agrega al contenedor
    const RickMortyHistoryContainer = document.getElementById("History-container");
    RickMortyHistoryContainer.innerHTML = "";

    RickMortyHistory.forEach(RickMorty => {
        if (RickMorty.image && RickMorty.image !== "") {
            const element = createCharacterInfoCard(RickMorty);
            RickMortyHistoryContainer.appendChild(element);
        }
    });
}

function clearContainer(containerId) {
        //Borra el contenido del contenedor especificado por su ID

    const container = document.getElementById(containerId);
    container.innerHTML = "";
}

function displaySelectedCharacter(character) {
    //Muestra la imagen del personaje seleccionado en el elemento con el ID "Selected-character-image"
    //Borra el contenido del contenedor RickMorty-container
    //Crea y agrega una tarjeta de información del personaje seleccionado al contenedor
    const selectedCharacterImage = document.getElementById("Selected-character-image");
    selectedCharacterImage.src = character.image;

    const RickMortyContainer = document.getElementById("RickMorty-container");
    RickMortyContainer.innerHTML = "";

    const characterCard = createCharacterInfoCard(character);
    RickMortyContainer.appendChild(characterCard);
}
// Esta función actualiza el fondo del cuerpo con la imagen del personaje
function updateBackground(imageUrl) {
    document.body.style.background = `url('${imageUrl}') center/cover no-repeat`;
}

// Función para llamar al ID principal en este caso (RickMorty)
async function handleSearch() {
    const RickMortyName = document.getElementById("RickMorty").value;
//Si está vacío, se muestra una alerta indicando que el campo está vacío y le pide al usuario que escriba algo. Luego, la función se detiene con return, evitando que el código siguiente se ejecute.
    if (!RickMortyName) {
        showAlert("Empty field, please write something!");
        return;
    }

    try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/${RickMortyName}`);
        //Se utiliza la funciòn fetch para obtener datos de la URL de la API y se incluye el nombre del personaje que el usuario proporciono en la busqueda
        if (response.status === 404) {
            //En caso de un estado 404 se muestra una alerta indicando que el persoanje no  se encottro
            showAlert("RickMorty not found");
            return;
        }

        const rickMorty = await response.json();

        // Obtener la URL de la imagen del personaje
        const imageUrl = rickMorty.image;

        // Llamar a la función para actualizar el fondo del cuerpo con la URL de la imagen del personaje
        updateBackground(imageUrl);

        //se llama a ala funciòn para agregar el personaje a la lista de historial, ademas se limpia el campo de busquedad
        addRickMorty(rickMorty);
        document.getElementById("RickMorty").value = "";
    } catch (err) {
        showAlert("Bad connection? Try again");
    }
}
// ... (Código anterior sin cambios)
//Codigo de abajo es para poder borrar una tarjeta de el historial, tiene la opción de borrar el que queramos
function createCharacterInfoCard(RickMorty) {
    // Crea y devuelve un elemento de tarjeta con la información del personaje, incluyendo la imagen, el id, el nombre, estado y la especie y género
    const card = document.createElement("div");
    card.className = "character-card";

    const image = document.createElement("img");
    image.src = RickMorty.image;

    card.appendChild(image);

    const info = document.createElement("div");
    info.className = "character-card-info";
    info.innerHTML = `
        <strong>Id</strong>: ${RickMorty.id}<br>
        <strong>Name</strong>: ${RickMorty.name}<br>
        <strong>Status</strong>: ${RickMorty.status}<br>
        <strong>Species</strong>: ${RickMorty.species}<br>
        <strong>Gender</strong>: ${RickMorty.gender}
    `;

    // Agregar botón de eliminación
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", () => removeRickMorty(RickMorty.id)); // Llamará a la función removeRickMorty con el ID del personaje
    info.appendChild(deleteButton);

    card.appendChild(info);

    return card;
}

function removeRickMorty(characterId) {
    // Filtrar el historial para excluir el personaje con el ID especificado
    RickMortyHistory = RickMortyHistory.filter(character => character.id !== characterId);

    // Volver a mostrar el historial actualizado
    displayRickMortyHistory();
}


