
$('#tabla').hide();
(function ($) {

    var jugadas = [];
    $.fn.countTo = function (options) {
        // merge the default plugin settings with the custom options
        options = $.extend({}, $.fn.countTo.defaults, options || {});


        var equipo1 = $('#equipo1').val();
        var equipo2 = $('#equipo2').val();
        var nombre1 = $('#nombre1').val();
        var nombre2 = $('#nombre2').val();

        // how many times to update the value, and how much to increment the value on each update

        // how many times to update the value, and how much to increment the value on each update
        var loops = options.loops;
        var loopCount = options.loopcount;

        var equipoBalon = 0;



        if (Math.floor(Math.random() * 10) % 2 == 0) {
            equipoBalon = 1;
        }
        else {
            equipoBalon = 2;
        }
        var x = "";
        if (equipoBalon == 1)
            x = equipo1.toString();
        else
            x = equipo2.toString();
        var inicio = "0," + x + ",Ofensiva,Inicio,00";

        jugadas.push(inicio);
        if (equipoBalon == 1)
            $('#EquipoBalon').html(nombre1 + " comienza con el balon");
        else
            $('#EquipoBalon').html(nombre2 + " comienza con el balon");
        return $(this).each(function () {
            var _this = this,
                loopCount = 0,
                value = options.from,
                OfensivasTeam1 = 0,
                OfensivasTeam2 = 0,
                DefensivasTeam1 = 0,
                DefensivasTeam2 = 0,
                FaltasTeam1 = 0,
                FaltasTeam2 = 0,
                GolesTeam1 = 0,
                GolesTeam2 = 0,
                running = true,
                interval = setInterval(updateTimer, options.refreshInterval);

            $('#Goles1').html(GolesTeam1.toString());
            $('#Goles2').html(GolesTeam2.toString());
            $('#resume').hide();

            function updateTimer() {

                if (!running) {

                }
                else {
                    value += 1;
                    loopCount++;
                    rand = Math.floor(Math.random() * 10);
                    $(_this).html(value.toFixed(options.decimals));
                    var jugada = "" + loopCount.toString();



                    $('#tiro').hide();
                    if (typeof (options.onUpdate) == 'function') {
                        options.onUpdate.call(_this, value);
                    }


                    if (rand % 5 == 0) {
                        //Es falta
                        var type = Math.floor(Math.random() * 10);
                        $('#ofensiva').hide();
                        $('#defensiva').hide();
                        $('#falta').show();

                        if (type < 4) {
                            //Saque de banda
                            if (type >= 0 && type < 2) {
                                //Saque banda, cambia de equipo
                                if (equipoBalon == 1) {
                                    equipoBalon = 2;
                                    $('#falta').html('Saque de banda, balon pasa a' + nombre2);
                                    AgregarFaltas(1);
                                    jugada = jugada + ",saquebandafalta";
                                }
                                else {
                                    equipoBalon = 1;
                                    $('#falta').html('Saque de banda, balon pasa a' + nombre1);
                                    AgregarFaltas(2);
                                    jugada = jugada + ",saquebandafalta";
                                }
                            }
                            else {
                                //Saque de banda, mismo equipo se queda con el balon, agregar falta a equipo contrario.
                                if (equipoBalon == 1) {
                                    $('#falta').html('Saque de banda de ' + nombre1);
                                    AgregarFaltas(2);
                                    jugada = jugada + ",saquebanda";
                                }
                                else {
                                    $('#falta').html('Saque de banda de ' + nombre2);
                                    AgregarFaltas(1);
                                    jugada = jugada + ",saquebanda";
                                }
                            }
                        }

                        else if (type >= 4 && type < 6) {
                            //Saque de meta
                            if (equipoBalon == 1) {
                                equipoBalon = 2;
                                $('#falta').html('Saque de meta, balon pasa a ' + nombre2);
                                AgregarFaltas(1);
                                jugada = jugada + ",saquemeta";
                            }
                            else {
                                equipoBalon = 1;
                                $('#falta').html('Saque de meta, balon pasa a ' + nombre1);
                                AgregarFaltas(2);
                                jugada = jugada + ",saquebanda";
                            }
                        }
                        else if (type >= 6 && type < 8) {
                            //saque de esquina
                            if (equipoBalon == 1) {
                                $('#falta').html('Saque de esquina de ' + nombre1);
                                AgregarFaltas(2);
                                jugada = jugada + ",saqueesquina";
                            }
                            else {
                                $('#falta').html('Saque de esquina de ' + nombre2);
                                AgregarFaltas(1);
                                jugada = jugada + ",saqueesquina";
                            }
                        }
                        else {
                            //Falta directa, con tiro libre, cuenta como dos jugadas.

                            if (equipoBalon == 1) {

                                $('#falta').html('Falta de Equipo2, tiro libre para ' + nombre1);
                                var metiogol = TiroLibre(); //Si metio tiro libre, cuenta como una jugada de Gol.
                                FaltasTeam2++;
                                if (metiogol) {
                                    $('#tiro').html('GOOOOOOOOOOOOOOL del Equipo1 !');
                                    AgregarGoles(1);
                                    jugada = jugada + ",penalgol";

                                }
                                else {

                                    $('#tiro').html('Tiro bloqueado por el ' + nombre2);
                                    AgregarDefensivas(2);
                                    jugada = jugada + ",penalbloqueo";
                                }


                            }
                            else {
                                $('#falta').html('Falta de Equipo1, tiro libre para ' + nombre2);
                                var metiogol = TiroLibre(); //Si metio tiro libre, cuenta como una jugada de Gol.
                                FaltasTeam1++;
                                if (metiogol) {
                                    $('#tiro').html('GOOOOOOOOOOOOOOL del ' + nombre2);
                                    AgregarGoles(2);
                                    jugada = jugada + ",penalgol";

                                }
                                else {

                                    $('#tiro').html('Tiro bloqueado por el ' + nombre1);
                                    AgregarDefensivas(1);
                                    jugada = jugada + ",penalbloqueo";
                                }
                            }
                            $('#tiro').show();
                        }

                    }

                    else if (rand % 4 == 0) {
                        //Jugada defensiva, la unica en esta seccion es el robo de balon.
                        $('#ofensiva').hide();
                        $('#defensiva').show();
                        $('#falta').hide();

                        switch (equipoBalon) {
                            case 1:
                                $('#defensiva').html('Robo de balon de ' + nombre2);
                                equipoBalon = 2;
                                AgregarDefensivas(2);
                                jugada = jugada + ",robo";
                                break;
                            default:
                                $('#defensiva').html('Robo de balon de ' + nombre1);
                                equipoBalon = 1;
                                AgregarDefensivas(1);
                                jugada = jugada + ",robo";
                                break;
                        }


                    }
                    else {//Jugadas ofensivas: tiros, pases, despejes
                        $('#ofensiva').show();
                        $('#defensiva').hide();
                        $('#falta').hide();
                        $('#defensiva').html('Defensiva')

                        var type = rand = Math.floor(Math.random() * 10);

                        if (type <= 3) {
                            //Avance 
                            switch (equipoBalon) {
                                case 1:
                                    $('#ofensiva').html(nombre1 + ' avanza con el balon');
                                    AgregarOfensivas(1);
                                    jugada = jugada + ",avance";
                                    break;
                                case 2:
                                    $('#ofensiva').html(nombre2 + ' avanza con el balon');
                                    AgregarOfensivas(2);
                                    jugada = jugada + ",avance";
                                    break;
                            }
                        }
                        else if (type > 3 && type <= 7) {
                            //pases
                            switch (equipoBalon) {
                                case 1:
                                    $('#ofensiva').html(nombre1 + ' pasa el balon');
                                    AgregarOfensivas(1);
                                    jugada = jugada + ",pase";
                                    break;
                                case 2:
                                    $('#ofensiva').html(nombre2 + ' pasa el balon');
                                    AgregarOfensivas(2);
                                    jugada = jugada + ",pase";
                                    break;
                            }

                        }
                        else {
                            //tiros

                            switch (equipoBalon) {
                                case 1:
                                    $('#ofensiva').html(nombre1 + ' tira para anotar!');
                                    OfensivasTeam1++;
                                    var anotacion = TiroLibre();
                                    if (anotacion) {
                                        $('#tiro').html('GOOOOOOOOOOOOOOL del ' + nombre1);
                                        AgregarGoles(1);
                                        jugada = jugada + ",tiragol";
                                    }
                                    else {

                                        $('#tiro').html('Tiro bloqueado por el ' + nombre2);
                                        AgregarDefensivas(2);
                                        jugada = jugada + ",tirabloqueo";
                                    }
                                    $('#tiro').show();
                                    equipoBalon = 2;
                                    break;
                                default:
                                    $('#ofensiva').html(nombre2 + ' tira para anotar!');
                                    OfensivasTeam2++;
                                    var anotacion = TiroLibre();
                                    if (anotacion) {
                                        $('#tiro').html('GOOOOOOOOOOOOOOL del ' + nombre2);
                                        AgregarGoles(2);
                                        jugada = jugada + ",tiragol";
                                    }
                                    else {
                                        $('#tiro').html('Tiro bloqueado por el ' + nombre1);
                                        AgregarDefensivas(1);
                                        jugada = jugada + ",tirabloqueo";
                                    }
                                    $('#tiro').show();
                                    equipoBalon = 1;
                                    break;
                            }
                        }

                    
                        
                    }
                    jugada = jugada + "," + Math.floor(value).toString();
                    jugadas.push(jugada);
                }
                function AgregarFaltas(num) {
                    switch (num) {
                        case 1:
                            FaltasTeam1++;
                            jugada = jugada + "," + equipo1 + ",Falta";
                            $('#Faltas1').html('Faltas Equipo1 :' + FaltasTeam1.toString());
                            break;
                        default:
                            FaltasTeam2++;
                            jugada = jugada + "," + equipo2 + ",Falta";
                            $('#Faltas2').html('Faltas Equipo2 :' + FaltasTeam2.toString());
                            break;
                    }
                }
                function AgregarGoles(num) {
                    switch (num) {
                        case 1:
                            GolesTeam1++;
                            jugada = jugada + "," + equipo1 + ",Anotacion";
                            $('#Goles1').html(GolesTeam1.toString());
                            break;
                        default:
                            GolesTeam2++;
                            jugada = jugada + "," + equipo2 + ",Anotacion";
                            $('#Goles2').html(GolesTeam2.toString());
                            break;
                    }
                }
                function AgregarOfensivas(num) {
                    switch (num) {
                        case 1:
                            OfensivasTeam1++;
                            jugada = jugada + "," + equipo1 + ",Ofensiva";
                            $('#Ofensivas1').html('Ofensivas Equipo1 :' + OfensivasTeam1.toString());
                            break;
                        default:
                            OfensivasTeam2++;
                            jugada = jugada + "," + equipo2 + ",Ofensiva";
                            $('#Ofensivas2').html('Ofensivas Equipo2 :' + OfensivasTeam2.toString());
                            break;
                    }
                }
                function AgregarDefensivas(num) {
                    switch (num) {
                        case 1:
                            DefensivasTeam1++;
                            jugada = jugada + "," + equipo2 + ",Defensiva";
                            $('#Defensivas1').html('Defensivas Equipo1 :' + DefensivasTeam1.toString());
                            break;
                        default:
                            DefensivasTeam2++;
                            jugada = jugada + "," + equipo2 + ",Defensiva";
                            $('#Defensivas2').html('Defensivas Equipo2 :' + DefensivasTeam2.toString());
                            break;
                    }
                }

                if (equipoBalon == 1)
                    $('#EquipoBalon').html("El " + nombre1 + " tiene el balon");
                else
                    $('#EquipoBalon').html("El " + nombre2 + " tiene el balon");

                $('#stop').click(function () {
                    $('#stop').hide();
                    $('#resume').show();
                    running = false;
                    $('#field').hide(100);
                    $('#tabla').show(100);
                    $('#equipos').hide(100);
                    agregarTabla();
                })
                $('#resume').click(function () {
                    $('#stop').show();
                    $('#resume').hide();
                    $('#tabla').hide(100);
                    $('#field').show(100);
                    $('#equipos').show(100);
                    running = true;
                })

                
                if (loopCount >= loops) {
                    if (GolesTeam1 == GolesTeam2) {
                        loops += 15;
                    }
                    else {
                        clearInterval(interval);
                        var juego = equipo1.toString() + "," + equipo2.toString() + "," + OfensivasTeam1.toString() +
                            "," + OfensivasTeam2.toString() + "," + DefensivasTeam1.toString() + "," + DefensivasTeam2.toString() +
                            "," + FaltasTeam1.toString() + "," + FaltasTeam2.toString() + "," + GolesTeam1.toString() +
                            "," + GolesTeam2.toString();
                        jugadas.push(juego);

                        submitForm(jugadas);
                    }
                }
            }
        });
    };

   
    function agregarTabla() {
        var tbody = $('#tablebody');
        $('#tablebody').html('');
        for (var i = 0; i < jugadas.length; i++) {
            var tr = $('<tr/>').appendTo(tbody);
            var jugada = jugadas[i].split(",");
            for (var j = 0; j < 5; j++) {
                tr.append("<td>" + jugada[j] + "</td>");
            }
        }

    }
    function submitForm(jugadas)
    {
        jQuery.ajax({
            type: "POST",
            url: "/Juego/Jugar",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(jugadas),
            success: function (result) {
                if(result.redirectTo)
                    window.location.href = result.redirectTo;
            },
            failure: function (errMsg) {
                alert(errMsg);
            }
        });
    }

    $.fn.countTo.defaults = {
        from: 0,  // the number the element should start at
        to: 100,  // the number the element should end at
        speed: 1000,  // how long it should take to count between the target numbers
        refreshInterval: 100,  // how often the element should be updated
        decimals: 0,  // the number of decimal places to show
        onUpdate: null,  // callback method for every time the element is updated,
        onComplete: null,  // callback method for when the element finishes updating
    };

    function TiroLibre() {
        var x = 0;
        if (Math.floor(Math.random() * 10) <= 2) { //Metio el gol del tiro libre
            x = 1;
        }
        return x;
    }

})(jQuery);

jQuery(function ($) {
    $('.timer').countTo({
        from: 0,
        to: 89,
        loops: 90,
        loopcount:0,
        refreshInterval: 1000,
        onComplete: function (value) {
            console.debug(this);
        }
    });
});