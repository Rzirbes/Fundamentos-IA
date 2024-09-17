class RedeNeural {
    constructor(tamanhoEntrada, tamanhoOculto, tamanhoSaida) {
        this.tamanhoEntrada = tamanhoEntrada;
        this.tamanhoOculto = tamanhoOculto;
        this.tamanhoSaida = tamanhoSaida;

        this.pesosEntradaOculto = this.#inicializarPesos(tamanhoEntrada, tamanhoOculto);
        this.pesosOcultoSaida = this.#inicializarPesos(tamanhoOculto, tamanhoSaida);
    }

    // Método privado para inicializar pesos
    #inicializarPesos(linhas, colunas) {
        return Array.from({ length: linhas }, () =>
            Array.from({ length: colunas }, () => Math.random() * 2 - 1)
        );
    }

    // Função de ativação sigmoide e sua derivada
    #sigmoide(x) {
        return 1 / (1 + Math.exp(-x));
    }

    #derivadaSigmoide(x) {
        return x * (1 - x);
    }

    // Método para propagação da entrada na rede
    feedforward(entrada) {
        const saidaOculta = this.#ativacaoOculta(entrada);
        const saidaFinal = this.#ativacaoSaida(saidaOculta);
        return saidaFinal.map((valor) => (valor));
    }

    #ativacaoOculta(entrada) {
        const entradaAchada = this.#achatar(entrada);
        return this.#multiplicarMatriz(entradaAchada, this.pesosEntradaOculto).map(this.#sigmoide);
    }

    #ativacaoSaida(saidaOculta) {
        return this.#multiplicarMatriz(saidaOculta, this.pesosOcultoSaida).map(this.#sigmoide);
    }

    // Função para treinar a rede
    treinar(entradaMatriz, saidaEsperada, taxaAprendizagem) {
        const entrada = this.#achatar(entradaMatriz);
        const saidaOculta = this.#ativacaoOculta(entradaMatriz);
        const saidaFinal = this.#ativacaoSaida(saidaOculta);

        this.#ajustarPesos(entrada, saidaOculta, saidaFinal, saidaEsperada, taxaAprendizagem);
    }

    #ajustarPesos(entrada, saidaOculta, saidaFinal, saidaEsperada, taxaAprendizagem) {
        const erroSaida = this.#calcularErro(saidaEsperada, saidaFinal);
        const ajustesSaida = erroSaida.map((erro, i) => erro * this.#derivadaSigmoide(saidaFinal[i]));

        this.#ajustarPesosOcultoSaida(ajustesSaida, saidaOculta, taxaAprendizagem);
        const erroOculto = this.#calcularErroOculto(ajustesSaida);
        const ajustesOculto = erroOculto.map((erro, i) => erro * this.#derivadaSigmoide(saidaOculta[i]));

        this.#ajustarPesosEntradaOculto(ajustesOculto, entrada, taxaAprendizagem);
    }

    #calcularErro(saidaEsperada, saidaFinal) {
        return saidaEsperada.map((esperada, i) => esperada - saidaFinal[i]);
    }

    #ajustarPesosOcultoSaida(ajustesSaida, saidaOculta, taxaAprendizagem) {
        for (let i = 0; i < this.pesosOcultoSaida.length; i++) {
            for (let j = 0; j < this.pesosOcultoSaida[i].length; j++) {
                this.pesosOcultoSaida[i][j] += taxaAprendizagem * ajustesSaida[j] * saidaOculta[i];
            }
        }
    }

    #calcularErroOculto(ajustesSaida) {
        return this.pesosEntradaOculto[0].map((_, i) =>
            ajustesSaida.reduce((erro, ajuste, j) => erro + ajuste * this.pesosOcultoSaida[i][j], 0)
        );
    }

    #ajustarPesosEntradaOculto(ajustesOculto, entrada, taxaAprendizagem) {
        for (let i = 0; i < this.pesosEntradaOculto.length; i++) {
            for (let j = 0; j < this.pesosEntradaOculto[i].length; j++) {
                this.pesosEntradaOculto[i][j] += taxaAprendizagem * ajustesOculto[j] * entrada[i];
            }
        }
    }

    // Função de classificação
    classificar(entradaMatriz) {
        const saida = this.feedforward(entradaMatriz);
        const numero = saida.indexOf(Math.max(...saida));
        return `Número ${numero}`;
    }

    // Funções utilitárias
    #multiplicarMatriz(vetor, matriz) {
        return matriz[0].map((_, j) => vetor.reduce((soma, v, i) => soma + v * matriz[i][j], 0));
    }

    #achatar(matriz) {
        return matriz.flat();
    }
}

// Exemplo de uso da rede neural
let rede = new RedeNeural(48, 96, 10);

let treinamento = [
    {
        entrada: [
            [0, 0, 1, 1, 1, 0],
            [0, 1, 0, 0, 0, 1],
            [0, 1, 0, 0, 0, 1],
            [0, 1, 0, 0, 0, 1],
            [0, 1, 0, 0, 0, 1],
            [0, 1, 0, 0, 0, 1],
            [0, 1, 0, 0, 0, 1],
            [0, 0, 1, 1, 1, 0]
        ], saida: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },  // Número 0

    {
        entrada: [
            [0, 0, 0, 1, 0, 0],
            [0, 0, 1, 1, 0, 0],
            [0, 1, 0, 1, 0, 0],
            [1, 0, 0, 1, 0, 0],
            [0, 0, 0, 1, 0, 0],
            [0, 0, 0, 1, 0, 0],
            [0, 0, 0, 1, 0, 0],
            [0, 0, 0, 1, 0, 0]
        ], saida: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0]
    },  // Número 1

    {
        entrada: [
            [1, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 1]
        ], saida: [0, 0, 1, 0, 0, 0, 0, 0, 0, 0]
    },  // Número 2

    {
        entrada: [
            [1, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1]
        ], saida: [0, 0, 0, 1, 0, 0, 0, 0, 0, 0]
    },  // Número 3

    {
        entrada: [
            [1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 1]
        ], saida: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0]
    },  // Número 4

    {
        entrada: [
            [1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1]
        ], saida: [0, 0, 0, 0, 0, 1, 0, 0, 0, 0]
    },  // Número 5

    {
        entrada: [
            [1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1]
        ], saida: [0, 0, 0, 0, 0, 0, 1, 0, 0, 0]
    },  // Número 6

    {
        entrada: [
            [1, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 1, 0],
            [0, 0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0, 0],
            [0, 1, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0]
        ], saida: [0, 0, 0, 0, 0, 0, 0, 1, 0, 0]
    },  // Número 7

    {
        entrada: [
            [1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1]
        ], saida: [0, 0, 0, 0, 0, 0, 0, 0, 1, 0]
    },  // Número 8

    {
        entrada: [
            [1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1]
        ], saida: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
    }   // Número 9
];

// Treinando a rede
for (let i = 0; i < 1000; i++) {
    for (let dados of treinamento) {
        rede.treinar(dados.entrada, dados.saida, 0.1);
    }
}

// Testando a rede
console.log(rede.classificar([
    [0, 0, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 1],
    [0, 1, 0, 0, 0, 1],
    [0, 1, 0, 0, 0, 1],
    [0, 1, 0, 0, 0, 1],
    [0, 1, 0, 0, 0, 1],
    [0, 1, 0, 0, 0, 1],
    [0, 0, 1, 1, 1, 0]
]));

console.log(rede.classificar([
    [1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1]
]));

console.log(rede.classificar([
    [1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 1, 0],
    [0, 0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0]
]));
