import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CreateTareaLote from "./CreateTareaLote";
import CreateTareaLoteCosecha from "./CreateTareaLoteCosecha";

export default function CreateTaskWeeklyPlan() {
  const [activeForm, setActiveForm] = useState<string>("A");

  return (
    <>
      <div className="relative">
        <div className="flex justify-end space-x-4 mb-4">
          <button
            onClick={() => setActiveForm("A")}
            className={`${activeForm === "A" ? 'bg-indigo-800' : 'bg-indigo-500'} button  hover:bg-indigo-700`}
          >
            Crear Tarea Lote
          </button>
          <button
            onClick={() => setActiveForm("B")}
            className={`${activeForm === "B" ? 'bg-indigo-800' : 'bg-indigo-500'} button  hover:bg-indigo-700`}
          >
            Crear Tarea Cosecha
          </button>
        </div>
        <AnimatePresence mode="wait">
          {activeForm === "A" ? (
            <motion.div
              key="formA"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="absolute w-full"
            >
              <CreateTareaLote />
            </motion.div>
          ) : (
            <motion.div
              key="formB"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute w-full"
            >
              <CreateTareaLoteCosecha />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
