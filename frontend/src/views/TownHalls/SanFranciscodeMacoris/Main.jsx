import React from 'react'
import {topics} from "./topics"
import { Chats } from '../../../components/chats/Chats'

export function Main() {
  return (
    <div>
      <Chats descriptions={topics} topic="townHalls/San Francisco de Macoris" />
    </div>
  )
}
