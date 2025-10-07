import Link from 'next/link'
import { Container } from '@/shared/ui/Container'
import { Card } from '@/shared/ui/Card'
import { IconLoans, IconInvest, IconShares, IconBiz, IconRealty } from '@/shared/icons/PlatformIcons'

const modules = [
  { key: 'loans', title: 'Займы', href: '/loans', Icon: IconLoans },
  { key: 'invest', title: 'Инвестиции', href: '/invest', Icon: IconInvest },
  { key: 'shares', title: 'Акции', href: '/shares', Icon: IconShares },
  { key: 'business', title: 'Бизнес', href: '/partners', Icon: IconBiz },
  { key: 'realty', title: 'Недвижимость', href: '/invest', Icon: IconRealty },
]
import { MainCard } from "@/shared/ui/InfoCard";
import {H2} from "@shared/ui/Typography";

export function ModulesSection() {
  return (
    <section className="py-16 con-container">
      <div className="text-center mb-14">
           <H2 className="text-[48px] font-semibold mb-4" >Финин объединяет<span className="text-gray-300 "> ключевые модули<br />для развития бизнеса и капитала</span></H2>
          <p className="text-gray-300 font-regular text-[24px] max-sm:text-[14px]">
            Мы создали пространство, где каждая роль находит решение: <br />
            вложить, привлечь или стать акционером.
          </p>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MainCard
          variant="horizontal"
          title="Займы"
          description="Оформите займ с прозрачными условиями на развитие Вашего бизнеса"
          subtitle="от 21% годовых"
          pic={<img src="/img/modules/pic.png" alt="Займы" />}
          href="/loans"
        />
        <MainCard
          variant="horizontal"
          title="Инвестиции"
          description="Надежное инвестирование в акции, бизнес или недвижимость с доходностью"
          subtitle="от 15% годовых"
          pic={<img src="/img/modules/pic-1.png" alt="Инвестиции" />}
          href="/invest"
        />
        <MainCard
          variant="horizontal"
          title="Акционирование"
          description="Привлекайте инвестиции с помощью выпуска акций вашей компании"

          pic={<img src="/img/modules/pic-2.png" alt="Акционирование" />}
          href="/shares"
        />
        <MainCard
          variant="horizontal"
          title="Инвестирование в Финин"
          description="Станьте совладельцем финтех-компании с ростом акций и выплатами дивидентов"
      
          pic={<img src="/img/modules/pic-3.png" alt="Инвестирование в Финин" />}
          href="/shares"
        />

      </div>
    </section>
  )
}





