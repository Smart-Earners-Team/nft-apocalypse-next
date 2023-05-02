// import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import { GlobalTypes } from '../globals'
import { store } from '../app/store'
// import { Provider } from 'react-redux'

export const AppWrapper = ( {children, className }:GlobalTypes ) => {
  return (
    // <ChakraProvider theme={{}}>
        // <Provider store={store}>
          <div className={className}>
            {children}
          </div>
        // </Provider>
    // </ChakraProvider>
  )
}
