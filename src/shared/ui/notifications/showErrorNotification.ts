import { showNotification } from '@mantine/notifications';

export const showErrorNotification = (
  errorTitle: string,
  errorMessage: string
) => {
  showNotification({
    title: errorTitle,
    message: errorMessage,
    color: 'red',
  });
};
