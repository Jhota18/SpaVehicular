 
var BaseUrl = "http://localhost:58020/";
//var BaseUrl = "http://spa-vehicular.runasp.net/"

jQuery(function () {
    //Carga el menú
    $("#dvMenu").load("../Paginas/Menu.html");
    $('#cbocodSede').select2();
    $('#cbocodCargo').select2();
    LlenarTablaEmpleados();
    LlenarComboSedes();
}); 

async function insertarTelefono(telefonoValor) {
    const telefono = { Telefono: telefonoValor };
    const respuesta = await EjecutarComandoServicio("POST", BaseUrl + "api/TelfEmpleados/Insertar", telefono);
    console.log("Respuesta al insertar teléfono:", respuesta);
    //if (typeof parseInt(respuesta) !== "number") {
    //    throw new Error("Error al insertar teléfono: ID inválido");
    //}
    return respuesta;
}

async function insertarEmail(emailValor) {
    const email = { Email: emailValor };
    const respuesta = await EjecutarComandoServicio("POST", BaseUrl + "api/EmaEmpleados/Insertar", email);
    if (typeof parseInt(respuesta) !== "number") {
        throw new Error("Error al insertar email: ID inválido");
    }
    return respuesta;
}


async function crearEmpleado() {
    try {
        // Validación básica de campos
        const nombres = $("#txtNombre").val().trim();
        const apellidos = $("#txtApell").val().trim();
        const cargo = $("#txtCargo").val().trim();
        const fechaNacimiento = $("#txtFechaN").val();
        const salario = parseFloat($("#txtSalario").val());
        const telefonoValor = $("#txtDir").val().trim(); // revisar nombre
        const emailValor = $("#txtEmail").val().trim(); 
        const idSede = parseInt($("#cbocodSede").val());

        // Validar campos obligatorios
        if (!nombres || !apellidos || !cargo || !fechaNacimiento || isNaN(salario) || !telefonoValor || !emailValor || isNaN(idSede)) {
            alert("Por favor, complete todos los campos requeridos correctamente.");
            return;
        }

        const idTelefono = await insertarTelefono(telefonoValor);
        const idEmail = await insertarEmail(emailValor);

        const empleado = {
            Nombres: nombres,
            Apellidos: apellidos,
            Cargo: cargo,
            Fecha_Nacimiento: fechaNacimiento,
            Salario: salario,
            Telefono: idTelefono,
            Email: idEmail,
            Sede: idSede
        };

        console.log("Empleado a enviar:", empleado);

        // Llamada al servicio
        const respuesta = await EjecutarComandoServicio("POST", BaseUrl + "api/Empleados/Insertar", empleado);

        // Suponiendo que respuesta es un objeto con un mensaje o código de estado
        if (respuesta && respuesta.success) {
            alert("Empleado creado exitosamente.");
            limpiarFormulario();
        } else {
            // Si backend solo devuelve un mensaje string, muestra ese mensaje
            const msg = respuesta?.mensaje || respuesta || "Intente más tarde.";
            alert("No se pudo crear el empleado. " + msg);
        }

    } catch (error) {
        console.error("Error al crear empleado:", error);
        alert("Ocurrió un error inesperado al crear el empleado. Por favor, intente más tarde.");
    }
}

function LlenarTablaEmpleados() {
    let URL = BaseUrl + "api/Empleados/ConsultarTodos";
    LlenarTablaXEmpleadosAuth(URL, "#tablaDatos")
}

function LlenarComboSedes() {
    let URL = BaseUrl + "api/Sede/ConsultarTodas";
    llenarComboSede(URL, "#cbocodSede")
}