import { Toast } from 'primereact/toast';
import { JSX, useEffect, useRef } from 'react';

import { useAlertMessage, useSetAlertMessage } from '@hooks/useAlert';

export function Alerts(): JSX.Element {
  const alertMessage = useAlertMessage();
  const setAlertMessage = useSetAlertMessage();
  const toastRef = useRef<Toast>(null);

  useEffect(() => {
    if (alertMessage) {
      toastRef.current?.show(alertMessage);
      setAlertMessage(null);
    }
  }, [alertMessage, setAlertMessage]);

  return <Toast ref={toastRef} />;
}
