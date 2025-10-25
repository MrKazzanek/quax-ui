(function(Scratch) {
  'use strict';

  const keyStates = {};
  const listeners = {};

  // Nasłuchiwanie klawiszy
  document.addEventListener('keydown', e => {
    keyStates[e.key] = true;

    // 🔒 Zablokowanie domyślnego działania klawiszy funkcyjnych
    const blockedKeys = [
      'F1','F2','F3','F4','F5','F6','F7','F8','F9','F10','F11','F12',
      'Tab','CapsLock','Escape','PageUp','PageDown','Home','End',
      'Insert','Delete','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'
    ];
    if (blockedKeys.includes(e.key)) {
      e.preventDefault();
      e.stopPropagation();
    }

    // Uruchomienie eventów zarejestrowanych dla danego klawisza
    if (listeners[e.key]) {
      for (const fn of listeners[e.key]) fn();
    }
  }, true);

  document.addEventListener('keyup', e => {
    keyStates[e.key] = false;
  }, true);

  class KeyboardPlus {
    getInfo() {
      return {
        id: 'keyboardPlus',
        name: 'Keyboard Plus',
        color1: '#0078D7',
        color2: '#005A9E',
        blocks: [
          {
            opcode: 'whenKeyPressed',
            blockType: Scratch.BlockType.HAT,
            text: 'kiedy klawisz [KEY] kliknięty',
            arguments: {
              KEY: {
                type: Scratch.ArgumentType.STRING,
                menu: 'keys'
              }
            }
          },
          {
            opcode: 'isKeyPressed',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'klawisz [KEY] naciśnięty?',
            arguments: {
              KEY: {
                type: Scratch.ArgumentType.STRING,
                menu: 'keys'
              }
            }
          }
        ],
        menus: {
          keys: {
            acceptReporters: true,
            items: [
              'F1','F2','F3','F4','F5','F6','F7','F8','F9','F10','F11','F12',
              'Insert','Delete','Home','End','PageUp','PageDown',
              'CapsLock','Tab','Escape','Control','Alt','Shift',
              'ArrowUp','ArrowDown','ArrowLeft','ArrowRight',
              'Enter','Backspace',' '
            ]
          }
        }
      };
    }

    whenKeyPressed(args) {
      const key = args.KEY;
      if (!listeners[key]) listeners[key] = [];
      return new Promise(resolve => {
        listeners[key].push(resolve);
      });
    }

    isKeyPressed(args) {
      const key = args.KEY;
      return !!keyStates[key];
    }
  }

  Scratch.extensions.register(new KeyboardPlus());
})(Scratch);
