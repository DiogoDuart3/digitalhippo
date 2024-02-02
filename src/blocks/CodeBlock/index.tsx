import React from 'react'
import { Cell, Grid } from '@faceless-ui/css-grid'

import Code from '@/components/Code'
import { Gutter } from '@/components/Gutter'
import { ReusableContent } from '@/payload-types'



type Props = Extract<ReusableContent['layout'][0], { blockType: 'code' }>

export const CodeBlock: React.FC<Props> = ({ codeFields }) => {
  const {
    code,
    // language
  } = codeFields

  return (
    <Gutter>
      <Grid>
        <Cell
          start={3}
          cols={8}
          startM={2}
          colsM={6}
          startS={1}
          colsS={8}
          className={classes.codeBlock}
        >
          <Code>{`${code}
          `}</Code>
        </Cell>
      </Grid>
    </Gutter>
  )
}
