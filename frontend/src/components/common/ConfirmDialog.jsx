import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button";

function ConfirmDialog({
    open,
    title = "Confirm Action",
    message = "Are you sure?",
    confirmText = "Delete",
    cancelText = "Cancel",
    loading = false,
    onConfirm,
    onCancel,
}) {
    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/50"
                        onClick={onCancel}
                    />

                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0.9,
                            y: 20,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0.9,
                            y: 20,
                        }}
                        className="
                            fixed
                            left-1/2
                            top-1/2
                            z-50
                            w-[90%]
                            max-w-md
                            -translate-x-1/2
                            -translate-y-1/2
                            rounded-2xl
                            bg-white
                            p-6
                            shadow-xl
                            dark:bg-slate-900
                        "
                    >
                        <h2 className="text-xl font-bold">
                            {title}
                        </h2>

                        <p className="mt-3 text-slate-500">
                            {message}
                        </p>

                        <div className="mt-8 flex justify-end gap-3">

                            <Button
                                variant="secondary"
                                onClick={onCancel}
                            >
                                {cancelText}
                            </Button>

                            <Button
                                variant="danger"
                                loading={loading}
                                onClick={onConfirm}
                            >
                                {confirmText}
                            </Button>

                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

export default ConfirmDialog;