const visitados = new Set();

const grafo = {
    "E": ["P1", "P2"],
    "P1": ["E", "S"],
    "P2": ["E"],
    "S": ["P1"]
};

function existeCaminho(grafo, pontoAtual, pontoFinal, visitados){
    if(pontoAtual === pontoFinal){
        return true
    }

    visitados.add(pontoAtual)

    for (let vizinho of grafo[pontoAtual]){
        if(!visitados.has(vizinho)){
            if(existeCaminho(grafo,vizinho,pontoFinal,visitados)){
                return true
            }
        }
    }

    return false

}

const resultado = existeCaminho(grafo, "E", "S", visitados)

if(resultado){
    console.log("Existe um caminho da Entrada (E) até a saída (S).");   
}else{
    console.log("Não existe um caminho da Entrada (E) até a Saída (S).");
}