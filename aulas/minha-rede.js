let x11 = 0, x12 = 0, resultado1 = 0
let x21 = 0, x22 = 1, resultado2 = 0
let x31 = 1, x32 = 0, resultado3 = 1
let x41 = 1, x42 = 1, resultado4 = 1

let p1 = -1, p2 = -1

let soma, ajustes = 0, qtdeAjustesTotais = 0, repeticoes = 0



do {
    ajustes = 0

    verificarSeNecessitaAjuste(x11, x12, resultado1)
    verificarSeNecessitaAjuste(x21, x22, resultado2)
    verificarSeNecessitaAjuste(x31, x32, resultado3)
    verificarSeNecessitaAjuste(x41, x42, resultado4)

    repeticoes++ 

} while (ajustes != 0)

console.log(`\nAjustes totais: ${qtdeAjustesTotais}, Repetições: ${repeticoes}\n`)
console.log("Peso 1: " + p1)
console.log("Peso 2: " + p2 +"\n")

function somar(x1, x2) {
    return (x1 * p1) + (x2 * p2)
}

function transferencia(soma) {
    if(soma < 0 ){
        return 0
    }
    if(soma > 1 ){
        return 1
    }
    return soma
}

function ajustar(entrada1, entrada2, resultadoEsperado, resultadoObtido) {
    p1 = p1 + (resultadoEsperado - resultadoObtido) * entrada1
    p2 = p2 + (resultadoEsperado - resultadoObtido) * entrada2
}

function verificarSeNecessitaAjuste(entrada1, entrada2, resultadoEsperado) {
    soma = somar(entrada1, entrada2)
    let y = transferencia(soma)
    if (y != resultadoEsperado) {
        ajustar(entrada1, entrada2, resultadoEsperado, y)
        ajustes++ 
        qtdeAjustesTotais++ 
    }
}
