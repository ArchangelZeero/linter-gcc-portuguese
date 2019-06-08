"use babel";

describe('The GCC provider for AtomLinter', () => {
  const main = require('../lib/main')
  const utility = require('../lib/utility.js')
  var settings = require("../lib/config").settings

  beforeEach(() => {
    waitsForPromise(() => {
      main.messages = {};
      main.last_linted_files = new Set([]);
      atom.config.set('linter-gcc-portuguese.execPath', '/usr/bin/g++')
      atom.config.set('linter-gcc-portuguese.gccDefaultCFlags', '-c -Wall -o /dev/null')
      atom.config.set('linter-gcc-portuguese.gccDefaultCppFlags', '-c -Wall -std=c++11 -o /dev/null')
      atom.config.set('linter-gcc-portuguese.gccErrorLimit', 15)
      atom.config.set('linter-gcc-portuguese.gccIncludePaths', ' ')
      atom.config.set('linter-gcc-portuguese.gccISystemPaths', ' ')
      atom.config.set('linter-gcc-portuguese.gccSuppressWarnings', true)
      atom.config.set('linter-gcc-portuguese.gccRelintMessageSources', false)
      atom.config.set('linter-gcc-portuguese.gcc7orGreater', false)
      atom.config.set('linter-gcc-portuguese.gccLintOnTheFly', false)
      atom.config.set('linter-gcc-portuguese.gccDebug', false)
      atom.config.set('linter-gcc-portuguese.gccErrorString', 'error')
      atom.config.set('linter-gcc-portuguese.gccWarningString', 'warning')
      atom.config.set('linter-gcc-portuguese.gccNoteString', 'note')
      atom.packages.activatePackage('language-c')
      return atom.packages.activatePackage('linter-gcc-portuguese')
    })
  })

  it('finds one error in error.cpp', () => {
    waitsForPromise(() => {
      filename = __dirname + '/files/error.cpp'
      return atom.workspace.open(filename).then(editor => {
        return main.lint(editor, editor.getPath(), editor.getPath()).then(function() {
          var length = utility.flattenHash(main.messages).length
          expect(length).toEqual(1);
        })
      })
    })
  })

  it('finds no errors in comment.cpp', () => {
    waitsForPromise(() => {
      filename = __dirname + '/files/comment.cpp'
      return atom.workspace.open(filename).then(editor => {
        return main.lint(editor, editor.getPath(), editor.getPath()).then(function() {
          var length = utility.flattenHash(main.messages).length
          expect(length).toEqual(0);
        })
      })
    })
  })

  it('finds one error in error.c', () => {
    waitsForPromise(() => {
      filename = __dirname + '/files/error.c'
      return atom.workspace.open(filename).then(editor => {
        return main.lint(editor, editor.getPath(), editor.getPath()).then(function() {
          var length = utility.flattenHash(main.messages).length
          expect(length).toEqual(1);
        })
      })
    })
  })

  it('finds no errors in comment.c', () => {
    waitsForPromise(() => {
      filename = __dirname + '/files/comment.c'
      return atom.workspace.open(filename).then(editor => {
        return main.lint(editor, editor.getPath(), editor.getPath()).then(function() {
          var length = utility.flattenHash(main.messages).length
          expect(length).toEqual(0);
        })
      })
    })
  })
})
