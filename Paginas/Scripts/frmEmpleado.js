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

function LlenarTablaEmpleados() {
    let URL = BaseUrl + "api/Empleados/ConsultarTodos";
    LlenarTablaXEmpleadosAuth(URL, "#tablaDatos")
}
function LlenarComboSedes() {
    let URL = BaseUrl + "api/Sede/ConsultarTodas";
    llenarComboSede(URL, "#cbocodSede")
}
