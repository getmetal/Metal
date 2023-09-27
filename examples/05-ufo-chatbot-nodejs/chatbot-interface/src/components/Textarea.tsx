import { ReactNode } from 'react';


interface TextareaProps {
  label?: string | ReactNode;
  placeholder?: string;
  submitLabel?: string;
  toolbarOpts: {
    onClick: () => void;
    icon: any;
    label: string;
  }[];
  value: string;
  onChange: (evt: any) => void;
  onKeyDown?: (evt: any) => void;
  onSubmit: (evt: any) => void;
}

export default function Textarea(props: TextareaProps) {
  const {
    label,
    placeholder,
    submitLabel = 'Send',
    toolbarOpts,
    value,
    onChange,
    onKeyDown,
    onSubmit,
  } = props;

  return (
    <div className="flex items-start space-x-4">
      <div className="min-w-0 flex-1">
        <form onSubmit={onSubmit} className="relative">
          <div className="overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
            <label htmlFor="comment" className="sr-only">
              {label}
            </label>
            <textarea
              rows={4}
              name="comment"
              id="comment"
              className="block w-full resize-none border-0 bg-transparent py-1.5 text-gray-200 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              onKeyDown={onKeyDown}
            />

            {/* Spacer element to match the height of the toolbar */}
            <div className="py-2" aria-hidden="true">
              {/* Matches height of button in toolbar (1px border + 36px content height) */}
              <div className="py-px">
                <div className="h-9" />
              </div>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
            <div className="flex items-center space-x-5">
              <div className="flex items-center">
                {toolbarOpts.map(item => {
                  return (
                    <button
                      key={item.label}
                      type="button"
                      className="-m-1.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500"
                      onClick={item.onClick}
                    >
                      <item.icon className="h-5 w-5" aria-hidden="true" />
                      <span className="sr-only">{item.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
            <div className="flex-shrink-0">
              <button
                type="submit"
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {submitLabel}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
