import Blockchain from '../blockchain';
import validate from './validate';

describe('validate()', () => {
    let blockchain;

    beforeEach(() =>{
        blockchain = new Blockchain();
    });

    it('Validar cadena valida', () => {
        blockchain.addBlock('bl0ck-1');
        blockchain.addBlock('bl0ck-2');

        expect(validate(blockchain.blocks)),toBe(true);

    });

    it('Invalidar la cadena con un genesis block corrupto', () => {
        blockchain.blocks[0].data = 'h4ck-data';

        expect(() =>{
            validate(blockchain.blocks);
        }).toThrowError('Genesis block invalido');
    });

    it('Invalidar cadena con previousHash corrupto en un bloque', ()=> {
        blockchain.addBlock('bl0ck-1');
        blockchain.blocks[1].previousHash = 'h4ck-previousHash';

        expect(() =>{
            validate(blockchain.blocks);
        }).toThrowError('PreviousHash block invalido');
    });

    it('Invalidar cadena con Hash corrupto en un bloque', ()=> {
        blockchain.addBlock('bl0ck-1');
        blockchain.blocks[1].hash = 'h4ck-Hash';

        expect(() =>{
            validate(blockchain.blocks);
        }).toThrowError('Hash invalido');
    });

});