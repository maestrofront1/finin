'use client'
import {Container} from '@shared/ui/Container'

import Button from "@shared/ui/Button";
import Image from "next/image";
import MockImg from "../../public/img/mock/card-1.png"
import {cn} from "@shared/lib/utils";
import {useState, useEffect} from "react";
import {DocumentFile} from "@shared/lib/documents";

const Tabs = ["Все документы", "Раскрытие информации", "Архив", "Документы площадки"];

export default function DocsPage() {
    const [activeTab, setActiveTab] = useState(0)
    const [docs, setDocs] = useState<DocumentFile[]>([])
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        // Загружаем документы при монтировании компонента
        const loadDocuments = async () => {
            try {
                const response = await fetch('/api/documents')
                if (response.ok) {
                    const documents = await response.json()
                    setDocs(documents)
                } else {
                    console.error('Ошибка загрузки документов:', response.statusText)
                }
            } catch (error) {
                console.error('Ошибка загрузки документов:', error)
            } finally {
                setLoading(false)
            }
        }
        
        loadDocuments()
    }, [])
    
    const handleOpenDocument = (href: string) => {
        window.open(href, '_blank');
    }
    
    const handleDownloadDocument = (href: string, filename: string) => {
        const link = document.createElement('a');
        link.href = href;
        link.download = filename;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    return (
        <Container>
            <div className="flex flex-col gap-10 mb-[100px] mt-[120px] con-container">
                <div className="flex flex-row">
                    {Tabs.map((tab, i) => (
                        <span key={i} onClick={() => {
                            setActiveTab(i)
                        }}
                              className={cn("cursor-pointer w-full hover:underline border-l-2 border-gray-300:", activeTab === i ? "text-gray-400" : "text-gray-300",  i === 0 ? "border-l-0" : "text-center" )}>{tab}</span>
                    ))}
                </div>

                <div className="grid grid-cols-3 gap-5">
                    {loading ? (
                        <div className="col-span-3 text-center py-10">
                            <p>Загрузка документов...</p>
                        </div>
                    ) : docs.length === 0 ? (
                        <div className="col-span-3 text-center py-10">
                            <p>Документы не найдены</p>
                        </div>
                    ) : (
                        docs.map((item, i) => (
                        <div key={i}
                             className={"flex flex-col h-[368px] justify-between gap-10 pb-6 pt-10 px-10 rounded-[20px] bg-gray-100"}>
                            <div className="flex flex-col gap-5">
                                <p>{item.title}</p>
                            </div>
                            <div className="flex flex-row justify-between">
                                <div className="flex flex-row gap-3 w-full justify-between">
                                    <svg width="61" height="60" viewBox="0 0 61 60" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_2363_610)">
                                            <path
                                                d="M44.5469 0H25.0268H23.5142L22.4454 1.09148L7.66835 16.1838L6.59961 17.2753V18.8194V49.9343C6.59961 55.4843 11.0205 60.0001 16.4558 60.0001H44.5469C49.9805 60.0001 54.4015 55.4843 54.4015 49.9343V10.0659C54.4015 4.515 49.9805 0 44.5469 0ZM50.7529 49.9342C50.7529 53.4354 47.9744 56.273 44.5469 56.273H16.4558C13.0268 56.273 10.2483 53.4354 10.2483 49.9342V18.8193H19.8544C22.7098 18.8193 25.0268 16.4546 25.0268 13.5376V3.72703H44.5469C47.9744 3.72703 50.7529 6.56461 50.7529 10.0659V49.9342Z"
                                                fill="#A5ADBD"/>
                                            <path
                                                d="M20.8562 29.6228H17.5826C16.9593 29.6228 16.5859 30.0368 16.5859 30.657V39.3C16.5859 40.0486 17.0683 40.5421 17.7381 40.5421C18.3934 40.5421 18.8757 40.0487 18.8757 39.3V36.6743C18.8757 36.6105 18.9077 36.5786 18.9702 36.5786H20.8562C23.162 36.5786 24.5497 35.1458 24.5497 33.1084C24.5498 31.0391 23.1781 29.6228 20.8562 29.6228ZM20.7153 34.5567H18.9702C18.9077 34.5567 18.8757 34.5249 18.8757 34.4618V31.7396C18.8757 31.6757 18.9077 31.6439 18.9702 31.6439H20.7153C21.6815 31.6439 22.2583 32.233 22.2583 33.1085C22.2584 33.9839 21.6815 34.5567 20.7153 34.5567Z"
                                                fill="#A5ADBD"/>
                                            <path
                                                d="M29.8321 29.6228H27.3229C26.6996 29.6228 26.3262 30.0368 26.3262 30.657V39.4276C26.3262 40.0487 26.6994 40.4464 27.3229 40.4464H29.8321C32.0915 40.4464 33.4952 39.7141 34.0559 37.9475C34.2579 37.3264 34.3684 36.5786 34.3684 35.0345C34.3684 33.4906 34.2578 32.7427 34.0559 32.1217C33.4951 30.3551 32.0915 29.6228 29.8321 29.6228ZM31.8591 37.1358C31.5931 37.9949 30.8304 38.3615 29.7696 38.3615H28.7105C28.6479 38.3615 28.6159 38.3296 28.6159 38.2659V31.8034C28.6159 31.7396 28.6479 31.7077 28.7105 31.7077H29.7696C30.8304 31.7077 31.5931 32.0742 31.8591 32.9335C31.9681 33.3 32.045 33.9366 32.045 35.0346C32.045 36.1327 31.968 36.7692 31.8591 37.1358Z"
                                                fill="#A5ADBD"/>
                                            <path
                                                d="M42.568 29.6228H37.426C36.8027 29.6228 36.4277 30.0368 36.4277 30.657V39.3C36.4277 40.0486 36.9117 40.5421 37.5815 40.5421C38.2352 40.5421 38.7191 40.0487 38.7191 39.3V36.212C38.7191 36.149 38.7495 36.1171 38.812 36.1171H41.8053C42.4751 36.1171 42.8644 35.7032 42.8644 35.114C42.8644 34.5248 42.4751 34.1117 41.8053 34.1117H38.812C38.7495 34.1117 38.7191 34.0798 38.7191 34.0159V31.7396C38.7191 31.6757 38.7495 31.6439 38.812 31.6439H42.568C43.2074 31.6439 43.6289 31.2143 43.6289 30.6416C43.6287 30.0523 43.2073 29.6228 42.568 29.6228Z"
                                                fill="#A5ADBD"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_2363_610">
                                                <rect width="60" height="60" fill="white" transform="translate(0.5)"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <div className="flex flex-row gap-3">
                                        <button 
                                            onClick={() => handleOpenDocument(item.href)}
                                            className="rounded-[10px] p-[18px] w-full bg-gray-200 hover:bg-gray-100 active:bg-gray-200 max-w-[140px]"
                                        >
                                            открыть
                                        </button>
                                        <button 
                                            onClick={() => handleDownloadDocument(item.href, item.filename)}
                                            className="rounded-[10px] p-[18px] w-full bg-gray-200 hover:bg-gray-100 active:bg-gray-200 max-w-[140px]"
                                        >
                                            скачать
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        ))
                    )}
                </div>
            </div>
        </Container>
    );
}


