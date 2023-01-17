import fs from 'node:fs/promises'
import path from 'node:path'
import acornJsx from 'acorn-jsx'
import {fromJs} from 'esast-util-from-js'
import {toJs} from 'estree-util-to-js'
import {buildJsx} from 'estree-util-build-jsx'

const doc = String(await fs.readFile(path.join('test', 'jsx.jsx')))

await fs.writeFile(
  path.join('test', 'jsx-build-jsx-classic.js'),
  toJs(
    buildJsx(
      fromJs(doc.replace(/'name'/, "'jsx (estree-util-build-jsx, classic)'"), {
        plugins: [acornJsx()],
        module: true
      }),
      {pragma: 'x', pragmaFrag: 'null'}
    )
  ).value
)

await fs.writeFile(
  path.join('test', 'jsx-build-jsx-automatic.js'),
  toJs(
    buildJsx(
      fromJs(
        doc.replace(/'name'/, "'jsx (estree-util-build-jsx, automatic)'"),
        {plugins: [acornJsx()], module: true}
      ),
      {runtime: 'automatic', importSource: 'xastscript'}
    )
  ).value
)

await fs.writeFile(
  path.join('test', 'jsx-build-jsx-automatic-development.js'),
  toJs(
    buildJsx(
      fromJs(
        doc.replace(
          /'name'/,
          "'jsx (estree-util-build-jsx, automatic, development)'"
        ),
        {plugins: [acornJsx()], module: true}
      ),
      {runtime: 'automatic', importSource: 'xastscript', development: true}
    )
  ).value
)
