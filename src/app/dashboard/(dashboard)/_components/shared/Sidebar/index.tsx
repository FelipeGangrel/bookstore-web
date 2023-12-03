'use client'

import { Book, House, Storefront, Tag, UserList } from '@phosphor-icons/react'

import { frontend } from '@/libs/navigation'

import { SidebarDivider } from './SidebarDivider'
import { SidebarLink } from './SidebarLink'
import { SidebarLinkInfo } from './SidebarLinkInfo'

export const Sidebar = () => {
  return (
    <div className="sticky top-[72px] w-72 shrink-0 self-start md:top-[96px]">
      <div className="rounded-md bg-white py-6 shadow">
        <div>
          <SidebarLink href={frontend.dashboard.home()}>
            <House />
            <SidebarLinkInfo
              title="Início"
              description="Painel administrativo"
            />
          </SidebarLink>
          <SidebarLink href={frontend.dashboard.home()}>
            <Storefront />
            <SidebarLinkInfo title="Pedidos" description="Gerenciar pedidos" />
          </SidebarLink>

          <SidebarDivider />

          <SidebarLink href={frontend.dashboard.home()}>
            <Book />
            <SidebarLinkInfo
              title="Produtos"
              description="Livros, papelaria e outros"
            />
          </SidebarLink>
          <SidebarLink href={frontend.dashboard.genres.list()}>
            <Tag />
            <SidebarLinkInfo
              title="Gêneros de livros"
              description="Gerenciar gêneros de livros"
            />
          </SidebarLink>
          <SidebarLink href={frontend.dashboard.home()}>
            <Tag />
            <SidebarLinkInfo
              title="Categorias de produtos"
              description="Gerenciar Categorias de produtos"
            />
          </SidebarLink>

          <SidebarDivider />

          <SidebarLink href={frontend.dashboard.home()}>
            <UserList />
            <SidebarLinkInfo title="Clientes" description="Clientes da loja" />
          </SidebarLink>
          <SidebarLink href={frontend.dashboard.home()}>
            <UserList />
            <SidebarLinkInfo
              title="Administradores"
              description="Administradores da loja"
            />
          </SidebarLink>
        </div>
      </div>
    </div>
  )
}
