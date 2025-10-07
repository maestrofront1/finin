import Link from 'next/link'
import type { Route } from 'next'
import { Container } from './Container'
import { Button } from '@shared/ui/Button'
import { MoreMenu } from '@shared/ui/MoreMenu'


const BurgerSvg =()=> (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2.54688" y="5.40909" width="22.9091" height="1.90909" rx="0.954545" fill="#A5ADBD"/>
      <rect x="2.54688" y="13.0455" width="22.9091" height="1.90909" rx="0.954546" fill="#A5ADBD"/>
      <rect x="2.54688" y="20.6819" width="22.9091" height="1.90909" rx="0.954546" fill="#A5ADBD"/>
    </svg>
)

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white fixed z-[999] w-full" >
      <Container>
        <div className="flex items-center justify-between py-4 gap-4">
          <div className="flex items-center gap-8">
            <Link href={'/' as Route} className="font-semibold text-xl text-green-700 no-underline">
              <svg width="178" height="32" viewBox="0 0 178 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M27.2342 0H17.1663V23.7956C16.0012 23.9191 14.8225 23.8016 13.707 23.451C12.5915 23.1004 11.5642 22.5245 10.6923 21.7608C9.82026 20.9971 9.12308 20.0627 8.64613 19.0186C8.16919 17.9745 7.9232 16.8441 7.9242 15.701C7.92104 13.7082 8.66798 11.7836 10.0233 10.2922C11.3787 8.80092 13.2481 7.84667 15.277 7.61052V0.0244057C11.1495 0.248919 7.2666 2.006 4.42561 4.93492C1.58462 7.86384 0.00104593 11.7424 0 15.7742C-1.42554e-07 19.9582 1.70388 23.9709 4.73691 26.9298C7.76995 29.8887 11.8838 31.5515 16.1737 31.5526H26.1498V7.60239C26.4501 7.57392 26.7546 7.55358 27.0632 7.55358C29.2274 7.49909 31.3286 8.26741 32.9226 9.69614C34.5167 11.1249 35.4787 13.1021 35.6054 15.2099C35.7321 17.3178 35.0136 19.3911 33.6017 20.9918C32.1898 22.5924 30.1951 23.5949 28.0391 23.7875V31.516C32.1852 31.3145 36.0931 29.5664 38.9545 26.6333C41.816 23.7002 43.4119 19.8066 43.4121 15.758C43.4066 11.5768 41.6997 7.56878 38.6663 4.61417C35.633 1.65956 31.5212 -3.47349e-06 27.2342 0Z" fill="#00A772" />
                <path d="M71.2409 0.0203381L56.6437 13.8299V0H47.6602V32L47.8186 31.8373V31.8414L69.3766 11.8653V31.5566H78.3602V0H71.2492L71.2409 0.0203381Z" fill="#00A772" />
                <path d="M101.98 12.3696H91.8664V0.313207L82.8828 8.63557V31.5566H91.8664V19.667H101.98V31.5566H110.959V0H101.98V12.3696Z" fill="#00A772" />
                <path d="M138.288 0.0203381L123.691 13.8299V0H114.707V32L114.866 31.8373V31.8414L136.424 11.8653V31.5566H145.407V0H138.3L138.288 0.0203381Z" fill="#00A772" />
                <path d="M169.019 0V12.3696H158.905V0.313207L149.926 8.63557V31.5566H158.905V19.667H169.019V31.5566H177.998V0H169.019Z" fill="#00A772" />
              </svg>
            </Link>

          </div>
          <div className="flex items-center ">
            <nav className="hidden md:flex items-center gap-[40px] text-sm text-ink-black/90 max-2xl:gap-[20px]">
              <Button variant="text" withArrow={false} href={'/invest' as Route} className="header-link">Инвестиции</Button>
              <Button variant="text" withArrow={false} href={'/shares' as Route} className="header-link">Акционирование</Button>
              <Button variant="text" withArrow={false} href={'/loans' as Route} className="header-link">Займы бизнесу</Button>
              <Button variant="text" withArrow={false} href={'/invest-in-finin' as Route} className="header-link">Инвестировать в Финин</Button>
              {/* сюда вставляем меню */}
              <MoreMenu />
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="gosuslugi" className="max-2xl:p-[10px]" href="https://www.gosuslugi.ru">
             <span className="max-[1800px]:hidden">Войти через Госуслуги</span>
            </Button>
            <Button variant="green" className="max-lg:hidden" withArrow={false} href={'/login' as Route}>Личный кабинет</Button>
            <button className="hidden max-lg:flex">
              <BurgerSvg></BurgerSvg>
            </button>
          </div>
        </div>
      </Container>
    </header>
  )
}

