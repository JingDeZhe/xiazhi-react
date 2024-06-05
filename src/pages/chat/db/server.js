import { db } from './main'

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

  async getMessages(fromId, targetId) {
    return Promise.all([
      this.db.messages.where({ fromId, targetId }).toArray(),
      this.db.messages.where({ fromId: targetId, targetId: fromId }).toArray(),
    ]).then(([a, b]) => {
      a.forEach((d) => (d.type = 'self'))
      b.forEach((d) => (d.type = 'target'))
      return [...a, ...b].sort((a, b) => a.time - b.time)
    })
  }
}

export const server = new FakeServer()
