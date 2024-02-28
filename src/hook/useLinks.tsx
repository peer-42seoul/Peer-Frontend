import { ILinkInformation } from '@/types/IShowcaseEdit'
import { useState } from 'react'

export const useLinks = (initValue: ILinkInformation[]) => {
  const [links, setLinks] = useState<ILinkInformation[]>(initValue)

  const addLink = (name: string, link: string) => {
    const newLink = { name, link, id: crypto.randomUUID() }
    setLinks([...links, newLink])
  }
  const deleteLink = (id: string) => {
    setLinks(links.filter((link) => link.id !== id))
  }

  const changeLinkName = (id: string, content: string) => {
    setLinks(
      links.map((link) => (link.id === id ? { ...link, name: content } : link)),
    )
  }

  const changeUrl = (id: string, content: string) => {
    setLinks(
      links.map((link) => (link.id === id ? { ...link, link: content } : link)),
    )
  }

  return { links, addLink, deleteLink, changeLinkName, changeUrl }
}
