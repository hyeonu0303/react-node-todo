import { Grid, GridItem,Box } from '@chakra-ui/react'
import { extendTheme } from "@chakra-ui/react";



const Practice = () => {

  return(
    <div>
      <Grid
        templateAreas={`"header header"
                        "nav main"
                        "nav footer"`}
        gridTemplateRows={'40px 100% 1fr 30px'}
        gridTemplateColumns={'130px 1fr'}
        h='500px'
        gap='1'
        color='blackAlpha.700'
        fontWeight='bold'
      >
        <GridItem pl='2' bg='orange.300' area={'header'}>
          Header
        </GridItem>
        <GridItem pl='2' bg='pink.300' area={'nav'}>
          Nav
        </GridItem>
        <GridItem pl='2' bg='green.300' area={'main'}>
          Main
        </GridItem>
        <GridItem pl='2' bg='blue.300' area={'footer'}>
          Footer
        </GridItem>
      </Grid>
    </div>
    
  )
}

export default Practice;