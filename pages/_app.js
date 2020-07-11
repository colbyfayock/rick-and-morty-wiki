import React from 'react'
import App, { Container } from 'next/app'
import { AnimatePresence, motion } from 'framer-motion'

const pageVariants = {
  pageInitial: {
    backgroundColor: 'black',
    filter: `invert()`,
    opacity: 0
  },
  pageAnimate: {
    backgroundColor: 'transparent',
    filter: ``,
    opacity: 1
  },
  pageExit: {
    backgroundColor: 'black',
    filter: `invert()`,
    opacity: 0
  }
}

const pageMotionProps = {
  initial: 'pageInitial',
  animate: 'pageAnimate',
  exit: 'pageExit',
  variants: pageVariants
}

export default class MyApp extends App {
  render () {
    const { Component, pageProps, router } = this.props
    return (
      <AnimatePresence exitBeforeEnter>
        <motion.div key={router.route}  {...pageMotionProps}>
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    )
  }
}