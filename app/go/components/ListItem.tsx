import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface ListItemProps {
   value: string
   index: number
   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
   onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
   onDelete: () => void
   error?: string
   inputRef: (el: HTMLInputElement | null) => void
   canDelete: boolean
}

export const ListItem: React.FC<ListItemProps> = ({
   value,
   index,
   onChange,
   onKeyDown,
   onDelete,
   error,
   inputRef,
   canDelete
}) => (
   <motion.li
      className="relative group"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
   >
      <div className="relative">
         <motion.input
            ref={inputRef}
            type="text"
            placeholder={`Thing number ${index + 1}`}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            className={`w-full px-4 py-3 rounded-lg glass-effect-input 
               text-black dark:text-white placeholder:text-black/50 dark:placeholder:text-white/50
               focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20
               transition-all duration-200 pr-10  border-black dark:border-gray-500 border-1
               ${error ? "ring-2 ring-red-500 dark:ring-red-400" : ""}`}
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
         />
         {canDelete && (
            <motion.button
               onClick={onDelete}
               className="absolute right-2 top-1/2 -translate-y-1/2
                  p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10
                  transition-all duration-200 opacity-0 group-hover:opacity-100
                  focus:opacity-100 focus:outline-none"
               aria-label="Delete item"
               whileHover={{ scale: 1.1 }}
               whileTap={{ scale: 0.9 }}
            >
               <X size={16} className="text-black dark:text-white" />
            </motion.button>
         )}
      </div>
      <AnimatePresence>
         {error && (
            <motion.p
               initial={{ opacity: 0, y: -10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               className="mt-1 text-sm text-red-500 dark:text-red-400"
            >
               {error}
            </motion.p>
         )}
      </AnimatePresence>
   </motion.li>
) 