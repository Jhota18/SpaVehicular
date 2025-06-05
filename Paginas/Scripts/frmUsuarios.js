let BaseUrl = "http://localhost:58020/";
//let BaseUrl = "http://spa-vehicular.runasp.net/"
jQuery(function () {
    //Carga el menú
    $("#dvMenu").load("../Paginas/Menu.html");
    $('#cboEmp').select2();
    LlenarComboEmp();
});  //Del: jQuery

function LlenarComboEmp() {
    let URL = BaseUrl + "api/Empleados/ConsultarTodos";
    llenarComboEmp(URL, "#cboEmp")
}

async function crearUsuario() {
  try {
    const idEmpl = parseInt($("#cboEmp").val());
    const usua = $("#txtusuario").val().trim();
    const clave = $("#txtclave").val().trim();

    if (!usua || !clave) {
        alert("Por favor, complete todos los campos requeridos correctamente.");
        return;
    }

    const perfil = {
        ID_Empleado: idEmpl,
        Usuario: usua,
        Clave: clave,
 
    };

    console.log("Usuario a enviar:", perfil);
    const respuesta = await EjecutarComandoServicio("POST", BaseUrl + "api/Perfiles/CrearUsuarios", perfil);

    // Suponiendo que respuesta es un objeto con un mensaje o código de estado
    if (respuesta && respuesta.success) {
        alert("Perfil creado exitosamente.");
        limpiarFormulario();
    } else {
        // Si backend solo devuelve un mensaje string, muestra ese mensaje
        const msg = respuesta?.mensaje || respuesta || "Intente más tarde.";
        alert("No se pudo crear el perfil. " + msg);
      }
  } catch (error) {
      console.error("Error al crear el perfil:", error);
      alert("Ocurrió un error inesperado al crear el perfil. Por favor, intente más tarde.");
    }

}