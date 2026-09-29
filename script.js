const claveApi = "e85cd050b9f47e18bd16116261709";
const ciudadInput = document.querySelector(".buscador input");
const botonBuscar = document.querySelector(".buscador button");

async function chequearClima(ciudad) {
const apiClimaActual = "https://weatherapi.com" + claveApi + "&q=" + ciudad + "&lang=es";
    try {
        const response = await fetch(apiClimaActual);
        
        if (!response.ok) {
            throw new Error("Error en la petición: " + response.status);
        }

        var data = await response.json();
        console.log(data);
        mostrarClima(data);

    } catch (error) {
        console.error("Hubo un problema con la solicitud:", error);
        alert("No se pudo obtener el clima. Verifica el nombre de la ciudad o tu API Key.");
    }
}

function mostrarClima(data) {
    let iconUrl = data.current.condition.icon;
    if (iconUrl.startsWith("//")) {
        iconUrl = "https:" + iconUrl;
    }

    document.querySelector(".icono-clima").src = iconUrl;
    document.querySelector(".temperatura").innerHTML = Math.round(data.current.temp_c) + "°c";
    document.querySelector(".ciudad").innerHTML = data.location.name;
    document.querySelector(".humedad").innerHTML = data.current.humidity + "%";
    document.querySelector(".viento").innerHTML = data.current.wind_kph + " km/h";
}

botonBuscar.addEventListener("click", () => {
    chequearClima(ciudadInput.value);
});