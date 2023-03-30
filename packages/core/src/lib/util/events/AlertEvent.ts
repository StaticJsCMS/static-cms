import type { AlertDialogProps } from '@staticcms/core/components/common/alert/Alert';

export default class AlertEvent extends CustomEvent<AlertDialogProps> {
  constructor(detail: AlertDialogProps) {
    super('alert', { detail });
  }
}
