import trataErros from './erros/funcoesErro.js';
import fs from 'fs';
import { contaPalavras } from './index.js';
import { montaSaidaArquivo } from './helpers.js';

const caminhoArquivo = process.argv;
const link = caminhoArquivo[2];
const endereco = caminhoArquivo[3]

fs.readFile(link, 'utf-8', (erro, texto) => {
    try {
       if (erro)  {
        throw erro;
        return
       }
        
        const resultado = contaPalavras(texto);
        criaESalvaArquivo(resultado, endereco);
        
    } catch (erro) {
        trataErros(erro);
    }
})

async function criaESalvaArquivo(listaPalavras, endereco) {
    const arquivoNovo = `${endereco}/resultado.txt`;
    const textoPalavras = montaSaidaArquivo(listaPalavras);
    try {
        await fs.promises.writeFile(arquivoNovo, textoPalavras);
        console.log('Arquivo criado com sucesso!');
    } catch (erro) {
        throw erro;
    }	
}