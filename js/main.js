$(function(){
    $("#botao").click(inserirTarefa);

    $("select").formSelect();
});

function inserirTarefa(){
    var tabela = $(".tarefas").find("tbody");
    var campoTitulo = $(".campoTitulo").val();
    var campoObs = $(".campoObs").val();
    var campoPrioridade = $(".campoPrioridade").val();

    //Verficar se os campos estão vazios
    if (campoTitulo.trim() == "" || campoObs.trim() == "") {
        alert("Preencha o título e as observações antes de cadastrar a tarefa.");
        return;
    }

    var linha = funLinha(campoTitulo, campoObs, campoPrioridade);
    linha.find(".botaoDeletar").click(deletaLinha);
    tabela.append(linha);

    // Estes comandos limpam os campos e devolvem o foco ao tiulo
    $(".campoTitulo").val("");
    $(".campoObs").val("");
    $(".campoTitulo").focus();
}

function funLinha(campoTitulo, campoObs, campoPrioridade){ // função com parametro.
    var linha = $("<tr>");
    var colunaTarefa = $("<td>").text(campoTitulo);
    var colunaObs = $("<td>").text(campoObs);
    var colunaPrioridade = $("<td>").text(campoPrioridade);
    var colunaStatus = $("<td>");
    var marcarConcluida = $("<input type='checkbox'>").css({
        display: "inline-block",
        opacity: "1",
        position: "static",
        pointerEvents: "auto"
    });
    colunaStatus.append(marcarConcluida);
    marcarConcluida.change(function(){
        if ($(this).is(":checked")) {
            colunaTarefa.css("text-decoration", "line-through");
        } else {
            colunaTarefa.css("text-decoration", "none");
        }
    });
    var colunaDelete = $("<td>");

    var bDeletar = $("<a>").addClass("botaoDeletar").attr("href","#");
    var icone = $("<i>").addClass("material-icons").text("delete");
    bDeletar.append(icone)
    colunaDelete.append(bDeletar);

    linha.append(colunaTarefa); // anexa mais código.
    linha.append(colunaObs);
    linha.append(colunaPrioridade);
    linha.append(colunaStatus);
    linha.append(colunaDelete);

    return linha

}

function deletaLinha(){
    event.preventDefault(); //tira o padrão
    $(this).parent().parent().remove();
}