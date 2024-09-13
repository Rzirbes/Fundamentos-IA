let treinamento = [
    [0, 0, 0, 0], // 000 = Limao
    [0, 0, 1, 0], // 001 = Abacaxi
    [0, 1, 0, 0], // 010 = Morango
    [0, 1, 1, 0], // 011 = Kiwi
    [1, 0, 0, 1], // 100 = Mamão
    [1, 0, 1, 1], // 101 = Pera
    [1, 1, 0, 1], // 110 = Melão
    [1, 1, 1, 1], // 111 = Mirtilo
]

let p1 = -1, p2 = -1, p3 = -1; // Inicializando os pesos para 3 entradas
let soma, ajustes = 0, qtdeAjustesTotais = 0, repeticoes = 0;

do {
    ajustes = 0;

    // Percorre todo o conjunto de treinamento
    for (let i = 0; i < treinamento.length; i++) {
        let entrada1 = treinamento[i][0];
        let entrada2 = treinamento[i][1];
        let entrada3 = treinamento[i][2];
        let resultadoEsperado = treinamento[i][3];

        verificarSeNecessitaAjuste(entrada1, entrada2, entrada3, resultadoEsperado);
    }

    repeticoes++;

} while (ajustes != 0);

console.log(`\nAjustes totais: ${qtdeAjustesTotais}, Repetições: ${repeticoes}\n`);
console.log("Peso 1: " + p1);
console.log("Peso 2: " + p2);
console.log("Peso 3: " + p3 + "\n");

function somar(x1, x2, x3) {
    return (x1 * p1) + (x2 * p2) + (x3 * p3);
}

function transferencia(soma) {
    return soma <= 0 ? 0 : 1; // Função de transferência que retorna 0 ou 1
}

function ajustar(entrada1, entrada2, entrada3, resultadoEsperado, resultadoObtido) {
    let erro = resultadoEsperado - resultadoObtido;
    p1 = p1 + erro * entrada1;
    p2 = p2 + erro * entrada2;
    p3 = p3 + erro * entrada3;
}

function verificarSeNecessitaAjuste(entrada1, entrada2, entrada3, resultadoEsperado) {
    soma = somar(entrada1, entrada2, entrada3);
    let y = transferencia(soma);
    if (y != resultadoEsperado) {
        ajustar(entrada1, entrada2, entrada3, resultadoEsperado, y);
        ajustes++; 
        qtdeAjustesTotais++; 
    }
}
