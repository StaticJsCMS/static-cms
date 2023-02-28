import { Dialog, Transition } from '@headlessui/react';
import XMarkIcon from '@heroicons/react/20/solid/XMarkIcon';
import React, { Fragment, useCallback } from 'react';

import { closeMediaLibrary } from '@staticcms/core/actions/mediaLibrary';
import { selectVisible } from '@staticcms/core/reducers/selectors/mediaLibrary';
import { useAppDispatch, useAppSelector } from '@staticcms/core/store/hooks';
import IconButton from '../../common/button/IconButton';
import MediaLibrary from '../common/MediaLibrary';

import type { FC } from 'react';

const MediaLibraryModal: FC = () => {
  const dispatch = useAppDispatch();
  const isVisible = useAppSelector(selectVisible);

  const handleClose = useCallback(() => {
    dispatch(closeMediaLibrary());
  }, [dispatch]);

  return (
    <Transition appear show={isVisible} as={Fragment} unmount={false}>
      <Dialog open={isVisible} onClose={handleClose} unmount={false}>
        <div className="fixed inset-0 bg-black bg-opacity-25 dark:bg-opacity-40 z-50" />
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex min-h-full items-center justify-center text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
              unmount={false}
            >
              <Dialog.Panel
                className="
                  transform
                  overflow-visible
                  rounded-2xl
                  p-1
                  text-left
                  align-middle
                  shadow-xl
                  transition-all
                  w-media-library-dialog
                  h-media-library-dialog
                  bg-white
                  dark:bg-slate-800
                "
              >
                <IconButton
                  className="absolute -top-3.5 -left-3.5 bg-white dark:bg-slate-800"
                  variant="outlined"
                  aria-label="add"
                  onClick={handleClose}
                  rounded
                >
                  <XMarkIcon className="w-5 h-5" />
                </IconButton>
                <MediaLibrary />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default MediaLibraryModal;
