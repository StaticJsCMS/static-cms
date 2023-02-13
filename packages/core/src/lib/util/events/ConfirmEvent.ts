import type { ConfirmDialogProps } from '@staticcms/core/components/common/confirm/Confirm';

export default class ConfirmEvent extends CustomEvent<ConfirmDialogProps> {
  constructor(detail: ConfirmDialogProps) {
    super('confirm', { detail });
  }
}
