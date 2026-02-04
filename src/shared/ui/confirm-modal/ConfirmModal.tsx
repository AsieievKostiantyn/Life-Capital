import { Button, Group, Modal } from '@mantine/core';
import type { ButtonProps, ModalProps } from '@mantine/core';

type ConfirmModalProps = ModalProps & {
  onConfirm: () => void;

  confirmLabel?: React.ReactNode;
  cancelLabel?: React.ReactNode;

  confirmProps?: ButtonProps;
  cancelProps?: ButtonProps;
};

export const ConfirmModal = ({
  onConfirm,

  confirmLabel = 'Підтвердити',
  cancelLabel = 'Скасувати',

  confirmProps,
  cancelProps,

  children,
  onClose,
  title,
  ...modalProps
}: ConfirmModalProps) => {
  return (
    <Modal withCloseButton={false} onClose={onClose} {...modalProps}>
      <Modal.Header>
        <Modal.Title fw={700}>{title}</Modal.Title>
        <Modal.CloseButton />
      </Modal.Header>

      <Modal.Body>
        {children}

        <Group justify="flex-end" mt="lg">
          <Button variant="default" onClick={onClose} {...cancelProps}>
            {cancelLabel}
          </Button>

          <Button onClick={onConfirm} {...confirmProps}>
            {confirmLabel}
          </Button>
        </Group>
      </Modal.Body>
    </Modal>
  );
};
