var GolesTeam1 = 0;
var GolesTeam2 = 0;



for (i = 0; i < jugs.length; i++)
{
    jugadas.push(jugs[i]);
}

var jugada = jugs[0]
alert(jugada);

$('#tabla').hide();

$('#historial').click(function () {

    $('#tablero').hide();
    $('#tabla').show(100);
})

$('#boton').click(function () {





    var equipo1 = $('#equipo1').val();
    var equipo2 = $('#equipo2').val();
    var nombre1 = $('#nombre1').val();
    var nombre2 = $('#nombre2').val();
    var equipoJugada = $('#Equipo').val();
    var categoria = $('#Categoria').val();
	var tipo = $('#Tipo').val();

    $('#tabla').hide();
    $('#tablero').show();

    $('#Goles1').html(GolesTeam1.toString());
    $('#Goles2').html(GolesTeam2.toString());
    $('#resume').hide();


    if (tipo == 'Inicio') {

        if (equipoJugada == equipo1)
            $('#EquipoBalon').html(nombre1 + " comienza con el balon");
        else
            $('#EquipoBalon').html(nombre2 + " comienza con el balon ");
        return;
    }










    $('historial').show();
    $('#tabla').hide();
    $('#tiro').hide();





    if (categoria == 'Falta') {
        //Es falta
        $('#ofensiva').hide();
        $('#defensiva').hide();
        $('#falta').show();

        if (tipo == "saquebandafalta" || tipo == "saquebanda") {
            //Saque de banda
            if (tipo == "saquebandafalta") {
                //Saque banda, cambia de equipo
                if (equipoJugada == equipo1) {
                    $('#falta').html('Saque de banda, balon pasa a' + nombre2);
                    equipoBalon = 2;
                }
                else {
                    $('#falta').html('Saque de banda, balon pasa a' + nombre1);
                    equipoBalon = 1;
                }
            }
            else {
                //Saque de banda, mismo equipo se queda con el balon, agregar falta a equipo contrario.
                if (equipoJugada == equipo1) {
                    $('#falta').html('Saque de banda de ' + nombre1);

                }
                else {
                    $('#falta').html('Saque de banda de ' + nombre2);

                }
            }
        }

        else if(tipo == "saquemeta") {
            //Saque de meta
            if (equipoJugada == equipo1) {
                $('#falta').html('Saque de meta, balon pasa a ' + nombre2);

            }
            else {

                $('#falta').html('Saque de meta, balon pasa a ' + nombre1);
            }
    
        }
          else {
            //saque de esquina
            if (equipoJugada == equipo1) {
                $('#falta').html('Saque de esquina de ' + nombre1);

            }
            else {
                $('#falta').html('Saque de esquina de ' + nombre2);

            }
        }


    }



    else if (Categoria = "Anotacion") {
        $('#tiro').show();
        if (equipoJugada == equipo1) {

            if (tipo == "penalgol") {
                $('#falta').show(100);
                $('#falta').html('Falta de ' + nombre2 + ', tiro libre para ' + nombre1);
                $('#tiro').html('GOOOOOOOOOOOOOOL del ' + nombre1);
                equipoBalon = 2;
            }

            else {
                $('#ofensiva').show(100);
                $('#ofensiva').html(nombre1 + ' tira para anotar!');
                $('#tiro').html('GOOOOOOOOOOOOOOL del ' + nombre1);
                equipoBalon = 2;

            }

        }

        else {

            if (tipo == "penalgol") {
                $('#falta').show(100);
                $('#falta').html('Falta de ' + nombre1 + ', tiro libre para ' + nombre2);
                $('#tiro').html('GOOOOOOOOOOOOOOL del ' + nombre2);
                equipoBalon = 1;
            }

            else {

                $('#ofensiva').show(100);
                $('#ofensiva').html(nombre2 + ' tira para anotar!');
                $('#tiro').html('GOOOOOOOOOOOOOOL del ' + nombre2);
                equipoBalon = 1;



            }
        }
    }

    else if (Categoria = "Defensiva") {
        $('#ofensiva').hide();
        $('#defensiva').show();
        $('#falta').hide();


        if (tipo == "robo") {
            switch (true) {
                case (equipoJugada == equipo1):
                    $('#defensiva').html('Robo de balon de ' + nombre1);
                    equipoBalon = 1;

                    break;
                default:
                    $('#defensiva').html('Robo de balon de ' + nombre2);
                    equipoBalon = 2;
                    break;
            }
        }
        else if (tipo == "penalbloqueo") {
            ('#tiro').show(100);
            switch (true) {
                case (equipoJugada == equipo1):

                    $('#falta').show(100);
                    $('#falta').html('Falta de ' + nombre2 + ', tiro libre para ' + nombre1);
                    $('#tiro').html('Tiro bloqueado por el ' + nombre2);
                    equipoBalon = 2;
                    break;
                default:

                    $('#falta').show(100);
                    $('#falta').html('Falta de ' + nombre1 + ', tiro libre para ' + nombre2);
                    $('#tiro').html('Tiro bloqueado por el ' + nombre1);
                    equipoBalon = 1;
                    break;
            }
        }
			else
            {

                ('#tiro').show(100);
                switch (true) {

                    case (equipoJugada == equipo1):

                        $('#ofensiva').show(100);
                        $('#ofensiva').html(nombre2 + ' tira para anotar!');
                        $('#tiro').html('Tiro bloqueado por el ' + nombre1);
                        equipoBalon = 1;

                        break;
                    default:

                        $('#ofensiva').show(100);
                        $('#ofensiva').html(nombre2 + ' tira para anotar!');
                        $('#tiro').html('Tiro bloqueado por el ' + nombre2);
                        equipoBalon = 2;
                        break;
                }
            }
        }


    
    else {//Jugadas ofensivas: tiros, pases, despejes
        $('#ofensiva').show();
        $('#defensiva').hide();
        $('#falta').hide();


        if (tipo == "avance") {
            //Avance 
            switch (true) {
                case (equipoJugada == equipo1):
                    $('#ofensiva').html(nombre1 + ' avanza con el balon');

                    break;
                default:
                    $('#ofensiva').html(nombre2 + ' avanza con el balon');

                    break;
            }
        }
        else {
            //pases
            switch (true) {
                case (equipoJugada == equipo1):
                    $('#ofensiva').html(nombre1 + ' pasa el balon');

                    break;
                default:
                    $('#ofensiva').html(nombre2 + ' pasa el balon');
                    break;
            }

        }




    }


    if (equipoBalon == 1)
        $('#EquipoBalon').html("El " + nombre1 + " tiene el balon");
    else
        $('#EquipoBalon').html("El " + nombre2 + " tiene el balon");


})