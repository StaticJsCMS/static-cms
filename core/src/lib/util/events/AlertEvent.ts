import type { AlertDialogProps } from '@staticcms/core/components/UI/Alert';

export default class AlertEvent extends CustomEvent<AlertDialogProps> {
  constructor(detail: AlertDialogProps) {
    super('alert', { detail });
  }
}
