import { reset, seed } from 'drizzle-seed'
import { db, sql } from './connection.ts'
import { schema } from './schema/index.ts'

await reset(db, schema)

await seed(db, schema).refine((f) => {
  return {
    rooms: {
      count: 5,
      columns: {
        name: f.loremIpsum({ sentencesCount: 1 }),
        description: f.loremIpsum({ sentencesCount: 2 }),
        createdAt: f.date({
          maxDate: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        }),
      },
      with: {
        questions: 5,
      },
    },
  }
})

await sql.end()

// biome-ignore lint/suspicious/noConsole: only used in development
console.log('Database seeded successfully')
