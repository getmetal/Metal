import Modal from '@/components/Modal';


interface SourcesModalProps {
  index: string;
  open: boolean;
  sources?: any[];
  onClose: () => void;
}

const SourcesModal = ({ index, open, sources = [], onClose }: SourcesModalProps) => {
  return (
    <Modal open={open} onClose={onClose} size="3xl">
      <div className="w-full mb-5">

        <div className="mx-auto max-w-7xl">
          <div className="bg-gray-900 py-10">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <h1 className="text-base text-center font-bold leading-6 text-white">Sources</h1>
                </div>
              </div>
              <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <table className="min-w-full divide-y divide-gray-700">
                      <thead>
                        <tr>
                          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">
                            View
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                            Dist
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                            File
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800">
                        {sources?.map((item: any) => (
                          <tr key={item.id}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0 hover:text-blue-600 text-blue-500">
                              <a key={item.id} href={`https://app.getmetal.io/indexes/${index}/documents/${item.id}`} target="_blank" rel="noopener noreferrer">
                                View Details
                              </a>
                            </td>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                              {item.dist}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{item?.metadata?.fileName}</td>
                          </tr>
                        ))
                        }
                      </tbody >
                    </table >
                  </div >
                </div >
              </div >
            </div >
          </div >
        </div >
      </div>
    </Modal>
  );
}

export default SourcesModal;
