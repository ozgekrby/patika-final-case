import { connectMongoDB } from 'ok-backend-common/mongodb/connection.js';
import { seedInvoice } from './invoice.js'

const seedData = async () => {
  try {
    await connectMongoDB()
    console.log('Seed [started] please wait..')
    await seedInvoice()

    console.log('Seed completed..')
  } catch (error) {
    console.log(error)
  }
}

seedData()