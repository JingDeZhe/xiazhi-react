import { chatWithOther } from './ai'
import { db } from './main'

const avatarCache = {}
class FakeServer {
  constructor() {
    this.db = db
  }

  async getContacts(id) {
    return this.db.transaction('r', [db.users, db.relations], async () => {
      const relations = await db.relations.where({ fromId: id }).toArray()
      const targetIds = relations.map((d) => d.targetId)
      const contacts = await db.users.where('id').anyOf(targetIds).toArray()
      return contacts
    })
  }

  async getUser(id) {
    return this.db.users.get(id)
  }

  async getAvatar(id) {
    if (avatarCache[id]) return avatarCache[id]
    return this.db.users.get(id).then((d) => {
      avatarCache[id] = d.avatar
      return d.avatar
    })
  }

  async getMessages(fromId, targetId) {
    if (!fromId || !targetId) return []
    return Promise.all([
      this.db.messages.where({ fromId, targetId }).toArray(),
      this.db.messages.where({ fromId: targetId, targetId: fromId }).toArray(),
    ])
      .then(([a, b]) => {
        a.forEach((d) => (d.type = 'from'))
        b.forEach((d) => (d.type = 'target'))
        return [...a, ...b].sort((a, b) => a.time - b.time)
      })
      .catch(() => {
        return []
      })
  }

  async sendMessage(fromId, targetId, message) {
    return Promise.all([
      this.db.messages.put({
        fromId,
        targetId,
        message,
        time: Date.now(),
      }),
      this.getCharacter(fromId, targetId).then(async (d) => {
        const character = d?.character || ''
        return chatWithOther(fromId + targetId, character, message).then(
          (res) => {
            return this.db.messages.put({
              fromId: targetId,
              targetId: fromId,
              message: res,
              time: Date.now() + 10,
            })
          }
        )
      }),
    ])
  }

  async deleteAllMessages(fromId, targetId) {
    return Promise.all([
      this.db.messages.where({ fromId, targetId }).delete(),
      this.db.messages.where({ fromId: targetId, targetId: fromId }).delete(),
    ])
  }

  async getCharacter(fromId, targetId) {
    return this.db.relations.where({ fromId, targetId }).first()
  }

  async setCharacter(id, character) {
    return this.db.relations.update(id, { character })
  }
}

export const server = new FakeServer()
