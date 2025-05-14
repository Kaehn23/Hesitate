import React from 'react'
import { motion } from 'framer-motion'

interface ActionButtonsProps {
   onAddMore: () => void
   onMagic: () => void
   onReset: () => void
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
   onAddMore,
   onMagic,
   onReset
}) => (
   <motion.div
      className="flex flex-col gap-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
   >
      <motion.button
         type="button"
         onClick={onAddMore}
         className="w-3/4 mx-auto px-4 py-2 rounded-lg glass-effect-button
         text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10
         transition-all duration-200 font-medium border-2 border-black dark:border-white"
         whileHover={{ scale: 1.02 }}
         whileTap={{ scale: 0.98 }}
      >
         Add more
      </motion.button>
      <motion.button
         type="button"
         onClick={onMagic}
         className="flex-1 px-4 py-3 rounded-lg glass-effect-button
         text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10
         transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed border-double border-4 border-green-400 dark:border-green-300"
         whileHover={{ scale: 1.02 }}
         whileTap={{ scale: 0.98 }}
      >
         RNGesus
      </motion.button>
      <motion.button
         onClick={onReset}
         className="flex-1 px-4 py-3 rounded-lg glass-effect-button p-4 m-2
         text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10
         transition-all duration-200 font-medium  border-2 border-red-400 dark:border-red-300 disabled:opacity-50 disabled:cursor-not-allowed"
         whileHover={{ scale: 1.02 }}
         whileTap={{ scale: 0.98 }}
      >
         Reset the list
      </motion.button>
   </motion.div>
) 