import Link from 'next/link'
import type { Metadata } from 'next'
import { Container } from '@shared/ui/Container'
import { getAllPostsMeta } from '@features/news/lib/news'
import { buildMetadata } from '@shared/seo/seo'
import Button from "@shared/ui/Button";
import Image from "next/image";
import MockImg from "../../public/img/mock/card-1.png"

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({ path: '/news', title: 'Новости — Финин' })
}

export default async function NewsIndexPage() {
    const posts = await getAllPostsMeta()

    return (
        <Container>
            <div className="flex flex-col gap-10 mb-[100px] mt-[120px] con-container">
                <h2 className="font-semibold text-[55px] text-[#3B3B3B] text-center mb-10 mt-4">Официальные новости<br/> и анонсы кампании</h2>

                <div className="grid grid-cols-3 gap-5">
                    {posts.map((item, i) => {
                        return (
                            <div key={i}
                                 className={"flex flex-row justify-between gap-10 first:col-span-3 p-10 rounded-[20px] bg-gray-100"}>
                                <div className="flex flex-col gap-5 flex-1">
                                    <p className="text-gray-600">{new Date(item.date).toLocaleDateString('ru-RU')}</p>
                                    <h3 className="text-xl font-semibold">{item.title}</h3>
                                    <p className="text-gray-700 flex-1">{item.excerpt}</p>
                                    <div className="mt-auto">
                                        <Link href={`/news/${item.slug}`}>
                                            <Button variant="green">читать больше</Button>
                                        </Link>
                                    </div>
                                </div>
                                {i === 0 && (
                                    <Image src={MockImg} className="rounded-[20px] h-full overflow-hidden max-w-[632px]" alt="cover"></Image>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </Container>
    );
}


