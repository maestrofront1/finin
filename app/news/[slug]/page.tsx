import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Container } from '@shared/ui/Container'
import { getPostBySlug, getAllSlugs } from '@features/news/lib/news'
import { buildMetadata } from '@shared/seo/seo'
import Link from 'next/link'
import Button from '@shared/ui/Button'
import Image from 'next/image'

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  if (!post) return {}
  return buildMetadata({ path: `/news/${params.slug}`, title: post.meta.title, description: post.meta.excerpt })
}

export default async function NewsPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)
  if (!post) notFound()
  
  return (
    <Container>
      <div className="max-w-4xl mx-auto mt-[120px] mb-[100px]">
        {/* Навигация назад */}
        <div className="mb-8">
          <Link href="/news">
            <Button variant="gray" withArrow={false} className="mb-4">← Назад к новостям</Button>
          </Link>
        </div>

        {/* Заголовок статьи */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.meta.title}</h1>
          
          <div className="flex items-center gap-4 text-gray-600 mb-6">
            <time>{new Date(post.meta.date).toLocaleDateString('ru-RU')}</time>
            {post.meta.author && <span>Автор: {post.meta.author}</span>}
          </div>

          {post.meta.excerpt && (
            <p className="text-xl text-gray-700 leading-relaxed">{post.meta.excerpt}</p>
          )}
        </header>

        {/* Изображение если есть */}
        {post.meta.image && (
          <div className="mb-8">
            <Image 
              src={post.meta.image} 
              alt={post.meta.title}
              width={800}
              height={400}
              className="w-full h-auto rounded-lg"
            />
          </div>
        )}

        {/* Контент статьи */}
        <article className="prose lg:prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </article>
      </div>
    </Container>
  )
}

