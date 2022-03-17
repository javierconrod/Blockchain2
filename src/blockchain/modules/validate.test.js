import Blockchain from '../blockchain';
import validate from './validate';

describe('validate()', () => {
    let blockchain;

    beforeEach(() =>{
        blockchain = new Blockchain();
    });

    it('Validar cadena valida', () => {
        blockchain.addBlock('transact0');
        blockchain.addBlock('transact1');

        expect(validate(blockchain.blocks)),toBe(true);

    });

    it('Invalidar la cadena con un genesis block corrupto', () => {
        blockchain.blocks[0].data = 'h4ck-data';

        expect(() =>{
            validate(blockchain.blocks);
        }).toThrowError('Bloque Genesis invalido');
    });

    it('Invalidar cadena con previousHash corrupto en un bloque', ()=> {
        blockchain.addBlock('transact2');
        blockchain.blocks[1].previousHash = 'h4ck-previousHash';

        expect(() =>{
            validate(blockchain.blocks);
        }).toThrowError('El Previous Hash es invalido');
    });

    it('Invalidar cadena con Hash corrupto en un bloque', ()=> {
        blockchain.addBlock('transact3');
        blockchain.blocks[1].hash = 'h4ck-Hash';

        expect(() =>{
            validate(blockchain.blocks);
        }).toThrowError('Hash invalido');
    });

});