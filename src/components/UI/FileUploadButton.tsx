import React from 'react';

export interface FileUploadButtonProps {
  className?: string;
  label: string;
  imagesOnly?: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
}

const FileUploadButton = ({
  label,
  imagesOnly,
  onChange,
  disabled,
  className,
}: FileUploadButtonProps) => {
  return (
    <label className={`nc-fileUploadButton ${className || ''}`}>
      <span>{label}</span>
      <input
        type="file"
        accept={imagesOnly ? 'image/*' : '*/*'}
        onChange={onChange}
        disabled={disabled}
      />
    </label>
  );
};

export default FileUploadButton;
