async function llenarTablaGral(url, Tabla) {
    try {
        const Respuesta = await fetch(url, {
            method: "GET",
            mode: "cors",
            headers: {
                "content-type": "application/json"
            }
        });

        const Rpta = await Respuesta.json();

        // Validar que la respuesta tenga datos
        if (!Array.isArray(Rpta) || Rpta.length === 0) {
            console.warn("Respuesta vacía o inválida.");

            // Mostrar mensaje si existe el div
            const mensajeDiv = document.getElementById("dvMensaje");
            if (mensajeDiv) {
                mensajeDiv.innerHTML = "No se encontraron datos.";
                mensajeDiv.style.color = "red";
                mensajeDiv.style.display = "block";
            }

            // Limpiar la tabla si ya existe
            if ($.fn.DataTable.isDataTable(Tabla)) {
                $(Tabla).DataTable().clear().draw();
            }

            return "Sin datos";
        }

        // Llena el encabezado dinámicamente
        var columns = [];
        const columnNames = Object.keys(Rpta[0]);
        for (let i in columnNames) {
            columns.push({
                data: columnNames[i],
                title: columnNames[i]
            });
        }

        // Llena la tabla
        $(Tabla).DataTable({
            data: Rpta,
            columns: columns,
            destroy: true
        });

        return "Termino";
    } catch (error) {
        console.error("Error al llenar la tabla:", error);

        const mensajeDiv = document.getElementById("dvMensaje");
        if (mensajeDiv) {
            mensajeDiv.innerHTML = "Ocurrió un error al consultar los datos.";
            mensajeDiv.style.color = "red";
            mensajeDiv.style.display = "block";
        }

        return "Error";
    }
}
