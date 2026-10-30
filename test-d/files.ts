import {x} from 'xastscript'
import type {Root} from 'xast'
import {expectType} from 'tsd'

expectType<Root>(x())
