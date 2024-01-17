import { IUserProfileLink } from '@/types/IUserProfile'
import { useState } from 'react'

export const useLinks = (initValue: IUserProfileLink[]) => {
  const [links, setLinks] = useState<IUserProfileLink[]>(initValue)

  const addLink = (linkName: string, linkUrl: string) => {
    const newLink = { linkName, linkUrl, id: links.length }
    setLinks([...links, newLink])
  }

  const changeLinkName = (id: number, content: string) => {
    // links[id].linkName = content
    setLinks(
      links.map((link) =>
        link.id === id ? { ...link, linkName: content } : link,
      ),
    )
  }

  const changeUrl = (id: number, content: string) => {
    setLinks(
      links.map((link) =>
        link.id === id ? { ...link, linkUrl: content } : link,
      ),
    )
  }

  return { links, addLink, changeLinkName, changeUrl }
}
