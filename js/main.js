var api = {
  url: 'http://examen-laboratoria-sprint-5.herokuapp.com/topics/'
};

var $topicList = $("#topic-list");


var cargarPagina = function () {
  cargarTemas();
  $("#add-form").submit(agregarTema);
  $("#search-form").submit(filtrarTemas);
  
    
  //$(document).on("click",".eliminar", borrarTarea);
  //$(document).on("click", ".editar",editarTarea);
};
var cargarTemas = function () {
  $.getJSON(api.url, function (temas) {
    $topicList.html("");
    temas.forEach(crearTema);
  });
}
var crearTema = function (tema) {
    var nombreAutor = tema.author_name;
    var contenido = tema.content;
    var numRespuestas = tema.responses_count;
    var identificador = tema.id;
   
    remplazar(nombreAutor,contenido,numRespuestas);
    }
    var plantillaBd='<tr class=" ">' +
                        '<td>__nombreAutor__</td>' +
                        '<td>__contenido__</td>' +
                        '<td>__numRespuestas__</td>'+
                    '</tr>';
    
    var remplazar = function(nombreAutor,contenido,numRespuestas){
       var presentar = plantillaBd.replace('__nombreAutor__',nombreAutor).replace('__contenido__',contenido).replace('__numRespuestas__',numRespuestas);
       $topicList.append(presentar);
       //console.log(presentar);
    }
    var agregarTema = function (e) {   
      e.preventDefault();
      var autor = $("#nombre-autor").val();
      var contenido = $("#contenido").val();
      var respuestas = $("#respuestas").val();
      $.post(api.url, {
        author_name: autor,
        content:contenido,
        responses_count:respuestas
      }, function (tema) {
        crearTema(tema);
        $("#myModal").modal("hide");
          //crearTema(response);
          
      });
    };

//Codigo para filtrar
var filtrarTemas = function (e) {
	e.preventDefault();
	var criterioBusqueda = $("#buscarTema").val().toLowerCase();
    		$.getJSON(url_api, function (temas) {
    	    var temasFiltrados = temas.filter(function(tema){
                return tema.content.toLowerCase().indexOf(criterioBusqueda) >= 0;
    		});
	});
	   crearTema(temasFiltrados);
};



$(document).ready(cargarPagina);