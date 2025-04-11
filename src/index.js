import trataErros from './erros/funcoesErro.js';
import fs from 'fs';
const caminhoArquivo = process.argv;
const link = caminhoArquivo[2];

fs.readFile(link, 'utf-8', (erro, texto) => {
    try {
       if (erro)  {
        throw erro;
        return
       }
        
        contaPalavras(texto);
        
    } catch (erro) {
        trataErros(erro);
    }
})

function contaPalavras(texto) {
    const paragrafos = extraiParagrafos(texto);
    // Aprimoramento do código abaixo
    // https://cursos.alura.com.br/course/javascript-node-js-criando-primeira-biblioteca/task/155804
    const contagem = paragrafos.flatMap((paragrafo) => {
        if (!paragrafo.trim()) return []; 
        return verificaPalavrasDuplicadas(paragrafo);
        
    });
    
    /*
    const contagem = paragrafos
        .filter((paragrafo) => paragrafo.trim())
        .map((paragrafo) => {
        return verificaPalavrasDuplicadas(paragrafo);
    })
    */
    console.log(contagem);

}

function extraiParagrafos(texto) {
    return texto.toLowerCase().split('\n');

}

function limpaPalavras(palavra) {
    return palavra.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
}

function verificaPalavrasDuplicadas(texto) {
    const listaPalavras = texto.split(' ');
    const resultado = {};
    listaPalavras.forEach(palavra => {
        if (palavra.length >= 3) {
            const palavraLimpa = limpaPalavras(palavra);
            resultado[palavraLimpa] = (resultado[palavraLimpa] || 0) + 1
        }
    });
    return resultado;
}


