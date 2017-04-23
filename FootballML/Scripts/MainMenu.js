var equipo1 = -1;
var equipo2 = -1;


//Team selection logic
function teamclick1(teamnumber) {
    $("#container1").hide();
    $("#container2").show();
    $("#textTeam1").hide();
    $("#textTeam2").show();
    switch (teamnumber) {
        case 0:
            equipo1 = 0;
            $("#juvTeam2").show(100);
            $("#bayernTeam2").show(100);
            $("#barcaTeam2").show(100);


            break;
        case 1:
            equipo1 = 1;

            $("#juvTeam2").show(100);
            $("#realTeam2").show(100);
            $("#barcaTeam2").show(100);
            break;
        case 2:
            equipo1 = 2;
            $("#realTeam2").show(100);
            $("#bayernTeam2").show(100);
            $("#barcaTeam2").show(100);
            break;
        case 3:
            equipo1 = 3;
            $("#juvTeam2").show(100);
            $("#bayernTeam2").show(100);
            $("#realTeam2").show(100);
            break;
    }

}

function teamclick2(teamnumber) {
    switch (teamnumber) {
        case 0:
            equipo2 = 0;
            $("#juvTeam2").hide(100);
            $("#bayernTeam2").hide(100);
            $("#barcaTeam2").hide(100);
            $("#realTeam2").hide(100);
            break;
        case 1:
            equipo2 = 1;
            $("#bayernTeam2").hide(100);
            $("#juvTeam2").hide(100);
            $("#realTeam2").hide(100);
            $("#barcaTeam2").hide(100);
            break;
        case 2:
            equipo2 = 2;
            $("#bayernTeam2").hide(100);
            $("#realTeam2").hide(100);
            $("#barcaTeam2").hide(100);
            $("#juvTeam2").hide(100);
            break;
        case 3:
            equipo2 = 3;
            $("#bayernTeam2").hide(100);
            $("#realTeam2").hide(100);
            $("#juvTeam2").hide(100);
            $("#barcaTeam2").hide(100);
            break;
    }
    $('#buttons').show(100);
    $("#rest").show(100);
    $("#sub").show(100);
    $("#textTeam2").hide();
    $("#ContinuarText").show();
}
function Reestablecer() {
    equipo1 = -1;
    equipo2 = -1;
    $("#container1").show();
    $("#container2").hide();
    $('#buttons').hide();
    $("#rest").hide();
    $("#show").hide();
    $("#textTeam1").show();
    $("#sub").hide();
    $("#ContinuarText").hide();


}


//Main menu visibility logic
$(document).ready(function () {
    $("#Auto").hide();
    $("#Recrear").hide();
    $("#Atras").hide();
    $('#container1').hide();
    $('#container2').hide();
    $("#textTeam1").hide();
    $("#textTeam2").hide();
    $("#buttons").hide();
    $("#ContinuarText").hide();
    $('#historial').hide();
    $('#atrasHistorial').hide();
    $('#atrasSeleccion').hide();
    $('#MLChoose').hide();
    $('#spinners').hide();

    //ML model submit
    $("#subm").click(function () {
       
           
            $("#spinner").show(100);
        
    });

    $("#submitted").click(function () {


        $("#spinners").show(100);

    });

    $("#Jugar").click(function () {
        $("#Auto").show();
        $("#Jugar").hide();
        $("#Recrear").show();
        $("#Atras").show();
        $("#Simular").hide();
    });

    $("#Atras").click(function () {
        $("#Jugar").show();
        $("#Auto").hide();
        $("#Recrear").hide();
        $("#Atras").hide();
        $("#Simular").show();
    });



    $('#SeleccionarTeam').click(function () {
        $("#textTeam2").hide();
        $("#container2").hide();
        $("#rest").hide();
        $("#juvTeam2").hide();
        $("#bayernTeam2").hide();
        $("#barcaTeam2").hide();
        $("#realTeam2").hide();
        $("#ContinuarText").hide();
        $("#sub").hide();
        $('#container1').show(100);
        $("#Auto").hide();
        $('#textTeam1').show();
        $("#Recrear").hide();
        $("#Atras").hide();
        $('#atrasSeleccion').show(100);


    });

    $('#Recrear').click(function () {
        $('#Atras').hide();
        $('#Recrear').hide();
        $('#Auto').hide();
        $('#historial').show(100);
        $('#atrasHistorial').show(100);
        $('#Title').hide();
    })

    $('#atrasSeleccion').click(function () {
        $('#atrasSeleccion').hide();
        $('#historial').hide();
        $('#Jugar').show(100);
        $('#Simular').show(100);
        $('#container1').hide();
        $('#container2').hide();
        $("#textTeam1").hide();
        $("#textTeam2").hide();
        $("#buttons").hide();
        $("#ContinuarText").hide();
        $('#historial').hide();
    })


    $('#Simular').click(function () {

        $('#Jugar').hide();
        $('#Simular').hide();
        $('#MLChoose').show(100);
        $('#spinner').hide();
        $('#Title').hide();
    })

    $('#atrasHistorial').click(function () {
        $('#atrasHistorial').hide();
        $('#historial').hide();
        $('#Jugar').show(100);
        $('#Simular').show(100);
        $('#Title').show(100);
    })


    //Team submit


    $('#sub').on('click', function () {

        
        var url = "/Juego/Jugar?equipoa=" + equipo1.toString() + "&equipob=" + equipo2.toString();
        window.location.href = url;
    })
})
