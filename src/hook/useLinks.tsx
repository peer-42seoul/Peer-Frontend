import { IUserProfileLink } from '@/types/IUserProfile'
import { useState } from 'react'

export const useLinks = (initValue: IUserProfileLink[]) => {
  const [links, setLinks] = useState<IUserProfileLink[]>(initValue)
  const [isValid, setIsValid] = useState<boolean>(true)

  const addLink = (name: string, url: string) => {
    const newLink = { name, url, id: links.length }
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
