import React from 'react'

const empContext = React.createContext()

const empProvider = empContext.Provider
const empConsumer = empContext.Consumer

export {empConsumer, empProvider}