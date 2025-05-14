"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import DOMPurify from "dompurify";
import { ErrorPopup } from "./ui/ErrorPopup";
import { ListItem } from "./ListItem";
import { WheelModal } from "./ui/WheelModal";
import { ActionButtons } from "./ui/ActionButtons";

// Constants
const MAX_INPUT_LENGTH = 100;
const MIN_INPUT_LENGTH = 2;
const ERROR_DISPLAY_DURATION = 3000;

// Utility functions
const sanitizeInput = (input: string): string => {
   const noHtml = DOMPurify.sanitize(input, {
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: [],
   });
   const noControls = noHtml.replace(/[\x00-\x1F\x7F-\x9F]/g, "");
   return noControls.slice(0, MAX_INPUT_LENGTH);
};

const validateInput = (input: string): boolean => {
   if (!input) return false;
   if (input.length < MIN_INPUT_LENGTH) return false;
   return true;
};

export const DynamicList: React.FC = () => {
   const [items, setItems] = useState<string[]>([""]);
   const [isSpinning, setIsSpinning] = useState(false);
   const [selectedItem, setSelectedItem] = useState<string | null>(null);
   const [showWheel, setShowWheel] = useState(false);
   const [errors, setErrors] = useState<{ [key: number]: string }>({});
   const [errorMessage, setErrorMessage] = useState<string | null>(null);
   const { theme } = useTheme();
   const isDark = theme === "dark";
   const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
   const errorRef = useRef<HTMLDivElement | null>(null);

   const showError = useCallback((message: string) => {
      setErrorMessage(message);
      setTimeout(() => setErrorMessage(null), ERROR_DISPLAY_DURATION);
   }, []);

   const handleClickOutside = useCallback((event: MouseEvent) => {
      if (
         errorRef.current &&
         !errorRef.current.contains(event.target as Node)
      ) {
         setErrorMessage(null);
      }
   }, []);

   useEffect(() => {
      if (errorMessage) {
         document.addEventListener("mousedown", handleClickOutside);
         return () => {
            document.removeEventListener("mousedown", handleClickOutside);
         };
      }
   }, [errorMessage, handleClickOutside]);

   const handleChange = useCallback(
      (idx: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
         const sanitizedValue = sanitizeInput(e.target.value);
         
         // Check for duplicates
         const isDuplicate = items.some((item, index) => 
            index !== idx && item.toLowerCase() === sanitizedValue.toLowerCase()
         );

         if (isDuplicate) {
            setErrors((prev) => ({
               ...prev,
               [idx]: "Come on, you can't hesitate twice on the same thing",
            }));
            return;
         }

         const next = [...items];
         next[idx] = sanitizedValue;
         setItems(next);

         if (errors[idx]) {
            setErrors((prev) => {
               const newErrors = { ...prev };
               delete newErrors[idx];
               return newErrors;
            });
         }
      },
      [items, errors]
   );

   const handleKeyDown = useCallback(
      (idx: number) => (e: React.KeyboardEvent<HTMLInputElement>) => {
         if (e.key === "Enter") {
            e.preventDefault();
            const currentValue = items[idx];

            if (validateInput(currentValue)) {
               setItems((prev) => [...prev, ""]);

               setTimeout(() => {
                  const nextInput = inputRefs.current[idx + 1];
                  if (nextInput) {
                     nextInput.focus();
                  }
               }, 0);
            } else {
               setErrors((prev) => ({
                  ...prev,
                  [idx]: "Please enter at least 2 characters",
               }));
            }
         }
      },
      [items]
   );

   const handleDelete = useCallback((idx: number) => {
      setItems((prev) => {
         const newItems = prev.filter((_, i) => i !== idx);
         return newItems.length === 0 ? [""] : newItems;
      });
      setErrors((prev) => {
         const newErrors = { ...prev };
         delete newErrors[idx];
         return newErrors;
      });
   }, []);

   const addMore = useCallback(() => {
      if (!validateInput(items[0])) {
         showError("Please fill the first item before adding more");
         return;
      }
      setItems((prev) => [...prev, ""]);
   }, [items, showError]);

   const hasEnoughItems = useCallback(() => {
      const validItems = items.filter((item) => validateInput(item));
      return validItems.length >= 2;
   }, [items]);

   const magic = useCallback(() => {
      const nonEmptyItems = items.filter((item) => validateInput(item));
      if (nonEmptyItems.length > 0) {
         setShowWheel(true);
         setIsSpinning(true);
         setSelectedItem(null);
      }
   }, [items]);

   const handleSpinEnd = useCallback((item: string) => {
      setIsSpinning(false);
      setSelectedItem(item);
   }, []);

   const handleMagic = useCallback(() => {
      const validItems = items.filter((item) => validateInput(item));
      if (validItems.length < 2) {
         showError("Please add at least 2 items before spinning");
         return;
      }
      magic();
   }, [items, magic, showError]);

   const handleReset = useCallback(() => {
      const validItems = items.filter((item) => validateInput(item));
      if (validItems.length < 2) {
         showError("You need at least 2 items to reset the list");
         return;
      }
      setItems([""]);
      setErrors({});
      setSelectedItem(null);
      setShowWheel(false);
      setIsSpinning(false);
   }, [items, showError]);

   return (
      <div className="max-w-md mx-auto p-4 space-y-4">
         <motion.ul
            className="space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
         >
            <AnimatePresence mode="popLayout">
               {items.map((value, i) => (
                  <ListItem
                     key={i}
                     value={value}
                     index={i}
                     onChange={handleChange(i)}
                     onKeyDown={handleKeyDown(i)}
                     onDelete={() => handleDelete(i)}
                     error={errors[i]}
                     inputRef={(el) => {
                        inputRefs.current[i] = el;
                     }}
                     canDelete={items.length > 1}
                  />
               ))}
            </AnimatePresence>
         </motion.ul>

         <ActionButtons
            onAddMore={addMore}
            onMagic={handleMagic}
            onReset={handleReset}
         />

         <WheelModal
            isOpen={showWheel}
            onOpenChange={setShowWheel}
            items={items.filter((item) => validateInput(item))}
            isSpinning={isSpinning}
            selectedItem={selectedItem}
            onSpinEnd={handleSpinEnd}
            onSpinAgain={magic}
         />

         <AnimatePresence>
            {errorMessage && (
               <ErrorPopup
                  message={errorMessage}
                  onClose={() => setErrorMessage(null)}
                  errorRef={errorRef}
               />
            )}
         </AnimatePresence>
      </div>
   );
};
