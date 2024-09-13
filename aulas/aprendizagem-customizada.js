
class Neuronio {

    constructor(numeroEntradas) {
        this.numeroEntradas = numeroEntradas
        this.pesos = [];
        for (let i = 0; i < numeroEntradas; i++) {

            this.pesos.push(Math.random())

        }
        this.bias = Math.random()
        this.taxaAprendizagem = 0.1
    }

    somar(entrada) {
        let somaPonderada = this.bias;

        for (let i = 0; i < this.numeroEntradas; i++) {
            somaPonderada += entrada[i] * this.pesos[i]
        }
        return somaPonderada
    }

    ativacao(somaPonderada) {
        return somaPonderada <= 0 ? 0 : 1
    }

    processar(entrada) {
        let somaPonderada = this.somar(entrada)
        let saida = this.saida = this.ativacao(somaPonderada)
        return saida
    }


    ajustar(erro, entrada) {
        for (let i = 0; i < this.numeroEntradas; i++) {
            this.pesos[i] += erro * entrada[i] * this.taxaAprendizagem
        }
        this.bias += erro * this.taxaAprendizagem
    }


    treinarRede(arrayTreinamento) {
        let ajusteNecessarios = true

        while (ajusteNecessarios) {
            ajusteNecessarios = false

            for (let i = 0; i < arrayTreinamento.length; i++) {
                const entrada = arrayTreinamento[i].entrada
                const resultadoEsperado = arrayTreinamento[i].resultadoEsperado

                const resultadoObtido = this.processar(entrada)

                const erro = resultadoEsperado - resultadoObtido

                if (erro !== 0) {
                    ajusteNecessarios = true
                    this.ajustar(erro, entrada)
                }
            }
        }
    }
}

let treinamento = [
    { entrada: [0, 0, 0], resultadoEsperado: 0 }, // 000 = Limao
    { entrada: [0, 0, 1], resultadoEsperado: 0 }, // 001 = Abacaxi
    { entrada: [0, 1, 0], resultadoEsperado: 0 }, // 010 = Morango
    { entrada: [0, 1, 1], resultadoEsperado: 0 }, // 011 = Kiwi
    { entrada: [1, 0, 0], resultadoEsperado: 1 }, // 100 = Mamão
    { entrada: [1, 0, 1], resultadoEsperado: 1 }, // 101 = Pera
    { entrada: [1, 1, 0], resultadoEsperado: 1 }, // 110 = Melão
    { entrada: [1, 1, 1], resultadoEsperado: 1 }, // 111 = Mirtilo
]


neuronio = new Neuronio(3)
neuronio.treinarRede(treinamento)

let resultadoArray = ["Citrico", "Doce"]

perguntaUsuario = true

while(perguntaUsuario){
    perguntaUsuario = false
    console.log('informe o código da fruta separado por virgula:')

    console.log('Deseja fazer outra pergunta?')
    
}

let resultado = neuronio.processar([0, 1, 1])
console.log('A fruta informada é ' + resultadoArray[resultado])

