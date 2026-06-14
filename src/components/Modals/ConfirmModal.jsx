"use client";

import { Button, Modal } from "@heroui/react";
import { AlertTriangle } from "lucide-react";

const animationClasses = {
  backdrop: [
    "data-[entering]:duration-400",
    "data-[entering]:ease-[cubic-bezier(0.16,1,0.3,1)]",
    "data-[exiting]:duration-200",
    "data-[exiting]:ease-[cubic-bezier(0.7,0,0.84,0)]",
  ].join(" "),
  container: [
    "data-[entering]:animate-in",
    "data-[entering]:fade-in-0",
    "data-[entering]:zoom-in-95",
    "data-[entering]:duration-400",
    "data-[entering]:ease-[cubic-bezier(0.16,1,0.3,1)]",
    "data-[exiting]:animate-out",
    "data-[exiting]:fade-out-0",
    "data-[exiting]:zoom-out-95",
    "data-[exiting]:duration-200",
    "data-[exiting]:ease-[cubic-bezier(0.7,0,0.84,0)]",
  ].join(" "),
};

export default function ConfirmModal({
  isOpen,
  onOpenChange,
  onConfirm,
  title = "Confirm Action",
  description = "Are you sure you want to continue?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmColor = "danger",
  isLoading = false,
  children,
}) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Backdrop className={animationClasses.backdrop}>
        <Modal.Container className={animationClasses.container}>
          <Modal.Dialog className="max-w-md">
            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Icon className="bg-danger/10 text-danger">
                <AlertTriangle className="size-5" />
              </Modal.Icon>

              <div>
                <Modal.Heading>{title}</Modal.Heading>
              </div>
            </Modal.Header>

            <Modal.Body>
              {children ? (
                children
              ) : (
                <p className="text-default-600">{description}</p>
              )}
            </Modal.Body>

            <Modal.Footer>
              <Button
                variant="flat"
                isDisabled={isLoading}
                onPress={() => onOpenChange(false)}
              >
                {cancelText}
              </Button>

              <Button
                variant ={confirmColor}
                isLoading={isLoading}
                onPress={onConfirm}
              >
                {confirmText}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}