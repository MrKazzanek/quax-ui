(function(Scratch) {
  'use strict';

  class NowaLiniaExtension {
    getInfo() {
      return {
        id: 'nowaLinia',
        name: 'Nowa linia',
        blocks: [
          {
            opcode: 'newline',
            blockType: Scratch.BlockType.REPORTER,
            text: 'nowa linia',
          }
        ]
      };
    }

    newline() {
      return '\n';
    }
  }

  Scratch.extensions.register(new NowaLiniaExtension());
})(Scratch);
