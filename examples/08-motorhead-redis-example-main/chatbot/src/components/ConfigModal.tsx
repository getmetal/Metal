import { Fragment } from 'react';
import { Dialog } from '@headlessui/react'
import { CogIcon } from '@heroicons/react/24/outline'
import Modal from '@/components/Modal';


interface ConfigModalProps {
  fields: {
    label: string;
    min?: number;
    max?: number;
    name: string;
    value: string | number | undefined;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    step?: number;
    type: string;
  }[];
  open: boolean;
  onClearMessages: () => void;
  onDownloadMessages: () => void;
  onClose: () => void;
}

const ConfigModal = (props: ConfigModalProps) => {
  const {
    fields,
    open,
    onClearMessages,
    onDownloadMessages,
    onClose,
  } = props;

  return (
    <Modal secondAction={onClearMessages} secondActionLabel="Clear History" actionLabel="Export" action={onDownloadMessages} open={open} onClose={onClose}
      header={
        <div>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-300">
            <CogIcon className="h-6 w-6 text-green-900" aria-hidden="true" />
          </div>
          <div className="mt-3 text-center sm:mt-5">
            <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-100">
              Configuration
            </Dialog.Title>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Adjust your GPT-3.5 configuration (<a href="https://platform.openai.com/docs/api-reference/chat/create#chat/create-stop">API Reference</a>)
              </p>
            </div>
          </div>
        </div>
      }>

      <div className="w-full mb-5">
        {fields.map(field => (
          <Fragment key={field.name}>
            <label
              htmlFor={field.name}
              className="block text-sm font-medium leading-6 text-gray-300"
            >
              {field.label}
            </label>
            <input className="block w-full rounded-md border-0 py-1.5 px-2 font-light shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-transparent text-white"
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              placeholder={field.placeholder}
              type={field.type}
              step={0.1}
            />
          </Fragment>
        ))}
      </div>
    </Modal>
  );
};

export default ConfigModal;
