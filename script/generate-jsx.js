import fs from 'node:fs'
import path from 'node:path'
import babel from '@babel/core'
import {Parser} from 'acorn'
import acornJsx from 'acorn-jsx'
import {toJs} from 'estree-util-to-js'
import {buildJsx} from 'estree-util-build-jsx'

const doc = String(fs.readFileSync(path.join('test', 'jsx.jsx')))

fs.writeFileSync(
  path.join('test', 'jsx-build-jsx-classic.js'),
  toJs(
    // @ts-expect-error it’s a program.
    buildJsx(
      // @ts-expect-error Acorn nodes are assignable to ESTree nodes.
      Parser.extend(acornJsx()).parse(
        doc.replace(/'name'/, "'jsx (estree-util-build-jsx, classic)'"),
        // Note: different npms resolve this differently, so it may break or work, hence the ignore.
        // @ts-ignore Hush, `2021` is fine.
        {sourceType: 'module', ecmaVersion: 2021}
      ),
      {pragma: 'x', pragmaFrag: 'null'}
    )
    // @ts-expect-error Some bug in `to-js`
  ).value
)

fs.writeFileSync(
  path.join('test', 'jsx-build-jsx-automatic.js'),
  toJs(
    // @ts-expect-error it’s a program.
    buildJsx(
      // @ts-expect-error Acorn nodes are assignable to ESTree nodes.
      Parser.extend(acornJsx()).parse(
        doc.replace(/'name'/, "'jsx (estree-util-build-jsx, automatic)'"),
        // Note: different npms resolve this differently, so it may break or work, hence the ignore.
        // @ts-ignore Hush, `2021` is fine.
        {sourceType: 'module', ecmaVersion: 2021}
      ),
      {runtime: 'automatic', importSource: 'xastscript'}
    )
    // @ts-expect-error Some bug in `to-js`
  ).value
)

fs.writeFileSync(
  path.join('test', 'jsx-build-jsx-automatic-development.js'),
  toJs(
    // @ts-expect-error it’s a program.
    buildJsx(
      // @ts-expect-error Acorn nodes are assignable to ESTree nodes.
      Parser.extend(acornJsx()).parse(
        doc.replace(/'name'/, "'jsx (estree-util-build-jsx, automatic)'"),
        {sourceType: 'module', ecmaVersion: 2021}
      ),
      {runtime: 'automatic', importSource: 'xastscript', development: true}
    )
    // @ts-expect-error Some bug in `to-js`
  ).value
)

fs.writeFileSync(
  path.join('test', 'jsx-babel-classic.js'),
  // @ts-expect-error Result always given.
  babel.transform(doc.replace(/'name'/, "'jsx (babel, classic)'"), {
    plugins: [
      ['@babel/plugin-transform-react-jsx', {pragma: 'x', pragmaFrag: 'null'}]
    ]
  }).code
)

fs.writeFileSync(
  path.join('test', 'jsx-babel-automatic.js'),
  // @ts-expect-error Result always given.
  babel.transformSync(doc.replace(/'name'/, "'jsx (babel, automatic)'"), {
    plugins: [
      [
        '@babel/plugin-transform-react-jsx',
        {runtime: 'automatic', importSource: 'xastscript'}
      ]
    ]
  }).code
)

fs.writeFileSync(
  path.join('test', 'jsx-babel-automatic-development.js'),
  // @ts-expect-error Result always given.
  babel.transformSync(doc.replace(/'name'/, "'jsx (babel, automatic)'"), {
    plugins: [
      [
        '@babel/plugin-transform-react-jsx',
        {runtime: 'automatic', importSource: 'xastscript', development: true}
      ]
    ]
  }).code
)
