(function (Scratch) {
  'use strict';

  // Pomocnicze funkcje
  function getWords(text) {
    if (!text) return [];
    // Rozdziel po spacji lub znakach interpunkcyjnych, usuń puste
    return text.trim().split(/\s+/).filter(w => w.length > 0);
  }

  class WordsExtension {
    getInfo() {
      return {
        id: 'wordsExtension',
        name: 'Słowa',
        color1: '#3c87c9',
        color2: '#2c6aa3',
        blocks: [
          {
            opcode: 'countWords',
            blockType: Scratch.BlockType.REPORTER,
            text: 'ilość słów w [TEXT]',
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Siema jestem Kazanek'
              }
            }
          },
          {
            opcode: 'getWordByNumber',
            blockType: Scratch.BlockType.REPORTER,
            text: 'słowo [NUMBER] z [TEXT]',
            arguments: {
              NUMBER: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              },
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Siema jestem Kazanek'
              }
            }
          }
        ]
      };
    }

    countWords(args) {
      const words = getWords(args.TEXT);
      return words.length;
    }

    getWordByNumber(args) {
      const words = getWords(args.TEXT);
      const index = Math.floor(args.NUMBER) - 1; // Scratch liczy od 1
      if (index < 0 || index >= words.length) return '';
      return words[index];
    }
  }

  Scratch.extensions.register(new WordsExtension());
})(Scratch);
