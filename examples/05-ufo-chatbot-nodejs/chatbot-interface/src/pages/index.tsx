
import { useEffect, useMemo, useRef, useState } from "react";
import { useChat } from 'ai/react'
import ReactMarkdown from 'react-markdown'
import Image from 'next/image'
import { CogIcon, InformationCircleIcon, NewspaperIcon, LightBulbIcon, UserIcon } from '@heroicons/react/24/outline'

import ConfigModal from '@/components/ConfigModal'
import Error from '@/components/Error';
import PromptModal from "@/components/PromptModal";
import PwModal from "@/components/PwModal";
import SourcesModal from "@/components/SourcesModal";
import Textarea from "@/components/Textarea";
import { DEFAULT_PROMPT } from '@/helpers/prompts';


const Chat = () => {
  const messagesEndRef = useRef(null);

  const [showPwModal, setShowPwModal] = useState(false);
  const [pw, setPw] = useState('');

  const [openConfig, setOpenConfig] = useState(false);
  const [openPrompts, setOpenPrompts] = useState(false);

  const [system, setSystem] = useState("")
  const [sources, setSources] = useState<any>([]);
  const [sourcesLoading, setSourcesLoading] = useState(false);
  const [index, setIndex] = useState('');
  const [tokenCount, setTokenCount] = useState<number>(0);
  const [error, setError] = useState<string>('');

  const [chunkCount, setChunkCount] = useState<number | undefined>(10);
  const [temperature, setTemperature] = useState<number | undefined>(0);
  const [maxTokens, setMaxTokens] = useState<number | undefined>();

  const { isLoading, messages, input, handleInputChange, handleSubmit, error: chatError, setMessages } = useChat({
    body: {
      system,
      chunkCount,
      temperature,
      maxTokens,
      pw,
    },
    onResponse: res => {
      const headers = res?.headers;
      const hdrTokenCount = headers.get('x-metal-tokens');
      const tokenCountInt = Number(hdrTokenCount);
      setTokenCount(tokenCountInt);
    },
  });

  useEffect(() => {
    fetch("/api/password", { method: "POST" }).then(res => {
      if (res.status === 200) {
        setShowPwModal(true)
      }
    })
  }, [])

  useEffect(() => {
    if (chatError) {
      setError(chatError?.message)
      return;
    }
  }, [chatError])

  useEffect(() => {
    const el: any = messagesEndRef.current;
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth" })
  }, [messages]);


  const handleSources = async (_q: string) => {
    setSourcesLoading(true)
    const sourcesRes = await fetch("/api/sources", {
      method: "POST",
      body: JSON.stringify({ prompt: _q, chunkCount, pw }),
    })


    const sourceData = await sourcesRes.json();
    setSources(sourceData.data)
    setIndex(sourceData.index)
    setSourcesLoading(false)
  }

  const isNotDefaultSys = system && system !== DEFAULT_PROMPT;
  const isWaiting = useMemo(() => {
    if (!messages?.length) return false;
    const last = messages?.[messages?.length - 1]
    return last?.role === 'user';
  }, [messages]);

  return (
    <>
      <Image src="/metal.svg" width={200} height={200} alt="Metal logo" className="border border-gray-500 rounded-2xl bg-black rounded-xl opacity-30 z-0 img-bkgd absolute top-10" />
      {error ? <Error message={error} onDismiss={() => setError('')} /> : null}
      <PromptModal open={openPrompts} onClose={() => setOpenPrompts(false)} onPrompt={(txt: string) => setSystem(txt)} />
      <SourcesModal index={index} open={!!sources?.length} sources={sources} onClose={() => setSources([])} />
      <PwModal open={showPwModal} onClose={() => setShowPwModal(false)} pw={pw} onPw={setPw} onSubmit={async () => {
        setShowPwModal(false)

        const res = await fetch("/api/password", {
          method: "POST",
          body: JSON.stringify({ pw }),
        })

        if (res.status === 401) {
          setError("Invalid password")
          return;
        }

      }} />
      <ConfigModal
        fields={[
          {
            name: 'temperature',
            label: 'Temperature',
            value: temperature,
            onChange: (e) => {
              const value = e.target.value;
              if (value === undefined || value === '') {
                setTemperature(undefined)
                return;
              }

              setTemperature(Number(value))
            },
            placeholder: '0.0 - 2.0',
            type: 'number',
            min: 0,
            max: 2,
            step: 0.1,
          },
          {
            name: 'maxTokens',
            label: 'Max Tokens',
            value: maxTokens,
            onChange: (e) => {
              const value = e.target.value;
              if (value === undefined || value === '') {
                setMaxTokens(undefined)
                return;
              }

              setMaxTokens(Number(value))
            },
            placeholder: '1 - 2048',
            type: 'number',
            min: 1,
            max: 2048,
            step: 1,
          },
          {
            name: 'chunkCount',
            label: 'Chunk Count',
            value: chunkCount,
            onChange: (e) => {
              const value = e.target.value;
              if (value === undefined || value === '') {
                setChunkCount(undefined)
                return;
              }

              setChunkCount(Number(value))
            },
            placeholder: '1 - 100',
            type: 'number',
            min: 1,
            max: 100,
            step: 1,
          }
        ]}
        open={openConfig}
        onClearMessages={() => {
          setMessages([])
          setTokenCount(0)
        }}
        onDownloadMessages={() => {
          const txt = messages.reduce((agg, item) => {
            return agg + `${item.role === 'assistant' ? 'Assistant' : 'Human'}: ${item.content}\n`
          }, '');

          const a = document.createElement("a");
          const file = new Blob([txt], { type: 'text/plain' });
          // @ts-ignore
          a.href = URL.createObjectURL(file);
          // @ts-ignore
          a.download = 'history.txt';
          a?.click();
        }}
        onClose={() => setOpenConfig(false)}
      />
      <div className=" py-4 px-10 md:px-24 mt-5 wrapper md:mx-20">
        <div
          className={`w-full h-full text-sm overflow-auto px-5 py-5`}
        >
          {messages.map((msg, idx) => {
            const isAssistant = msg.role === 'assistant';
            const prevMsg = messages[idx - 1];
            const isNotLast = idx !== messages.length - 1;
            return (
              <div key={idx} className={`my-3 z-10 ${isNotLast && 'border-b-[.25px] border-gray-800'} p-3 pb-6`}>
                <div key={idx} className={`w-full flex ${isAssistant ? 'justify-start' : ' flex-row-reverse '} items-start`}>
                  <div>
                    {isAssistant ?
                      <LightBulbIcon className="bg-indigo-500 h-7 w-7 p-1 rounded-md text-white mr-3" />
                      : <UserIcon className="bg-blue-500 h-7 w-7 p-1 rounded-md text-white ml-3" />
                    }
                  </div>
                  <div className={`grow flex ${isAssistant ? 'justify-start' : 'justify-end'} z-10 text-sm rounded-lg `}>
                    <ReactMarkdown className="react-markdown">{msg.content}</ReactMarkdown>
                  </div>
                  {isAssistant &&
                    <button
                      disabled={sourcesLoading}
                      onClick={() => {
                        if (!prevMsg) {
                          console.log('error fetching sources, no prev msg')
                          return;
                        }
                        handleSources(prevMsg.content)
                        console.log('fetching sources for: ', prevMsg.content)
                      }}
                      type="button"
                      className="ml-2 rounded-lg bg-gray-500 p-1 text-white shadow-sm hover:bg-gray-400"
                    >
                      <InformationCircleIcon className="h-2 w-2" aria-hidden="true" />
                    </button>
                  }
                </div>
              </div>
            )
          })}
          {isWaiting && (
            <div className={`my-3 z-10 border-t-[.25px] border-gray-800 p-3 pb-6`}>
              <div className={`w-full flex items-start justify-start animate-pulse`}>
                <LightBulbIcon className="bg-indigo-500 h-7 w-7 p-1 rounded-md text-white mr-3" />
                <div dangerouslySetInnerHTML={{ __html: '...' }} className={`py-1 px-2 text-sm rounded-md bg-gray-800`} />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div >
      <div className="w-full fixed bottom-0 bg-black p-5 pb-10 h-[250px] px-10 md:px-24">
        <div className="w-full md:px-20">
          <div className="mt-2">
            <Textarea
              value={input}
              onChange={handleInputChange}
              placeholder="Ask any question to the chatbot."
              submitLabel={isLoading ? 'Thinking...' : '🪄 Send'}
              onKeyDown={(event: any) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                  event.preventDefault();
                  handleSubmit(event as any);
                }
              }}
              onSubmit={handleSubmit}
              toolbarOpts={[
                {
                  onClick: () => setOpenConfig(true),
                  icon: CogIcon,
                  label: 'Configuration',
                },
                {
                  onClick: () => setOpenPrompts(true),
                  icon: NewspaperIcon,
                  label: 'Prompt Templates',
                },
              ]}
            />
            <div className="mt-1 flex">
              <p className={`${tokenCount > 7900 ? 'text-red-300' : 'text-green-300'} text-xs`}><span className="font-bold">{tokenCount}</span> / 8192</p>
              {isNotDefaultSys && <span className="text-yellow-300 ml-3 text-xs">[System prompt overwritten]</span>}
            </div>
          </div>
        </div>
      </div >
    </>
  );
};

export default Chat;
