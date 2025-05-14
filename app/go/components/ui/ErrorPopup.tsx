import React from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'

const backdropVariants = {
   hidden: { opacity: 0 },
   visible: { opacity: 1 },
   exit: { opacity: 0 },
}

const errorVariants = {
   hidden: { opacity: 0, y: 10, scale: 0.95 },
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
      y: -10,
      scale: 0.95,
      transition: {
         duration: 0.2,
      },
   },
}

interface ErrorPopupProps {
   message: string
   onClose: () => void
   errorRef: React.RefObject<HTMLDivElement | null>
}

export const ErrorPopup: React.FC<ErrorPopupProps> = ({ message, onClose, errorRef }) => (
   <>
      <motion.div
         variants={backdropVariants}
         initial="hidden"
         animate="visible"
         exit="exit"
         className="fixed inset-0 bg-black/50 dark:bg-white/50 backdrop-blur-sm z-40"
         onClick={onClose}
      />
      <motion.div
         ref={errorRef}
         variants={errorVariants}
         initial="hidden"
         animate="visible"
         exit="exit"
         className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
      >
         <div className="px-6 py-4 rounded-lg bg-white dark:bg-gray-900
            text-black dark:text-white border-2 border-red-300 dark:border-red-300
            shadow-lg flex items-center gap-3"
         >
            <span>{message}</span>
            <button
               onClick={onClose}
               className="p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10
               transition-all duration-200"
            >
               <X size={16} className="text-black dark:text-white" />
            </button>
         </div>
      </motion.div>
   </>
) 