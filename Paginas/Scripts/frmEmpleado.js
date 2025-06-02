var BaseUrl = "http://spa-vehicular.runasp.net/"; 

jQuery(function () {
    //Carga el menú
    $("#dvMenu").load("../Paginas/Menu.html");
    LlenarTablaEmpleados();
}); 

function LlenarTablaEmpleados() {
    let URL = BaseUrl + "api/Empleados/Consultar";
    LlenarTablaXServiciosAuth(URL, "#tablaDatos")
}