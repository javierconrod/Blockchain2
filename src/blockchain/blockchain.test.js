import Block from "./block";
import Blockchain from "./blockchain";
describe('Blockchain', () => {
    let blockchain;

    beforeEach(()=>{
        blockchain = new Blockchain();
    });
    it('Toda cadena tendrá un bloque genesis', () =>{
        const [genesisBlock] = blockchain.blocks;

        expect(genesisBlock).toEqual(Block.genesis);
        expect(blockchain.blocks.length).toEqual(1);
    });

    it('Validar que se agregan bloques', ()=>{
        const data = 'd4t4';
        blockchain.addBlock(data);

        const[, lastBlock] = blockchain.blocks;
        expect(lastBlock.data).toEqual(data);
        expect(blockchain.blocks.length).toEqual(2);
    })
});