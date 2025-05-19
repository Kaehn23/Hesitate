"use client";

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
} from "@/app/ui/dialog"
import { WheelOfFortune } from "../WheelOfFortune"

const modalVariants = {
   hidden: {
      opacity: 0,
      scale: 0.8,
      y: 20,
   },
   visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
         type: "spring",
         duration: 0.5,
         bounce: 0.3,
      },
   },
   exit: {
      opacity: 0,
      scale: 0.8,
      y: -20,
      transition: {
         duration: 0.3,
      },
   },
}

const backdropVariants = {
   hidden: { opacity: 0 },
   visible: { opacity: 1 },
   exit: { opacity: 0 },
}

const titleVariants = {
   hidden: { opacity: 0, y: -20 },
   visible: {
      opacity: 1,
      y: 0,
      transition: {
         delay: 0.2,
         duration: 0.3,
      },
   },
   exit: { opacity: 0, y: -20 },
}

const wheelVariants = {
   hidden: {
      opacity: 0,
      scale: 0.9,
      rotate: -10,
   },
   visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
         type: "spring",
         duration: 0.8,
         bounce: 0.4,
      },
   },
   exit: {
      opacity: 0,
      scale: 0.9,
      rotate: 10,
   },
}

const resultVariants = {
   hidden: {
      opacity: 0,
      y: 20,
      scale: 0.9,
   },
   visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
         type: "spring",
         duration: 0.3,
         bounce: 0.2,
      },
   },
   exit: {
      opacity: 0,
      y: -20,
      scale: 0.9,
      transition: {
         duration: 0.2,
      },
   },
}

interface WheelModalProps {
   isOpen: boolean
   onOpenChange: (open: boolean) => void
   items: string[]
   isSpinning: boolean
   selectedItem: string | null
   onSpinEnd: (item: string) => void
   onSpinAgain: () => void
}

export const WheelModal: React.FC<WheelModalProps> = ({
   isOpen,
   onOpenChange,
   items,
   isSpinning,
   selectedItem,
   onSpinEnd,
   onSpinAgain
}) => (
   <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] overflow-hidden">
         <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 bg-black/20 dark:bg-white/20 backdrop-blur-sm"
         />
         <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative"
         >
            <DialogHeader>
               <motion.div variants={titleVariants}>
                  <DialogTitle className="text-center text-xl flex justify-center border-2 border-black dark:border-white rounded-lg font-bold text-black dark:text-white max-w-[60%] md:max-w-[80%] mx-auto">
                     {isSpinning ? (
                        <motion.span
                           animate={{ opacity: [0.5, 1, 0.5] }}
                           transition={{
                              duration: 1.5,
                              repeat: Infinity,
                           }}
                        >
                           Spinning...
                        </motion.span>
                     ) : (
                        "Now, you know"
                     )}
                  </DialogTitle>
               </motion.div>
            </DialogHeader>
            <motion.div className="mt-4" variants={wheelVariants}>
               <WheelOfFortune
                  items={items}
                  onSpinEnd={onSpinEnd}
                  isSpinning={isSpinning}
               />
               <AnimatePresence mode="wait">
                  {selectedItem && !isSpinning && (
                     <motion.div
                        variants={resultVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="mt-4 p-4 rounded-lg glass-effect-input text-center"
                     >
                        <motion.p
                           className="text-lg font-medium bg-black/10 dark:bg-white/10 p-2 rounded-lg text-black dark:text-white"
                           initial={{ scale: 0.9 }}
                           animate={{ scale: 1 }}
                           transition={{
                              type: "spring",
                              stiffness: 200,
                              damping: 10,
                           }}
                        >
                           The wheel has decided: {selectedItem}
                        </motion.p>
                        <motion.button
                           onClick={onSpinAgain}
                           className="mt-4 px-4 py-3 rounded-lg glass-effect-button
                           text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10
                           transition-all duration-200 font-medium border-double border-4 border-black dark:border-white"
                           whileHover={{ scale: 1.02 }}
                           whileTap={{ scale: 0.98 }}
                        >
                           Spin Again
                        </motion.button>
                     </motion.div>
                  )}
               </AnimatePresence>
            </motion.div>
         </motion.div>
      </DialogContent>
   </Dialog>
) 