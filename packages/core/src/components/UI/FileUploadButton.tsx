import Button from '@mui/material/Button';
import React from 'react';

import type { ChangeEventHandler } from 'react';

export interface FileUploadButtonProps {
  label: string;
  imagesOnly?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
}

const FileUploadButton = ({ label, imagesOnly, onChange, disabled }: FileUploadButtonProps) => {
  return (
    <Button variant="contained" component="label">
      {label}
      <input
        hidden
        multiple
        type="file"
        accept={imagesOnly ? 'image/*' : '*/*'}
        onChange={onChange}
        disabled={disabled}
      />
    </Button>
  );
};

export default FileUploadButton;
