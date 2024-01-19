import { ILinkInformation } from '@/types/IShowcaseEdit'
import { useState } from 'react'

export const useLinks = (initValue: ILinkInformation[]) => {
  const [links, setLinks] = useState<ILinkInformation[]>(initValue)
  const [isValid, setIsValid] = useState<boolean>(true)

  const addLink = (name: string, link: string) => {
    const newLink = { name, link, id: links.length }
    setLinks([...links, newLink])
  }

  const changeLinkName = (id: number, content: string) => {
    setLinks(
      links.map((link) => (link.id === id ? { ...link, name: content } : link)),
    )
  }

  const changeUrl = (id: number, content: string) => {
    setLinks(
      links.map((link) => (link.id === id ? { ...link, link: content } : link)),
    )
  }

  return { links, addLink, isValid, setIsValid, changeLinkName, changeUrl }
}
