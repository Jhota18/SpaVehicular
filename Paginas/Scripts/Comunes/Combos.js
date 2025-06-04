async function llenarComboGral(url, combo)
{
    try {
        const Respuesta = await fetch(url,
            {
                method: "GET",
                mode: "cors",
                headers: { "content-type": "application/json", }
            }
        );
        const Rpta = await Respuesta.json();
        //Recorrer la respuesta en Rpta, para agregarla al combo de tipo de producto
        $(combo).empty();
        //Se recorre la respuesta
        for (i = 0; i < Rpta.length; i++) {
            $(combo).append('<option value=' + Rpta[i].Codigo + '>' + Rpta[i].Nombre + '</option>');
        }
        //Tener muy encuenta los nombres de los campos, deben ser iguales
        return "Termino";
    }
    catch (error) {
        return "Error";
    }
}

async function llenarComboSede(url, combo) {
    try {
        const Respuesta = await fetch(url, {
            method: "GET",
            mode: "cors",
            headers: { "content-type": "application/json" }
        });
        const Rpta = await Respuesta.json();

        $(combo).empty(); // Limpia el combo
        $(combo).append('<option value="">Seleccione una sede</option>'); // Opción por defecto

        for (let i = 0; i < Rpta.length; i++) {
            let id = Rpta[i].ID_Sede;
            let nombre = Rpta[i].Nombre;
            $(combo).append('<option value="' + id + '">' + nombre + '</option>');
        }

        return "Termino";
    } catch (error) {
        return "Error";
    }
}

window.llenarComboSede = llenarComboSede;